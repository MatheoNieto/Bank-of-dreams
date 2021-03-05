import boom from '@hapi/boom'
import passport from 'passport'

import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Response, Request } from 'express'

import { User } from '../../entity/User'
import serviceBase from './ServiceBase'

import { configAuth } from '../../config/settings'

import '../../utils/auth/strategies/basic'
class ServiceAuth extends serviceBase {
  private static instance: ServiceAuth

  public static getInstance(): ServiceAuth {
    if (!ServiceAuth.instance) {
      ServiceAuth.instance = new ServiceAuth()
    }
    return ServiceAuth.instance
  }

  private async encriptedPassword(password: string) {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
  }

  public async createUser(dataUser: any) {

    dataUser['password'] = await this.encriptedPassword(dataUser.password)
    const newUser = await this.createData(User, dataUser)
    return newUser
  }

  private createAccessToken(user: any) {
    const payload = {
      userId: user.id,
    }

    return sign(payload, configAuth.access_token_secret!, {
      expiresIn: '15m'
    })
  }

  private createRefreshToken(user: any) {
    const payload = {
      userId: user.id,
    }

    return sign(payload,
      configAuth.refress_token_secret!, {
      expiresIn: '7d'
    })
  }

  private sendRefreshToken(res: Response, token: string) {
    res.cookie(
      'fr', token,
      {
        httpOnly: true
      }
    )
  }

  public authenticationBasic(req: Request, res: Response) {
    return new Promise(async( resolve, reject)=>{
      passport.authenticate('basic', (error, user) => {
        try {

          if (error || !user) {
            reject(boom.unauthorized())
          }
    
          req.login(user, { session: false }, async (error) => {
            if (error) {
              reject(error)
            }
    
            this.sendRefreshToken(res, this.createRefreshToken(user))
            const token = this.createAccessToken(user)
    
            resolve(token)
          })
    
        } catch (err) {
          reject(err)
        }
      })(req, res)
    })
  }

}

export default ServiceAuth