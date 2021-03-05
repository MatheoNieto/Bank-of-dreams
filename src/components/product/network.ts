import express from 'express'
import passport from 'passport'

import validationHandler from '../../middleware/validationHandler'
import ServiceProducts from './service'

import * as response from '../../network/response'

import '../../utils/auth/strategies/jwt'

const Router = express.Router()
const serviceProducts = ServiceProducts.getInstance()

Router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const products = await serviceProducts.listProduct(req)
      response.success(req, res, 'Products', products, 200)

    } catch (err) {
      next(err)
    }
  })

Router.get('/:productId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { productId } = req.params

      const product = await serviceProducts.listProduct(req, productId)
      response.success(req, res, 'Product', product, 200)

    } catch (err) {
      next(err)
    }
  })

Router.delete('/:productId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { productId } = req.params

      const product = await serviceProducts.listProduct(req, productId)
      response.success(req, res, 'Product', product, 200)

    } catch (err) {
      next(err)
    }
  })


export default Router
