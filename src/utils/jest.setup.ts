import { Connection } from 'typeorm'
import { createTestConn } from './createTestConnection'

let conn: Connection | void

beforeAll(
  async (): Promise<any> => {
    conn = await createTestConn()
  },
)

// afterAll(async () => {
//   await conn.close()
// })
