import boom from '@hapi/boom'
import { Request } from 'express'
import CreditCardGenerator from '../service/CreditCardGenerator'
import randomize from 'randomatic'

import ServiceBase from '../service/ServiceBase'
import { Product } from '../../entity/Product'
import { PetitonProduct } from '../../entity/PetitionProduct'
import { TypeProduct } from '../../entity/TypeProduct'

class ServicePetitionProducts extends ServiceBase {
  private static instance: ServicePetitionProducts

  public static getInstance(): ServicePetitionProducts {
    if (!ServicePetitionProducts.instance) {
      ServicePetitionProducts.instance = new ServicePetitionProducts()
    }
    return ServicePetitionProducts.instance
  }

  async listPetitions(request: Request, productId?: any) {
    return await this.listData(PetitonProduct, request, productId)
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
        data['close'] = true
        const solcitudAttended= await this.updateData(PetitonProduct, request, solicitudId, data)
        resolve(solcitudAttended)
      }

      reject(boom.badRequest('The solicitude already state close.'))

    })
  }

  private async validPetitionClose(solicitudId: any) {
    const getProductPetition = await this.databaseLib.getById(PetitonProduct, solicitudId)
    return getProductPetition.close
  }

  private async numberRamdon() {
    return randomize('0', 12)
  }

  private async generateNumberAccount(typeProduct: string) {
    const creditCardGenerator = CreditCardGenerator.getInstance()

    switch (typeProduct) {
      case 'Credit Card':
        return creditCardGenerator.generate()
      default:
        return this.numberRamdon()
    }
  }

  private async createProduct(solicitudId: any) {
    const data = await this.databaseLib.getByIdRelations(PetitonProduct, solicitudId, ['client', 'type_product'])

    const type_product_create = data.type_product.name

    const numberProduct = await this.generateNumberAccount(type_product_create)
    const dataProduct = {
      number_product: numberProduct,
      client: data.client,
      type_product: data.type_product
    }

    await this.databaseLib.create(Product, dataProduct)
  }
}

export default ServicePetitionProducts