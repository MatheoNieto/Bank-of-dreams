import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import boom from '@hapi/boom'

import { User } from '../../../entity/User'
import DatabaseLib from '../../../database/databaseLib'

import { configAuth } from '../../../config/settings'

passport.use(
  new Strategy(
    {
      secretOrKey: configAuth.access_token_secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayload, cb) {
      const databaseLib = DatabaseLib.getInstance()

      try {
        const getUser = databaseLib.getByQuery(User, { id: tokenPayload.userId })

        if (!getUser) {
          return cb(boom.unauthorized(), false);
        }

        delete getUser.password;

        cb(null, { ...getUser });

      } catch (err) {
        return cb(err);
      }
    }
  )
)