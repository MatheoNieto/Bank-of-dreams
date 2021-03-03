import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent
} from 'typeorm'

import { Client } from '../entity/Client'

import DatabaseLib from '../database/databaseLib'

@EventSubscriber()
export class ClientSubscriber implements EntitySubscriberInterface<Client>{
  databaseLib: DatabaseLib

  constructor() {
    this.databaseLib = DatabaseLib.getInstance()
  }

  listenTo() {
    return Client
  }

  async afterInsert(event: InsertEvent<Client>) {
    const newClient = event.entity

  }
}