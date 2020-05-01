import { Mutation as AuthMutation } from './auth'
import { Mutation as ReportMutation, Query as ReportQuery } from './reports'
import { IResolvers } from 'apollo-server-express'

export const resolvers: IResolvers = {
  Mutation: {
    ...AuthMutation,
    ...ReportMutation,
  },
  Query: {
    ...ReportQuery,
  },
}
