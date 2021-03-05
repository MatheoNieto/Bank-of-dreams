import boom from '@hapi/boom'
import { Request } from 'express'

import ServiceBase from '../service/ServiceBase'
import { Product } from '../../entity/Product'

class ServiceTransaction extends ServiceBase {
  private static instance: ServiceTransaction

  public static getInstance(): ServiceTransaction {
    if (!ServiceTransaction.instance) {
      ServiceTransaction.instance = new ServiceTransaction()
    }
    return ServiceTransaction.instance
  }

  private async getProduct(productId: any) {
    return await this.databaseLib.getById(Product, productId)
  }

  public createTransaction(request: Request, productId: any, dataTransaction: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = {
          ...dataTransaction
        }
        const product = await this.getProduct(productId)
        if (!product) {
          reject(boom.badRequest('The account no exist.'))
        }
        const transactionsResult = await this.trasaccition(product, data)
        resolve(transactionsResult)
      } catch (err) {
        reject(err)
      }

    })
  }

  private async trasaccition(product: any, data: any) {

    if (data.type_trasaction == 'Shoping') {
      return this.movementShopping(product, data)
    } else {
      return this.movementConsignment(product, data)
    }
  }

  private async movementShopping(product: any, data: any) {

    const saldo: number = parseInt(product.saldo)
    const valorMovement = parseInt(data.valor)

    if (valorMovement > saldo) {
      return boom.badRequest('Insufficient funds')
    }

    const newSaldo = saldo - valorMovement
    await this.updateData(Product, product.id, { saldo: newSaldo })
    return await this.getProduct(product.id)
  }

  private async movementConsignment(product: any, data: any) {
    const saldo: number = parseInt(product.saldo)
    const valorMovement = parseInt(data.valor)

    const newSaldo = saldo + valorMovement
    await this.updateData(Product, product.id, { saldo: newSaldo })
    return await this.getProduct(product.id)
  }

}

export default ServiceTransaction