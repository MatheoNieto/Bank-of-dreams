import express from 'express'

import validationHandler from '../../middleware/validationHandler'
import { createSchema, dataFilter } from '../../schemas/client'
import ServiceClient from './service'

import * as response from '../../network/response'

const Router = express.Router()
const serviceClient = ServiceClient.getInstance()

Router.get('/',
  validationHandler(dataFilter, 'query'),
  async (req, res, next) => {
    try {
      const clients = await serviceClient.listClient(req)
      response.success(req, res, 'Client', clients, 200)

    } catch (err) {
      next(err)
    }
  })

Router.get('/:clientId',
  async (req, res, next) => {
    try {
      const { clientId } = req.params

      const client = await serviceClient.listClient(req, clientId)
      response.success(req, res, 'CLIENT', client, 200)

    } catch (err) {
      next(err)
    }
  })

Router.post('/',
  validationHandler(createSchema),
  async (req, res, next) => {
    try {
      const { body: client } = req

      const newClient = await serviceClient.createData(client)
      response.success(req, res, 'Client created.', newClient, 201)

    } catch (err) {
      next(err)
    }
  }
)

export default Router
