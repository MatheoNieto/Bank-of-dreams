import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import boom from '@hapi/boom'

import { Client } from '../../../entity/Client'
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
        const getClient = await databaseLib.getByQuery(Client, { id: tokenPayload.clientId })

        if (!getClient) {
          return cb(boom.unauthorized(), false);
        }

        cb(null, { ...getClient });

      } catch (err) {
        return cb(err);
      }
    }
  )
)