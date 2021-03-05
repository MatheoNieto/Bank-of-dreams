import express from 'express'
import passport from 'passport'

import validationHandler from '../../middleware/validationHandler'
import { solicitudeSchema, changeStateSolictudSchema } from '../../schemas/product'
import ServicePetitionProducts from './service'

import * as response from '../../network/response'

import '../../utils/auth/strategies/jwt'

const Router = express.Router()
const servicePetitionProducts = ServicePetitionProducts.getInstance()

Router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {

      const petitionState = await servicePetitionProducts.listPetitions(req)
      response.success(req, res, 'Products petition', petitionState, 200)
    } catch (err) {
      next(err)
    }
  })

Router.get('/:solicitudId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { solicitudId } = req.params

      const petitionState = await servicePetitionProducts.listPetitions(req, solicitudId)
      response.success(req, res, 'Product petition.', petitionState, 200)

    } catch (err) {
      next(err)
    }
  })

Router.post('/',
  passport.authenticate('jwt', { session: false }),
  validationHandler(solicitudeSchema),
  async (req, res, next) => {
    try {
      const { body: productAsk } = req

      const newPetitionProduct = await servicePetitionProducts.petitionProduct(req, productAsk)
      response.success(req, res, 'Petition product success.', newPetitionProduct, 201)

    } catch (err) {
      next(err)
    }
  })

Router.put('/attend-solicitude/:solicitudId',
  validationHandler(changeStateSolictudSchema),
  async (req, res, next) => {
    try {
      const { body: responseSolitude, params: { solicitudId } } = req

      const newPetitionProduct = await servicePetitionProducts.attendSolicitude(req, solicitudId, responseSolitude)
      response.success(req, res, `Petition product ${responseSolitude.state_petition} success.`, newPetitionProduct, 200)

    } catch (err) {
      next(err)
    }
  })


export default Router
