import boom from '@hapi/boom'

import DatabaseLib from '../../database/databaseLib'

import { Client } from '../../entity/Client'
import { isEmptyObject } from '../../utils/emptyJson'

class ClientService {
  private databaseLib: DatabaseLib

  constructor() {
    this.databaseLib = DatabaseLib.getInstance()
  }

  private filterClient(filter: any, clients: any) {

    if (isEmptyObject(filter)) {
      return clients
    }

    const name = filter['name'] || false
    const type_document = filter['type_document'] || false
    const number_document = filter['number_document'] || false
    const last_name = filter['last_name'] || false
    const email = filter['email'] || false

    if (name) {
      clients = clients.filter((client: any) => client.name == name)
    }
    if (type_document) {
      clients = clients.filter((client: any) => client.tipo_documento == type_document)
    }
    if (number_document) {
      clients = clients.filter((client: any) => client.numero_documento == number_document)
    }
    if (last_name) {
      clients = clients.filter((client: any) => client.apellido == last_name)
    }
    if (email) {
      clients = clients.filter((client: any) => client.correo == email)
    }

    return clients
  }

  public getClients(request: any) {
    return new Promise(async (resolve, reject) => {
      const optionFilter = request.query

      const get_clients = await this.databaseLib.getAll(Client)

      if (!get_clients) {
        reject(boom.notFound('Clients not found.'))
      }

      const filter_clients = await this.filterClient(optionFilter, get_clients)
      resolve(filter_clients)
    })
  }

  public getClient(request: any, clientId: any) {
    return new Promise(async (resolve, reject) => {

      const get_client = await this.databaseLib.getById(Client, clientId)

      if (!get_client) {
        reject(boom.notFound('Client not found.'))
      }
      resolve(get_client)
    })
  }

  public createClient(request: any, client: any) {
    return new Promise(async (resolve, reject) => {
      const data = {
        ...client
      }

      const clientExist = await this.databaseLib.getByQuery(Client, {
        where: {
          ...data,
          active: true
        }
      })

      if (!clientExist) {
        const newClient = await this.databaseLib.create(Client, data)
        resolve(newClient)
      }
      reject(boom.badRequest('Client already created'))
    })
  }


}


export default ClientService