import express from 'express'
import passport from 'passport'

import validationHandler from '../../middleware/validationHandler'
import { solicitudeSchema, changeStateSolictudSchema } from '../../schemas/product'
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

Router.post('/ask-product',
  passport.authenticate('jwt', { session: false }),
  validationHandler(solicitudeSchema),
  async (req, res, next) => {
    try {
      const { body: productAsk } = req

      const newPetitionProduct = await serviceProducts.petitionProduct(req, productAsk)
      response.success(req, res, 'Petition product success.', newPetitionProduct, 201)

    } catch (err) {
      next(err)
    }
  })

Router.put('/attend-solicitude/:solicitudId',
  validationHandler(changeStateSolictudSchema),
  async (req, res, next) => {
    try {
      const { body: responseSolitude, params: {solicitudId} } = req

      const newPetitionProduct = await serviceProducts.attendSolicitude(req, solicitudId, responseSolitude)
      response.success(req, res, 'Change state solicitude.', newPetitionProduct, 200)

    } catch (err) {
      next(err)
    }
  })


export default Router
