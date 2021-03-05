import { connectDB } from './connect'

import {User} from '../entity/User'
class DatabaseLib {
  private static instance: DatabaseLib;
  private connection: any

  public static getInstance(): DatabaseLib {
    if (!DatabaseLib.instance) {
      DatabaseLib.instance = new DatabaseLib();
    }
    return DatabaseLib.instance;
  }

  private connect() {

    if (!this.connection) {

      this.connection = new Promise(async (resolve, reject) => {
        await connectDB()
          .then((data: any) => {
            console.log(`[DATABASE] Database is connected`)
            resolve(data)
          })
          .catch((err: any) => {
            console.log(`[DATABASE] Database is not connected error=> ${err}`)
            reject(err)
          })
      })
    }

    return this.connection
  }

  public getAll(entity: any) {
    return this.connect().then(async (db: any) => {
      return await db.manager.find(entity, {
        where: {
          active: true,
        }
      })
    })
  }

  public getById(entity: any, id: any) {
    return this.connect().then(async (db: any) => {
      return await db.manager.findOne(entity, {
        where: {
          id,
          active: true,
        }
      })
    })
  }

  public getByQuery(entity: any, query: any) {

    return this.connect().then(async (db: any) => {
      return await db.manager.findOne(entity, query)
    })
  }

  public create(entity: any, data: any) {

    return this.connect().then(async (db: any) => {
      return await db.manager.create(entity, data).save()
    })
  }

  public loginUser(email:string){
    return this.connect().then(async (db: any) => {
      return  await db.manager.findOne(User, {
        active: true,
        usermail: email
      })

    })
  }

}

export default DatabaseLib