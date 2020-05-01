import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String
    password: String
  }

  type Report {
    id: ID!
    user: User
    location: Location
    symptoms: [Symptom]
    request: Request
  }

  type Location {
    id: ID!
    lat: String!
    lng: String!
  }

  type Symptom {
    id: ID!
    name: String!
    description: String
    reports: [Report]
  }

  type Request {
    id: ID!
    message: String!
    replies: [Reply]
  }

  type Reply {
    id: ID!
    message: String!
    request: Request
    user: User
  }

  input LocationInput {
    lat: String!
    lng: String!
  }

  input SymptomInput {
    name: String!
  }

  input RequestInput {
    message: String!
  }

  type Query {
    hello: String!
    me: User
    listLocations: listLocationsQueryResponse!
    listReports: listReportsQueryResponse!
  }
  type Mutation {
    register(email: String!, password: String!): RegistrationMutationResponse!
    login(email: String!, password: String!): LoginMutationResponse!
    logout: LogoutMutationResponse!
    newReport(
      location: LocationInput
      symptoms: [SymptomInput]
      request: RequestInput
    ): newReportMutationResponse!
    addReply(request: String!, message: String!): AddReplyMutationResponse
    invalidateTokens: invalidateTokensMutationResponse!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  interface QueryResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type RegistrationMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type LoginMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type LogoutMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type newReportMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    report: Report
  }

  type AddReplyMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    reply: Reply
  }

  type invalidateTokensMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type listLocationsQueryResponse implements QueryResponse {
    code: String!
    success: Boolean!
    message: String!
    locations: [Location]
  }

  type listReportsQueryResponse implements QueryResponse {
    code: String!
    success: Boolean!
    message: String!
    reports: [Report]
  }
`
