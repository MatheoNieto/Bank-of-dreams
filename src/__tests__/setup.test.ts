// before tests
beforeAll(() => {
  console.log('====>Preparando entorno para las pruebas<====')

  console.log('====>Se terminó de preparar el entorno para las pruebas<====')

});
// beforeEach(() => console.log('Antes de cada prueba'));


// despues de cada prueba
// afterEach(() => console.log('Despues de cada prueba'));
// afterAll(() => console.log('Despues de todas las pruebas'));

describe('preparar antes de ejecutar', () => {
  test('Es verdadero', () => {
      expect(true).toBeTruthy();
  });
});
