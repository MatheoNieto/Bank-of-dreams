import boom from '@hapi/boom'
import { Request } from 'express'
import CreditCardGenerator from '../service/CreditCardGenerator'
import randomize from 'randomatic'

import ServiceBase from '../service/ServiceBase'
import { Product } from '../../entity/Product'
import { PetitonProduct } from '../../entity/PetitionProduct'
import { TypeProduct } from '../../entity/TypeProduct'


class ServiceProducts extends ServiceBase {
  private static instance: ServiceProducts

  public static getInstance(): ServiceProducts {
    if (!ServiceProducts.instance) {
      ServiceProducts.instance = new ServiceProducts()
    }
    return ServiceProducts.instance
  }

  async listProduct(request: any, productId?: any) {
    return await this.listData(Product, request, productId)
  }

  createData(request: Request, product: any) {
    return new Promise(async (resolve, reject) => {
      const data = {
        ...product
      }

      const haveProduct = await this.validDataExist(Product, data)

      if (haveProduct) {
        reject(boom.badRequest('You have already product.'))
        return
      }

      const newProduct = await this.databaseLib.create(Product, data)
      resolve(newProduct)
    })
  }

  petitionProduct(request: Request, petitionProduct: any) {
    return new Promise(async (resolve, reject) => {
      const data = {
        ...petitionProduct
      }
      const { user } = request

      const getTypeProduct = await this.databaseLib.getByQuery(TypeProduct, {
        where: {
          name: data.type_product,
          active: true
        }
      })

      data['type_product'] = getTypeProduct
      data['client'] = user

      const haveSolicitud = await this.validDataExist(PetitonProduct, data)

      if (!haveSolicitud) {
        const newProduct = await this.databaseLib.create(PetitonProduct, data)
        resolve(newProduct)
      }

      reject(boom.badRequest('You have already solicitude this product.'))

    })
  }

  attendSolicitude(request: Request, solicitudId: any, newState: any) {
    return new Promise(async (resolve, reject) => {
      const data = {
        ...newState
      }

      const closeSolicitude = await this.validPetitionClose(solicitudId)

      if (!closeSolicitude) {

        if (data.state_petition == 'Accepted') {
          await this.createProduct(solicitudId)
        }
        await this.updateData(PetitonProduct, request, solicitudId, data)
        resolve(`Petition product ${data.state_petition} success.`)
      }

      reject(boom.badRequest('The solicitude already state close.'))

    })
  }

  private async validPetitionClose(solicitudId: any) {
    const getProductPetition = await this.databaseLib.getById(PetitonProduct, solicitudId)
    return getProductPetition.close
  }

  private async numberRamdon() {
    return randomize('0', 10)
  }

  private async generateNumberAccount(typeProduct: string) {
    const creditCardGenerator = CreditCardGenerator.getInstance()
    
    switch (typeProduct) {
      case 'Credit Card':
        return creditCardGenerator.generate('Mastercard')
      default:
        return this.numberRamdon()
    }
  }

  private async createProduct(solicitudId: any) {
    const data = await this.databaseLib.getById(PetitonProduct, solicitudId)
    console.log("DAta=>", data)


    const numberProduct = this.generateNumberAccount('')
    console.log("=>numberProduct", numberProduct)
    // const dataProduct ={
    //   number_product: numberProduct,
    //   client: data.client,
    //   TypeProduct: data.type_product
    // }

    // await this.databaseLib.create(Product, dataProduct)
  }
}

export default ServiceProducts