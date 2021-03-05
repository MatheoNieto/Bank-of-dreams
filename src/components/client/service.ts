import boom from '@hapi/boom'
import { Request } from 'express'

import serviceBase from '../service/ServiceBase'
import ServiceAuth from '../service/ServiceAuth'

import { Client } from '../../entity/Client'

class ServiceClient extends serviceBase {
  private static instance: ServiceClient
  private serviceAuth: ServiceAuth

  constructor() {
    super()
    this.serviceAuth = ServiceAuth.getInstance()
  }
  
  public static getInstance(): ServiceClient {
    if (!ServiceClient.instance) {
      ServiceClient.instance = new ServiceClient()
    }
    return ServiceClient.instance
  }

  async listClient(request: Request, clientId?: any) {
    return await this.listData(Client, request, clientId)
  }

  createData(client: any) {
    return new Promise(async (resolve, reject) => {
      const data = {
        ...client
      }

      const passwordUser = data.password
      delete data.password

      const clientExist = await this.validDataExist(Client, data)

      if (clientExist) {
        reject(boom.badRequest('Client already created'))
        return
      }

      const newClient = await this.databaseLib.create(Client, data)

      const dataUser = {
        usermail: data.email,
        password: passwordUser,
        client: newClient
      }

      await this.serviceAuth.createUser(dataUser)

      resolve(newClient)
    })
  }
}


export default ServiceClient