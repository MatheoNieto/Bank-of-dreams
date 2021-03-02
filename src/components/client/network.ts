import express from 'express'

import * as response from '../../network/response'

const Router = express.Router()

Router.get('/', 
async (req, res, next) => {
  try {
    const clients= ''
    response.success(req, res, 'Client', clients, 200)

  } catch (err) {
    next(err)
  }
})

Router.get('/:clientId',
  async (req, res, next) => {
  try {
    const { clientId } = req.params

    const client = ''
    response.success(req, res, 'CLIENT', client, 200)

  } catch (err) {
    next(err)
  }
})

Router.post('/', 
  async (req, res, next) => {
    try {
      const { body: client} = req
  
      const newClient = ''
      response.success(req, res, 'Client created.', newClient, 201)
      
    } catch (err) {
      next(err)
    }
  }
)

export default Router
