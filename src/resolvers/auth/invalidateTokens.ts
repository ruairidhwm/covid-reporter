import { User } from '../../entity/User'

const invalidateTokens = async (
  _: void,
  __: void,
  { req, res }: { req: Request; res: Response },
) => {
  if (!req.userId) {
    return {
      code: 404,
      success: false,
      message: 'No such user.',
    }
  }

  const user = await User.findOne(req.userId)
  if (!user) {
    return {
      code: 404,
      success: false,
      message: 'No such user.',
    }
  }
  user.count += 1 // Invalidates our token
  user.save()

  res.clearCookie('access-token')

  return {
    code: 200,
    success: true,
    message: 'Successfully invalidated tokens',
  }
}

export default invalidateTokens
