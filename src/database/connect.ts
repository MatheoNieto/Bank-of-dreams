import {createConnection} from "typeorm";
import { configDb } from '../config/settings'
import path from 'path'

export  async function connectDB(){
  return await createConnection({
    type: 'mysql',
    host: configDb.host_db,
    username: configDb.user_db,
    password: configDb.password_db,
    database: configDb.database,
    entities:[
      path.join(__dirname, '/../entity/**/**.ts')
    ],
    migrations: [
      path.join(__dirname, '/../migration/**/*.ts')
    ],
    subscribers: [
      path.join(__dirname, '/../subscriber/**/*.ts')
    ],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    },
    synchronize: false
  })
}
