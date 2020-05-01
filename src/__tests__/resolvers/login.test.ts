import { graphQLTestCall } from '../../utils/graphQLTestCall'

const loginMutation = `
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      code
      user {
        id
        email
      }
    }
  }
  `

test('a user can login', async () => {
  const testUser = { email: 'test@test.com', password: 'secret' }

  const loginResponse = await graphQLTestCall(loginMutation, {
    email: testUser.email,
    password: testUser.password,
  })

  expect(loginResponse).toEqual({
    data: {
      status: 200,
      user: {
        email: testUser!.email,
      },
    },
  })
})
