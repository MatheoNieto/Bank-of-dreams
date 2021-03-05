import boom from '@hapi/boom'
import { Request } from 'express'

import ServiceBase from '../service/ServiceBase'
import {Product} from '../../entity/Product'

class ServiceProducts extends ServiceBase {
  private static instance: ServiceProducts

  public static getInstance(): ServiceProducts {
    if (!ServiceProducts.instance) {
      ServiceProducts.instance = new ServiceProducts()
    }
    return ServiceProducts.instance
  }
  
  async listProduct(request: any, productId?:any){
    return await this.listData(Product, request, productId)
  }

  createData(request:Request, product:any){
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
}

export default ServiceProducts