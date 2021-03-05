import express from 'express'

import ServiceMigrateData from '../service/ServiceMigrateData'
import * as response from '../../network/response'

import { TypeProduct } from '../../entity/TypeProduct'

const serviceMigrateData = ServiceMigrateData.getInstance()
const Router = express.Router()

Router.post('/', async (req, res) => {
  try {
    const { body } = req

    const typeProducts = await serviceMigrateData.createMultipleData(TypeProduct, body.products)
    response.success(req, res, 'Types Products migrated.', typeProducts, 200)
  } catch (err) {
    response.error(req, res, err, 500, err.message)
  }
})

export default Router