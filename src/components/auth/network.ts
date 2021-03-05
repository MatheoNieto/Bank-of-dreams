import express from 'express'

import ServiceAuth from '../service/ServiceAuth'
import * as response from '../../network/response'

const Router = express.Router()
const serviceAuth = ServiceAuth.getInstance()

Router.get('/', async (req, res) => {
  res.send("Hi, welcome")
})

// Basic strategy
Router.post('/', async (req, res, next) => {
  try {
    const tokenAuth = await serviceAuth.authenticationBasic(req, res)
    response.success(req, res, 'Access token.', tokenAuth, 200)
  } catch (err) {
    next(err)
  }
})

export default Router
