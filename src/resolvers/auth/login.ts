import * as bcrypt from 'bcryptjs'
import { User } from '../../entity/User'
import { createTokens } from '../../auth'
// import { Response } from 'express'

const login = async (
  _: void,
  { email, password }: { email: string; password: string },
  { res }: { res: any },
) => {
  const user = await User.findOne({ where: { email } })

  if (!user) {
    return {
      code: 403,
      success: false,
      message: 'Incorrect credentials', // Keep the same message so you don't know who has an account
    }
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return {
      code: 403,
      success: false,
      message: 'Incorrect credentials',
    }
  }

  const { refreshToken, accessToken } = createTokens(user)

  res.cookie('refresh-token', refreshToken)
  res.cookie('access-token', accessToken)

  return {
    code: 200,
    success: true,
    message: 'User successfully logged in',
    user,
  }
}

export default login
