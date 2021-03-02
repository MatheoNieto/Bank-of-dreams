import passport from 'passport'
import { BasicStrategy } from 'passport-http'

import DatabaseLib from '../../../lib/DatabaseLib'

import boom from '@hapi/boom'
import {compare} from 'bcryptjs'

passport.use(
  new BasicStrategy(async function(email: string, password: string, cb:any){
    const databaseLib = DatabaseLib.getInstance()
    
    try {
      const getUser = await databaseLib.loginConsultorio(email)

      if (!getUser) {
        return cb(boom.unauthorized('Usuario o contraseña incorrecta'), false);
      }

      const validPassword = await compare(password, getUser.usuario.password)

      if(!validPassword){
        return cb(boom.unauthorized('Usuario o contraseña incorrecta'), false);
      }

      delete getUser.usuario.password;

      return cb(null, getUser);
    } catch (err) {
      return cb(err);
    }
  })
)