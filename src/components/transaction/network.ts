import express from 'express'
import passport from 'passport'

import validationHandler from '../../middleware/validationHandler'
import ServiceTransaction from './service'

import * as response from '../../network/response'

import '../../utils/auth/strategies/jwt'

const Router = express.Router()
const serviceTransaction = ServiceTransaction.getInstance()

Router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const products = ''
      response.success(req, res, 'Transactions', products, 200)

    } catch (err) {
      next(err)
    }
  })

Router.post('/:productId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { body: transaction, params: { productId } } = req

      const newTrasaction = ''
      response.success(req, res, 'New transaction', newTrasaction, 200)

    } catch (err) {
      next(err)
    }
  })


export default Router
