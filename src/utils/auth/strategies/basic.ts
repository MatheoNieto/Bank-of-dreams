import passport from 'passport'
import { BasicStrategy } from 'passport-http'

import DatabaseLib from '../../../database/databaseLib'

import boom from '@hapi/boom'
import { compare } from 'bcryptjs'

passport.use(
  new BasicStrategy(async function (email: string, password: string, cb: any) {
    const databaseLib = DatabaseLib.getInstance()

    try {
      const getUser = await databaseLib.loginUser(email)

      if (!getUser) {
        return cb(boom.unauthorized('User or password incorrect.'), false);
      }

      const validPassword = await compare(password, getUser.password)

      if (!validPassword) {
        return cb(boom.unauthorized('User or password incorrect.'), false);
      }

      delete getUser.password;

      return cb(null, getUser);
    } catch (err) {
      return cb(err);
    }
  })
)