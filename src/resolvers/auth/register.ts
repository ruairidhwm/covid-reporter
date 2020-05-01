import * as bcrypt from 'bcryptjs'
import { User } from '../../entity/User'

const register = async (
  _: void,
  { email, password }: { email: string; password: string },
) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    email,
    password: hashedPassword,
  }).save()

  return {
    code: 200,
    success: true,
    message: 'User successfully registered',
    user,
  }
}

export default register
