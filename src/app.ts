import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

import router from './network/routes'

import { configHost } from './config/settings'

import wrapsError from './middleware/wrapsError'
import logError from './middleware/logError'
import errorHandler from './middleware/errorHandler'
import notFoundHandler from './middleware/notFoundHandler'


export async function startServer() {
  const app = express()

  // middlewares
  // esta en produccion ?
  if (configHost.dev) {
    app.use(morgan('combined'))
  }
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(cors())

  // RUTAS DE LA API CON EXPRESS
  router(app)

  // middleware manejos de errores
  app.use(notFoundHandler)
  app.use(logError)
  app.use(wrapsError)
  app.use(errorHandler)

  return app
}

