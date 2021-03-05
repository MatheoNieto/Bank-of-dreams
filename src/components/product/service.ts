import { Request } from 'express'

import ServiceBase from '../service/ServiceBase'
import { Product } from '../../entity/Product'

class ServiceProducts extends ServiceBase {
  private static instance: ServiceProducts

  public static getInstance(): ServiceProducts {
    if (!ServiceProducts.instance) {
      ServiceProducts.instance = new ServiceProducts()
    }
    return ServiceProducts.instance
  }

  async listProduct(request: Request, productId?: any) {
    return await this.listData(Product, request, productId)
  }

  deleteData(dataId: any) {
    return new Promise(async (resolve) => {

      await this.databaseLib.update(Product, dataId, {active:false})
      resolve('Account canceled.')
    })
  }

}

export default ServiceProducts