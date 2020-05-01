import { graphQLTestCall } from '../../utils/graphQLTestCall'

const registerMutation = `
  mutation registerMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      code
      user {
        email
      }
    }
  }
  `

test('a user can register', async () => {
  const testUser = { email: 'test@test.com', password: 'secret' }

  const loginResponse = await graphQLTestCall(registerMutation, {
    email: testUser.email,
    password: testUser.password,
  })

  expect(loginResponse).toEqual({
    data: {
      register: {
        code: '200',
        user: {
          email: testUser!.email,
        },
      },
    },
  })
})
