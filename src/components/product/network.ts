import express from 'express'

import * as response from '../../network/response'

const Router = express.Router()

Router.get('/', 
async (req, res, next) => {
  try {
    const products= ''
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

Router.post('/', 
  async (req, res, next) => {
    try {
      const { body: product} = req
  
      const newProduct = ''
      response.success(req, res, 'Product created.', newProduct, 201)
      
    } catch (err) {
      next(err)
    }
  }
)

export default Router
