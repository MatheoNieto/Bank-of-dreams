import 'dotenv/config'

import {
  typesConfigHost,
  typesConfigDb,
  typesConfigAuth,
} from '../prototypes/types_settings'

export const config: any = {
  default_from_email: process.env.DEFAULT_FROM_EMAIL || 'matheo.developer@gmail.com',
  charset: 'UTF-8',
}

// PARA EL SERVIDOR
export const configHost: typesConfigHost = {
  dev: process.env.NODE_ENV == 'production',
  port: (!process.env.PORT) ? 3000 : parseInt(process.env.PORT),
  host: process.env.HOST_NAME || 'http://localhost',
  cors: process.env.CORS,
}

// BASE DE DATOS
export const configDb: typesConfigDb = {
  host_db: process.env.HOST_DB || 'localhost',
  port_db: (!process.env.PORT_DB) ? 3306 : parseInt(process.env.PORT_DB),
  user_db: process.env.USER_DB || 'root',
  password_db: process.env.PASSWORD_DB || '',
  database: process.env.DATABASE || 'db'
}

// PARA LAS AUTHENTICACIONES
export const configAuth: typesConfigAuth = {
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || 'ce23c61347cbff9cc97cc9133ed2828f3a8215634647597c4f82e012d3215e29',
  refress_token_secret: process.env.REFRESS_TOKEN_SECRET || 'e542303f91c8aa68495eb934f2e0161d666d7d34a6c026e14c80550568c6f6c1',
}
