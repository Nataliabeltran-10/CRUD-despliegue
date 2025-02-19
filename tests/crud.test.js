// Importar las funciones desde el archivo principal
const { insertar, modificar, borrar, listar } = require('../frontend/index1');

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
    insertar(nuevaPersona);  // Usamos la función original importada
    expect(listar()).toHaveLength(3);  // Verificar que la cantidad de personas ha aumentado
    expect(listar()[2]).toEqual(expect.objectContaining(nuevaPersona));  // Verificar que la nueva persona está en la lista
});

// TEST de la funcion MODIFICAR
test('Modificar una persona existente', () => {
    const modificada = { id: 1, nombre: 'Juan', apellidos: 'Pérez', fecha_nac: '1990-01-01', posicion: 'Centrocampista', nacionalidad: 'España' };
    modificar(modificada);  // Usamos la función original importada
    expect(listar()[0].posicion).toBe('Centrocampista');  // Verificar que la posición de la persona se ha actualizado
});

// TEST de la funcion BORRAR
test('Borrar una persona elimina correctamente', () => {
    const personaAEliminar = { id: 2 };
    borrar(personaAEliminar);  // Usamos la función original importada
    expect(listar()).toHaveLength(2);  // Verificar que la cantidad de personas ha disminuido
    expect(listar()).not.toContainEqual(expect.objectContaining({ id: 2 }));  // Verificar que la persona con id=2 ha sido eliminada
});