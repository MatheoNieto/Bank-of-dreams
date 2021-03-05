import boom from '@hapi/boom'
import { Request } from 'express'

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

      await this.updateData(PetitonProduct, request, solicitudId, data)

      resolve(`Petition product ${data.state_petition} success.`)

    })
  }
}

export default ServiceProducts