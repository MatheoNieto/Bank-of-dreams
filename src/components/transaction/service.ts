import boom from '@hapi/boom'
import { Request } from 'express'

import ServiceBase from '../service/ServiceBase'
import { HistoryTransaction } from '../../entity/HistoryTransaction'
import { Product } from '../../entity/Product'

class ServiceTransaction extends ServiceBase {
  private static instance: ServiceTransaction

  public static getInstance(): ServiceTransaction {
    if (!ServiceTransaction.instance) {
      ServiceTransaction.instance = new ServiceTransaction()
    }
    return ServiceTransaction.instance
  }

  public listTrasactions(request: Request, productId?: any) {
    return new Promise(async (resolve, reject) => {
      const optionFilter = request.query
      let get_data

      if (!productId) {
        get_data = await this.getAllHistoria(request)
      } else {
        get_data = await this.getHistorialByIdProduct(request, productId)
      }

      if (!get_data || get_data.length == 0) {
        reject(boom.notFound('Empty trasactions'))
      }
      const filterData = await this.filterData(optionFilter, get_data)
      resolve(filterData)
    })
  }

  private async getHistorialByIdProduct(request: Request, productId: any) {
    const client = request.user
    const getProduct = await this.databaseLib.getByClientId(Product, client, productId)

    const getHistorial = await this.databaseLib.getTestHistorial(HistoryTransaction, getProduct)

    const dataResponse = {
      ...getProduct,
      transactions: getHistorial
    }
    return dataResponse
  }

  private async getAllHistoria(request: Request) {
    const client = request.user
    let result = []

    const getProducts = await this.databaseLib.getByClient(Product, client)

    for (let i = 0; i < getProducts.length; i++) {
      let product = getProducts[i]
      let getHistorial = await this.databaseLib.getTestHistorial(HistoryTransaction, product)

      let dataResponse = {
        ...product,
        transactions: getHistorial
      }

      result.push(dataResponse)
    }

    return result
  }

  private async getProduct(productId: any, request?: Request) {
    if (!request) {
      return await this.databaseLib.getByIdRelations(Product, productId, ['type_product'])
    }
    const { user } = request
    return await this.databaseLib.getByIdClientRelations(Product, user, productId, ['type_product'])
  }

  public createTransaction(request: Request, productId: any, dataTransaction: any) {
    return new Promise(async (resolve, reject) => {
      const data = {
        ...dataTransaction
      }
      const product = await this.getProduct(productId, request)
      if (!product) {
        reject(boom.badRequest('The account no exist.'))
      }
      this.trasaccition(product, data)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(boom.badRequest(err))
        })
    })
  }

  private async trasaccition(product: any, data: any) {

    try {
      if (data.type_trasaction == 'Shoping') {
        return this.movementShopping(product, data)
      } else {
        return this.movementConsignment(product, data)
      }
    } catch (err) {
      return err
    }
  }

  private async movementShopping(product: any, data: any) {
    return new Promise(async (resolve, reject) => {
      const saldo: number = parseInt(product.saldo)
      const valorMovement: number = parseInt(data.valor)

      if (valorMovement > saldo) {
        reject('Insufficient funds')
        return
      }

      const newSaldo = saldo - valorMovement
      await this.createHistoryTransaction(product, data, newSaldo, 'Shoping')
      await this.updateData(Product, product.id, { saldo: newSaldo })
      const productResponse = await this.getProduct(product.id)
      resolve(productResponse)
    })
  }

  private async movementConsignment(product: any, data: any) {
    const saldo: number = parseInt(product.saldo)
    const valorMovement: number = parseInt(data.valor)

    const newSaldo = saldo + valorMovement
    await this.createHistoryTransaction(product, data, newSaldo, 'Consignment')
    await this.updateData(Product, product.id, { saldo: newSaldo })
    return await this.getProduct(product.id)
  }

  private async createHistoryTransaction(product: any, data: any, newValue: any, type_trasaction: string) {
    await this.databaseLib.create(HistoryTransaction, {
      type_trasaction,
      detail_trasaction: data.detail_trasaction,
      product,
      before_saldo: product.saldo,
      new_saldo: newValue
    })
  }

}

export default ServiceTransaction