import { createConnection, getConnection } from 'typeorm'
import path from 'path'

// before tests
beforeAll(() => {
  console.log('[CREATE DATABASE TESTS]')
  return createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [
      path.join(__dirname, '/../entity/**/**.ts')
    ],
    synchronize: true,
    logging: false
  });

});
// beforeEach(() => console.log('Antes de cada prueba'));


// despues de cada prueba
// afterEach(() => console.log('Despues de cada prueba'));
afterAll(() => {
  let conn = getConnection();
  return conn.close()
});

describe('preparar antes de ejecutar', () => {
  test('Es verdadero', () => {
    expect(true).toBeTruthy();
  });
});
