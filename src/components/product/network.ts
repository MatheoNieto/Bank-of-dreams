import express from 'express'
import passport from 'passport'

import validationHandler from '../../middleware/validationHandler'
import ServiceProducts from './service'

import * as response from '../../network/response'

import '../../utils/auth/strategies/jwt'

const Router = express.Router()
const serviceProducts = ServiceProducts.getInstance()

Router.get('/',
  async (req, res, next) => {
    try {
      const products = ''
      response.success(req, res, 'Products', products, 200)

    } catch (err) {
      next(err)
    }
  })

Router.get('/:productId',
  async (req, res, next) => {
    try {
      const { productId } = req.params

      const product = ''
      response.success(req, res, 'PRODUCT', product, 200)

    } catch (err) {
      next(err)
    }
  })


export default Router
