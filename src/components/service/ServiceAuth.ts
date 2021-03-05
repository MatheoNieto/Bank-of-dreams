import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Response } from 'express'

import { User } from '../../entity/User'
import serviceBase from './ServiceBase'

import { configAuth } from '../../config/settings'

class ServiceAuth extends serviceBase {
  private static instance: ServiceAuth;

  public static getInstance(): ServiceAuth {
    if (!ServiceAuth.instance) {
      ServiceAuth.instance = new ServiceAuth();
    }
    return ServiceAuth.instance;
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

  public createAccessToken(data: any) {
    const payload = {
      userId: data.user.id,
    }

    return sign(payload, configAuth.access_token_secret!, {
      expiresIn: '15m'
    })
  }

  public createRefreshToken(data: any) {
    const payload = {
      userId: data.usuario.id,
    }

    return sign(payload,
      configAuth.refress_token_secret!, {
      expiresIn: '7d'
    })
  }

  public sendRefreshToken(res: Response, token: string) {
    res.cookie(
      'fr', token,
      {
        httpOnly: true
      }
    )
  }

}

export default ServiceAuth