// Supongamos que las funciones están en un archivo llamado 'crud.js'
const { cargarTabla, anadePersona, borrarPersona, editarPersona, limpiarForm } = require('./crud');

test('anadePersona agrega una nueva persona correctamente', async () => {
    // Simulamos el evento e y el contexto de la función
    const e = { preventDefault: jest.fn() };
    const mockFetchData = jest.fn(); // Mock de fetchData
    global.fetchData = mockFetchData;
    
    // Llamamos a anadePersona
    await anadePersona.call({ 
        dataset: { idjugador: -1 }, 
        nombre: 'Lionel', 
        apellidos: 'Messi', 
        fecha_nac: '1987-06-24', 
        posicion: 'Delantero', 
        nacionalidad: 'Argentina' 
    }, e);

    // Verificamos que fetchData se haya llamado con los datos correctos
    expect(mockFetchData).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
            servicio: 'insertar',
            nombre: 'Lionel',
            apellidos: 'Messi',
            fecha_nac: '1987-06-24',
            posicion: 'Delantero',
            nacionalidad: 'Argentina'
        }),
        expect.any(Function)
    );
});

test('borrarPersona elimina una persona correctamente', async () => {
    const e = { preventDefault: jest.fn() };
    const mockFetchData = jest.fn(); // Mock de fetchData
    global.fetchData = mockFetchData;
    global.confirm = jest.fn().mockReturnValue(true); // Simulamos la confirmación de borrado
    
    const jugador = { dataset: { idjugador: 1, nombreape: 'Lionel Messi' } };

    // Llamamos a borrarPersona
    await borrarPersona.call(jugador, e);

    // Verificamos que fetchData haya sido llamada con la correcta solicitud para borrar
    expect(mockFetchData).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
            servicio: 'borrar',
            id: 1
        }),
        expect.any(Function)
    );
});

test('editarPersona llena el formulario correctamente con los datos del jugador', async () => {
    const mockFetchData = jest.fn(); // Mock de fetchData
    global.fetchData = mockFetchData;

    const jugador = { dataset: { idjugador: 1 } };
    const mockDatos = {
        id: 1,
        nombre: 'Lionel',
        apellidos: 'Messi',
        fecha_nac: '1987-06-24',
        posicion: 'Delantero',
        nacionalidad: 'Argentina'
    };
    
    // Simulamos la respuesta del servidor con los datos del jugador
    mockFetchData.mockImplementationOnce((url, data, callback) => callback(mockDatos));

    // Llamamos a editarPersona
    await editarPersona.call(jugador, { preventDefault: jest.fn() });

    // Verificamos que se llenaron correctamente los campos del formulario
    expect(global.document.getElementById('nombre').value).toBe(mockDatos.nombre);
    expect(global.document.getElementById('apellidos').value).toBe(mockDatos.apellidos);
    expect(global.document.getElementById('fecha_nac').value).toBe(mockDatos.fecha_nac);
    expect(global.document.getElementById('posicion').value).toBe(mockDatos.posicion);
    expect(global.document.getElementById('nacionalidad').value).toBe(mockDatos.nacionalidad);
});

test('limpiarForm limpia correctamente los campos del formulario', () => {
    // Simulamos valores previos en los campos del formulario
    document.getElementById('nombre').value = 'Lionel';
    document.getElementById('apellidos').value = 'Messi';
    document.getElementById('fecha_nac').value = '1987-06-24';
    document.getElementById('posicion').value = 'Delantero';
    document.getElementById('nacionalidad').value = 'Argentina';

    // Llamamos a limpiarForm
    limpiarForm();

    // Verificamos que los campos estén vacíos después de limpiar
    expect(document.getElementById('nombre').value).toBe('');
    expect(document.getElementById('apellidos').value).toBe('');
    expect(document.getElementById('fecha_nac').value).toBe('');
    expect(document.getElementById('posicion').value).toBe('');
    expect(document.getElementById('nacionalidad').value).toBe('');
});

test('cargarTabla llama a fetchData para obtener los datos', async () => {
    const mockFetchData = jest.fn(); // Mock de fetchData
    global.fetchData = mockFetchData;

    // Simulamos que la tabla es cargada al llamar a cargarTabla
    await cargarTabla();

    // Verificamos que fetchData haya sido llamado con los datos correctos
    expect(mockFetchData).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
            servicio: 'listar'
        }),
        expect.any(Function)
    );
});
