const { LlenaTabla, editarPersona, borrarPersona, anadePersona } = require('../frontend/index1');

// Mock para `fetch`
global.fetch = jest.fn((url, options) =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, nombre: 'Juan', apellidos: 'Pérez' }]),
  })
);

// Mock para `document.getElementById`
document.getElementById = jest.fn((id) => {
  if (id === "filas_tabla") {
    const tbody = document.createElement("tbody");
    return tbody; // Se devuelve un tbody real para evitar el error de `appendChild`
  }
  return {
    innerHTML: "",
    classList: { add: jest.fn(), remove: jest.fn() },
    dataset: { idjugador: "-1" },
    value: ""
  };
});

// Mock para `confirm`
jest.spyOn(global, 'confirm').mockImplementation(() => true);

// TEST de la función LISTAR
test('Listar personas devuelve todas las personas', () => {
  let tableBody = document.getElementById("filas_tabla");
  LlenaTabla([{ id: 1, nombre: 'Juan', apellidos: 'Pérez' }], tableBody);
  expect(tableBody.children.length).toBe(1);
});

// Mock de `preventDefault`
const mockEvent = {
  preventDefault: jest.fn(),
  dataset: { idjugador: "1", nombreape: "Juan Pérez" }
};

// TEST de la función INSERTAR
test('Insertar una nueva persona', async () => {
  await anadePersona(mockEvent);
  expect(mockEvent.preventDefault).toHaveBeenCalled();
  expect(fetch).toHaveBeenCalled();
});

// TEST de la función MODIFICAR
test('Modificar una persona existente', async () => {
  const mockEvent = {
    preventDefault: jest.fn(),
    dataset: { idjugador: "1" } // Se agrega `dataset.idjugador`
  };

  await editarPersona.call(mockEvent, mockEvent); // Se usa `.call()` para que `this` apunte al evento simulado
  expect(fetch).toHaveBeenCalledWith(
    expect.any(String),
    expect.any(Object) // No se espera un tercer parámetro, ya que `fetch` solo recibe `url` y `options`
  );
});

// TEST de la función BORRAR
test('Borrar una persona elimina correctamente', async () => {
  await borrarPersona.call(mockEvent, mockEvent); // Se usa `.call()` para evitar `this.dataset` como `undefined`
  expect(fetch).toHaveBeenCalled();
  expect(global.confirm).toHaveBeenCalledWith("¿Deseas eliminar a: 'Juan Pérez'?");
});
