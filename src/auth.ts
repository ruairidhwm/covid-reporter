import { sign } from 'jsonwebtoken'
import { User } from './entity/User'
import { JWT_TOKEN } from './config/constants'

export const createTokens = (user: User) => {
  const refreshToken = sign({ userId: user.id, count: user.count }, JWT_TOKEN, {
    expiresIn: '7d',
  })

  const accessToken = sign({ userId: user.id }, JWT_TOKEN, {
    expiresIn: '15min',
  })

  return { refreshToken, accessToken }
}
