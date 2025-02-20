const { LlenaTabla, editarPersona, borrarPersona, anadePersona } = require('../frontend/index1');


global.fetch = jest.fn((url, options) =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, nombre: 'Juan', apellidos: 'Pérez' }]),
  })
);


document.getElementById = jest.fn((id) => {
  if (id === "filas_tabla") {
    const tbody = document.createElement("tbody");
    return tbody; 
  }
  return {
    innerHTML: "",
    classList: { add: jest.fn(), remove: jest.fn() },
    dataset: { idjugador: "-1" },
    value: ""
  };
});


jest.spyOn(global, 'confirm').mockImplementation(() => true);

test('Listar personas devuelve todas las personas', () => {
  let tableBody = document.getElementById("filas_tabla");
  LlenaTabla([{ id: 1, nombre: 'Juan', apellidos: 'Pérez' }], tableBody);
  expect(tableBody.children.length).toBe(1);
});


const mockEvent = {
  preventDefault: jest.fn(),
  dataset: { idjugador: "1", nombreape: "Juan Pérez" }
};

test('Insertar una nueva persona', async () => {
  await anadePersona(mockEvent);
  expect(mockEvent.preventDefault).toHaveBeenCalled();
  expect(fetch).toHaveBeenCalled();
});

test('Modificar una persona existente', async () => {
  const mockEvent = {
    preventDefault: jest.fn(),
    dataset: { idjugador: "1" } 
  };

  await editarPersona.call(mockEvent, mockEvent); 
  expect(fetch).toHaveBeenCalledWith(
    expect.any(String),
    expect.any(Object) 
  );
});


test('Borrar una persona elimina correctamente', async () => {
  await borrarPersona.call(mockEvent, mockEvent); 
  expect(fetch).toHaveBeenCalled();
  expect(global.confirm).toHaveBeenCalledWith("¿Deseas eliminar a: 'Juan Pérez'?");
});
