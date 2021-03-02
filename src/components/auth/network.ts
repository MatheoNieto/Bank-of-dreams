import express from 'express'
import passport from 'passport'

import boom from '@hapi/boom'

import * as response from '../../network/response'

import { createAccessToken, createRefreshToken } from '../../utils/auth/auth'
import { sendRefreshToken } from '../../utils/auth/sendRefreshToken'

import '../../utils/auth/strategies/basic'

const Router = express.Router()

Router.get('/', async (req, res) => {
  res.send("hellow world")
})

// Basic strategy
Router.post('/', async (req, res, next) => {

  passport.authenticate('basic', function (error, user) {
    try {
      if (error || !user) {
        return next(boom.unauthorized());
      }

      req.login(user, { session: false }, async function (error) {
        if (error) {
          return next(error);
        }
        sendRefreshToken(res, createRefreshToken(user))

        const token = await createAccessToken(user)

        response.success(req, res, '', token, 200)
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
})


export default Router
