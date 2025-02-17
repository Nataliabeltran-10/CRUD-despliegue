var peti = new pAJAX();
let url = 'SERVIDOR/servidor.php';

window.onload = function () {
    cargarTabla();
    document.getElementById("btNuevoJugador").onclick = mostrarForm;
    document.getElementById("btCancelar").onclick = cancelarForm;
    document.getElementById("btAnade").onclick = anadePersona;

    // Establecer la fecha de nacimiento por defecto a la fecha actual
    let fechaActual = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
    document.getElementById("fecha_nac").value = fechaActual;
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
    }
    peti.peticion(url, 'post', MuestraPersonas, JSON.stringify(p));
}

function MuestraPersonas(datos) {
    console.log(datos);
    document.getElementById("filas_tabla").innerHTML = "";
    LlenaTabla(datos, document.getElementById("filas_tabla"));
}

function anadePersona(e) {
    e.preventDefault();
    if (this.dataset.idjugador == -1) 
        var p = {
            servicio: "insertar",
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellidos").value,
            fecha_nac: document.getElementById("fecha_nac").value,
            posicion: document.getElementById("posicion").value,
            nacionalidad: document.getElementById("nacionalidad").value,
        };
    else 
        var p = {
            servicio: "modificar",
            id: this.dataset.idjugador,
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellidos").value,
            fecha_nac: document.getElementById("fecha_nac").value,
            posicion: document.getElementById("posicion").value,
            nacionalidad: document.getElementById("nacionalidad").value,
        };
    console.log(p);
    peti.peticion(url, "post", MuestraPersonas, JSON.stringify(p));
    this.dataset.idjugador = -1;
    cancelarForm();
}

function borrarPersona(e) {
    e.preventDefault();
    if (confirm("¿Deseas eliminar a: '" + this.dataset.nombreape + "'?")) {
        var p = {
            servicio: "borrar",
            id: this.dataset.idjugador
        }
        peti.peticion(url, "post", MuestraPersonas, JSON.stringify(p));
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
    }

    peti.peticion(url, "post", llenaForm, JSON.stringify(p));
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
