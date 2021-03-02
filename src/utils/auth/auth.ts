import { sign } from 'jsonwebtoken'
import { configAuth } from '../../config/settings'

export const createAccessToken = (data: any) => {

  const payload = {
    userId: data.usuario.id,
  }

  return sign(payload, configAuth.access_token_secret!, {
    expiresIn: '15m'
  })
}


export const createRefreshToken = (data: any) => {
  const payload = {
    userId: data.usuario.id,
  }

  return sign(payload,
    configAuth.refress_token_secret!, {
    expiresIn: '7d'
  })

}