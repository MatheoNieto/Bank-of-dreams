import express from 'express'
import passport from 'passport'

import validationHandler from '../../middleware/validationHandler'
import ServiceTransaction from './service'
import { createSchema } from '../../schemas/transaction'


import * as response from '../../network/response'

import '../../utils/auth/strategies/jwt'

const Router = express.Router()
const serviceTransaction = ServiceTransaction.getInstance()

Router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const historiesTrasanctions = await serviceTransaction.listTrasactions(req)
      response.success(req, res, 'Transactions', historiesTrasanctions, 200)

    } catch (err) {
      next(err)
    }
  })

Router.get('/:productId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { productId } = req.params

      const historyTrasaction = await serviceTransaction.listTrasactions(req, productId)
      response.success(req, res, 'Transactions', historyTrasaction, 200)

    } catch (err) {
      next(err)
    }
  })

Router.post('/:productId',
  passport.authenticate('jwt', { session: false }),
  validationHandler(createSchema),
  async (req, res, next) => {
    try {
      const { body: transaction, params: { productId } } = req

      const newTrasaction = await serviceTransaction.createTransaction(req, productId, transaction)
      response.success(req, res, 'New transaction', newTrasaction, 200)

    } catch (err) {
      next(err)
    }
  })


export default Router
