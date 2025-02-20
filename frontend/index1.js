var url = 'http://localhost/clase/CRUD-despliegue/backend/servidor.php';

document.addEventListener('DOMContentLoaded', function () {
    cargarTabla();
    document.getElementById("btNuevoJugador").onclick = mostrarForm;
    document.getElementById("btCancelar").onclick = cancelarForm;
    document.getElementById("btAnade").onclick = anadePersona;
    document.getElementById("btAnade").dataset.idjugador = -1;
});

function Crea_Fila(aCol) {
    var fila = document.createElement("tr");
    var col, cont;
    for (var i in aCol) {
        col = document.createElement("td");
        cont = document.createTextNode(aCol[i]);
        col.appendChild(cont);
        fila.appendChild(col);
    }
    return fila;
}

function LlenaTabla(aTabla, cuerpoTabla) {
    if (!Array.isArray(aTabla)) return;
    cuerpoTabla.innerHTML = "";

    aTabla.forEach(jugador => {
        let fila = Crea_Fila(jugador);
        let td, boton;

        // BOTÓN BORRAR
        td = document.createElement('td');
        boton = document.createElement('button');
        boton.innerHTML = "Borrar";
        boton.onclick = borrarPersona;
        boton.dataset.idjugador = jugador.id;
        boton.dataset.nombreape = `${jugador.nombre} ${jugador.apellidos}`;
        td.appendChild(boton);
        fila.appendChild(td);

        // BOTÓN EDITAR
        td = document.createElement('td');
        boton = document.createElement('button');
        boton.innerHTML = "Editar";
        boton.onclick = editarPersona;
        boton.dataset.idjugador = jugador.id;
        td.appendChild(boton);
        fila.appendChild(td);

        cuerpoTabla.appendChild(fila);
    });
}

function cargarTabla() {
    fetchData(url, { servicio: "listar" }, MuestraPersonas);
}

function MuestraPersonas(datos) {
    if (!Array.isArray(datos)) return;
    LlenaTabla(datos, document.getElementById("filas_tabla"));
}

function anadePersona(e) {
    if (e && e.preventDefault) e.preventDefault();

    let p = {
        servicio: document.getElementById("btAnade").dataset.idjugador == -1 ? "insertar" : "modificar",
        id: document.getElementById("btAnade").dataset.idjugador == -1 ? undefined : document.getElementById("btAnade").dataset.idjugador,
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        fecha_nac: document.getElementById("fecha_nac").value,
        posicion: document.getElementById("posicion").value,
        nacionalidad: document.getElementById("nacionalidad").value,
    };

    fetchData(url, p, MuestraPersonas);
    document.getElementById("btAnade").dataset.idjugador = -1;
    cancelarForm();
}

function borrarPersona(e) {
    if (e && e.preventDefault) e.preventDefault();

    if (confirm(`¿Deseas eliminar a: '${this.dataset.nombreape}'?`)) {
        fetchData(url, { servicio: "borrar", id: this.dataset.idjugador }, MuestraPersonas);
    }
}

function mostrarForm() {
    let form = document.getElementById("formPersonas");
    if (!form) {
        console.error("Error: No se encontró el formulario en el DOM.");
        return;
    }
    form.classList.add("ver");
    let legend = document.querySelector("#formPersonas legend");
    if (legend) {
        let esNuevo = document.getElementById("btAnade").dataset.idjugador == "-1";
        legend.innerHTML = esNuevo ? "Añadir" : "Modificar";
    } else {
       // console.log("Error: No se encontró el <legend> dentro del formulario.");
    }

    let btn = document.getElementById("btAnade");
    if (btn) {
        btn.innerHTML = btn.dataset.idjugador == "-1" ? "Añadir" : "Modificar";
    } else {
        console.error("Error: No se encontró el botón btAnade en el DOM.");
    }
}

function cancelarForm() {
    let form = document.getElementById("formPersonas");
    if (form) form.classList.remove("ver");
    document.getElementById("btAnade").dataset.idjugador = "-1";
    limpiarForm();
}

function editarPersona(e) {
    if (e && e.preventDefault) e.preventDefault();
    fetchData(url, { servicio: "selJugadorID", id: this.dataset.idjugador }, llenaForm);
}

function llenaForm(datos) {
    document.getElementById("nombre").value = datos.nombre;
    document.getElementById("apellidos").value = datos.apellidos;
    document.getElementById("fecha_nac").value = datos.fecha_nac;
    document.getElementById("posicion").value = datos.posicion;
    document.getElementById("nacionalidad").value = datos.nacionalidad;
    document.getElementById("btAnade").dataset.idjugador = datos.id;
    mostrarForm();
}

function limpiarForm() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("fecha_nac").value = "";
    document.getElementById("posicion").value = "";
    document.getElementById("nacionalidad").value = "";
}

function fetchData(url, data, callback) {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(callback)
    .catch(error => console.error('Error:', error));
}

module.exports = { LlenaTabla, editarPersona, borrarPersona, anadePersona };