// crud.test.js: Pruebas CRUD simplificadas
const { insertar, modificar, borrar, listar } = require('../frontend/index1');

// Mock de la base de datos para pruebas
global.personas = [
  { id: 1, nombre: 'Juan', apellidos: 'Pérez', fecha_nac: '1990-01-01', posicion: 'Delantero', nacionalidad: 'España' },
  { id: 2, nombre: 'Ana', apellidos: 'Gómez', fecha_nac: '1985-05-15', posicion: 'Defensa', nacionalidad: 'México' },
];

// Prueba LISTAR
test('Listar devuelve todas las personas', () => {
  expect(listar()).toEqual(global.personas);
});

// Prueba INSERTAR
test('Insertar una nueva persona', () => {
  const nueva = { nombre: 'Carlos', apellidos: 'López', fecha_nac: '1992-03-20', posicion: 'Portero', nacionalidad: 'Argentina' };
  insertar(nueva);
  expect(listar().length).toBe(3);
  expect(listar().some(p => p.nombre === 'Carlos')).toBe(true);
});

// Prueba MODIFICAR
test('Modificar una persona', () => {
  const actualizada = { id: 1, posicion: 'Centrocampista' };
  modificar(actualizada);
  expect(listar().find(p => p.id === 1).posicion).toBe('Centrocampista');
});

// Prueba BORRAR
test('Borrar una persona', () => {
  borrar(2);
  expect(listar().length).toBe(2);
  expect(listar().some(p => p.id === 2)).toBe(false);
});
