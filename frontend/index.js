var url='http://localhost/clase/CRUD-despliegue/servidor/servidor.php';

window.onload = function () {
    cargarTabla();
    document.getElementById("btNuevoJugador").onclick = mostrarForm;
    document.getElementById("btCancelar").onclick = cancelarForm;
    document.getElementById("btAnade").onclick = anadePersona;

    document.getElementById("btAnade").dataset.idjugador = -1;
}

function Crea_Fila(aCol) {
    var fila = document.createElement("tr");
    var col; var cont;
    for (var i in aCol) {
        col = document.createElement("td");
        cont = document.createTextNode(aCol[i]);
        col.appendChild(cont);
        fila.appendChild(col);
    }
    return fila;
}

function LlenaTabla(aTabla, cuerpoTabla) {
    var fila, td, boton;
    for (var i = 0; i < aTabla.length; i++) {
        fila = Crea_Fila(aTabla[i]);
        //BORRAR
        td = document.createElement('td');
        boton = document.createElement('button');

        boton.innerHTML = "Borrar";
        
        boton.onclick = borrarPersona;
        boton.dataset.idjugador = aTabla[i].id;
        boton.dataset.nombreape = aTabla[i].nombre + " " + aTabla[i].apellidos;

        td.appendChild(boton);
        fila.appendChild(td);

        //EDITAR
        td = document.createElement('td');
        boton = document.createElement('button');

        boton.innerHTML = "Editar";
        boton.onclick = editarPersona;
        boton.dataset.idjugador = aTabla[i].id;
        td.appendChild(boton);
        fila.appendChild(td);

        cuerpoTabla.appendChild(fila);
    }
}

function cargarTabla() {
    var p = {
        servicio: "listar"
    };
    fetchData(url, p, MuestraPersonas);
}

function MuestraPersonas(datos) {
    console.log(datos);
    document.getElementById("filas_tabla").innerHTML = "";
    LlenaTabla(datos, document.getElementById("filas_tabla"));
}

function anadePersona(e) {
    e.preventDefault();
    let p = {
        servicio: this.dataset.idjugador == -1 ? "insertar" : "modificar",
        id: this.dataset.idjugador == -1 ? undefined : this.dataset.idjugador,
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        fecha_nac: document.getElementById("fecha_nac").value,
        posicion: document.getElementById("posicion").value,
        nacionalidad: document.getElementById("nacionalidad").value,
    };
    console.log(p);
    fetchData(url, p, MuestraPersonas);
    this.dataset.idjugador = -1;
    cancelarForm();
}

function borrarPersona(e) {
    e.preventDefault();
    if (confirm("¿Deseas eliminar a: '" + this.dataset.nombreape + "'?")) {
        var p = {
            servicio: "borrar",
            id: this.dataset.idjugador
        };
        fetchData(url, p, MuestraPersonas);
    }
}

function mostrarForm() {
    console.log("idjugador = " + document.getElementById("btAnade").dataset.idjugador);
    document.getElementById("formPersonas").classList.add("ver");

    if (document.getElementById("btAnade").dataset.idjugador == "-1") {
        document.querySelector("#formPersonas legend").innerHTML = "Añadir";
        document.getElementById("btAnade").innerHTML = "Añadir";
    } else {
        document.querySelector("#formPersonas legend").innerHTML = "Modificar";
        document.getElementById("btAnade").innerHTML = "Modificar";
    }
}

function cancelarForm() {
    document.getElementById("formPersonas").classList.remove("ver");
    document.getElementById("btAnade").dataset.idjugador = "-1";
    limpiarForm();
}

function editarPersona(e) {
    e.preventDefault();
    var p = {
        servicio: "selJugadorID",
        id: this.dataset.idjugador
    };

    fetchData(url, p, llenaForm);
}

function llenaForm(datos) {
    console.log(datos);
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(callback)
    .catch(error => console.error('Error:', error));
}


