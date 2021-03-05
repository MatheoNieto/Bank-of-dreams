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

  

}

export default ServiceTransaction