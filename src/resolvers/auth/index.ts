import invalidateTokens from './invalidateTokens'
import login from './login'
import logout from './logout'
import register from './register'

export const Mutation = {
  register,
  login,
  logout,
  invalidateTokens,
}

export { login }
export { logout }
export { register }
export { invalidateTokens }
