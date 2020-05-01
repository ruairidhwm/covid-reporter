import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import * as cookieParser from 'cookie-parser'
import { createConnection } from 'typeorm'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { verify } from 'jsonwebtoken'
import { JWT_TOKEN } from './config/constants'
import { User } from './entity/User'
import { createTokens } from './auth'

dotenv.config()

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  })

  await createConnection()
  const app = express()

  app.use(cookieParser())

  /**
   * Handles checking whether the request has an access token
   * or a refresh token. If so, we verify the details and
   * log in the user.
   *
   * If not we check that they have a valid refresh token, and
   * generate new access and refresh tokens and log them in.
   */
  app.use(async (req: Request, res: Response, next) => {
    const accessToken = req.cookies['access-token']
    const refreshToken = req.cookies['refresh-token']

    if (!refreshToken && !accessToken) {
      return next()
    }

    try {
      const data: any = verify(accessToken, JWT_TOKEN)
      req.userId = data.userId
      return next()
    } catch {}

    if (!refreshToken) {
      return next()
    }

    let refreshData
    try {
      refreshData = verify(refreshToken, JWT_TOKEN)
    } catch {
      return next()
    }

    const user = await User.findOne(refreshData.userId)

    //token has been invalidated
    if (!user || user.count !== refreshData.count) {
      return next()
    }
    const tokens = createTokens(user)

    res.cookie('refresh-token', tokens.refreshToken)
    res.cookie('access-token', tokens.accessToken)
    req.userId = user.id
    next()
  })

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  )
}

startServer()
