const { insertar, modificar, borrar, listar } = require('./crud');  // Importa las funciones de tu API

// Base de datos de prueba (para realizar las pruebas)
let personas = [
    { id: 1, nombre: 'Juan', apellidos: 'Pérez', fecha_nac: '1990-01-01', posicion: 'Delantero', nacionalidad: 'España' },
    { id: 2, nombre: 'Ana', apellidos: 'Gómez', fecha_nac: '1985-05-15', posicion: 'Defensa', nacionalidad: 'México' },
];

// TEST de la funcion LISTAR
test('Listar personas devuelve todas las personas', () => {
    expect(listar()).toEqual(personas);
});

// TEST de la funcion INSERTAR
test('Insertar una nueva persona', () => {
    const nuevaPersona = { nombre: 'Carlos', apellidos: 'López', fecha_nac: '1992-03-20', posicion: 'Portero', nacionalidad: 'Argentina' };
    insertar(nuevaPersona);
    expect(listar()).toHaveLength(3);  // ver q la cantidad de persona aumenta
    expect(listar()[2]).toEqual(expect.objectContaining(nuevaPersona));  // comprobar que la nueva persona se ha añadido a la lista
});

// TEST de la funcion MODIFICAR
test('Modificar una persona existente', () => {
    const modificada = { id: 1, nombre: 'Juan', apellidos: 'Pérez', fecha_nac: '1990-01-01', posicion: 'Centrocampista', nacionalidad: 'España' };
    modificar(modificada);
    expect(listar()[0].posicion).toBe('Centrocampista');  // comprobar que se ha actualizado la posicion del modificado
});

// TEST de la funcion BORRAR
test('Borrar una persona elimina correctamente', () => {
    const personaAEliminar = { id: 2 };
    borrar(personaAEliminar);
    expect(listar()).toHaveLength(2);  // comprobar que la cantidad de persona ha disminuido 
    expect(listar()).not.toContainEqual(expect.objectContaining({ id: 2 }));  // comprobar que la la persona se ha eliminado de la tabla 
});
