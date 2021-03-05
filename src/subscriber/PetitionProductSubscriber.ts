import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent
} from 'typeorm'

import { PetitonProduct } from '../entity/PetitionProduct'
import { Product } from '../entity/Product'

import DatabaseLib from '../database/databaseLib'

@EventSubscriber()
export class PetitionProductSubscriber implements EntitySubscriberInterface<PetitonProduct>{
  databaseLib: DatabaseLib

  constructor() {
    this.databaseLib = DatabaseLib.getInstance()
  }

  listenTo() {
    return PetitonProduct
  }

  async beforeUpdate(event: UpdateEvent<PetitonProduct>){

   const productPetition = event.entity

   console.log("=>[productPetition]",productPetition)
   
  //  if(productPetition.state_petition == 'Accepted' ){
  //   this.databaseLib.create(Product, {

  //   })
  //  }
    
  }


  
}



