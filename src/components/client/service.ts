import boom from '@hapi/boom'

import serviceBase from '../service/ServiceBase'
import { Client } from '../../entity/Client'

class ClientService extends serviceBase {

  async listClient(request: any, clientId?: any) {
    return await this.listData(Client, request, clientId)
  }

  createData(request: any, client: any) {
    return new Promise(async (resolve, reject) => {
      const data = {
        ...client
      }

      const clientExist = await this.validateDataExist.valid(Client, data)

      if (clientExist) {
        reject(boom.badRequest('Client already created'))
      }

      const newClient = await this.databaseLib.create(Client, data)
      resolve(newClient)
    })
  }
}


export default ClientService