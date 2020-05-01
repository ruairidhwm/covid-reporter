const logout = async (_: void, __: void, { res }: { res: Response }) => {
  res.clearCookie('access-token')
  return {
    code: 200,
    success: true,
    message: 'Successfully logged out',
  }
}

export default logout
