import { createConnection } from 'typeorm'

export const createTestConn = async () => {
  await createConnection({
    type: 'sqlite',
    database: './test.sql',
    synchronize: true,
    dropSchema: true,
    entities: [__dirname + '/../entity/*.ts'],
  })
}
