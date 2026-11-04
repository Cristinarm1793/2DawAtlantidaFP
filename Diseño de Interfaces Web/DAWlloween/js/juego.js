"use strict";

/* ==========================================
   1. VARIABLES GENERALES DEL JUEGO
   ========================================== */

let escenaActual = "inicio";
let inventario = [];
let juegoTerminado = false;

function crearDecisionesIniciales() {
    return {
        puertaSotanoAbierta: false,
        electricidadRestaurada: false,
        ventanaSotanoAbierta: false,
        verjaAbierta: false
    };
}

let decisiones = crearDecisionesIniciales();

/* ==========================================
   2. GUARDAR, CARGAR Y REINICIAR PARTIDA
   ========================================== */

async function guardarPartida(escena, inventario) {

    const datos = new FormData();

    datos.append("accion", "guardar");
    datos.append("escena", escena);

    inventario.forEach(function (objeto) {
        datos.append("inventario[]", objeto);
    });

    datos.append("decisiones", JSON.stringify(decisiones));
    datos.append("juegoTerminado", juegoTerminado ? "1" : "0");

    const respuesta = await fetch("php/juego.php", {
        method: "POST",
        body: datos
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo guardar la partida");
    }

    console.log(await respuesta.text());
}

async function cargarPartida() {

    const datos = new FormData();

    datos.append("accion", "cargar");

    const respuesta = await fetch("php/juego.php", {
        method: "POST",
        body: datos
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar la partida");
    }

    const partida = await respuesta.json();

    if (!partida || !historia[partida.escena] ||
        !Array.isArray(partida.inventario)) {
        throw new Error("Los datos de la partida no son válidos");
    }

    escenaActual = partida.escena;
    inventario = partida.inventario;

    decisiones = {
        ...crearDecisionesIniciales(),
        ...(partida.decisiones || {})
    };

    juegoTerminado = partida.juegoTerminado === true;

    console.log("Partida cargada:", partida);
}

async function reiniciarPartida() {

    const confirmar = confirm(
        "¿Seguro que quieres reiniciar la partida? Perderás tu progreso."
    );

    if (!confirmar) {
        return false;
    }

    const datos = new FormData();

    datos.append("accion", "reiniciar");

    const respuesta = await fetch("php/juego.php", {
        method: "POST",
        body: datos
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo reiniciar la partida");
    }

    escenaActual = "inicio";
    inventario = [];
    juegoTerminado = false;
    decisiones = crearDecisionesIniciales();

    console.log(await respuesta.text());

    return true;
}

/* ==========================================
   3. HISTORIA DEL JUEGO
   ========================================== */

const historia = {

    inicio: {
        texto: "Tu coche se ha averiado en mitad de la noche. A lo lejos ves una casa.",
        imagen: "assets/img/coche.png",

        opciones: [
            {
                texto: "Acercarse a la casa",
                destino: "entrada"
            },
            {
                texto: "Examinar el coche",
                destino: "coche"
            }
        ]
    },

    entrada: {
        texto: "La puerta principal está cerrada. No parece haber nadie dentro.",
        imagen: "assets/img/puerta.png",

        opciones: [
            {
                texto: "Llamar a la puerta",
                destino: "llamar"
            },
            {
                texto: "Buscar otra entrada",
                destino: "exterior"
            }
        ]
    }
};

/* ==========================================
   4. INVENTARIO Y OBJETOS
   ========================================== */

function recogerObjeto(objeto) {

    if (!inventario.includes(objeto)) {
        inventario.push(objeto);
        mostrarInventario();
    }
}

function tieneObjeto(objeto) {
    return inventario.includes(objeto);
}

function usarObjeto(objeto) {

    if (tieneObjeto(objeto)) {

        inventario = inventario.filter(function (item) {
            return item !== objeto;
        });

        mostrarInventario();

        return true;

    } else {

        return false;
    }
}

function mostrarInventario() {

    const contenedor = document.getElementById("inventario");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    if (inventario.length === 0) {
        contenedor.textContent = "Inventario vacío";

    } else {

        inventario.forEach(function (objeto) {

            const elemento = document.createElement("p");
            elemento.textContent = objeto;
            contenedor.appendChild(elemento);
        });
    }
}

/* ==========================================
   5. DECISIONES Y CONDICIONES
   ========================================== */

function comprobarCondicion(condicion) {

    if (!condicion) {
        return true;
    }

    if (condicion.tipo === "objeto") {
        return tieneObjeto(condicion.valor);
    }

    if (condicion.tipo === "decision") {
        return decisiones[condicion.valor] === true;
    }

    return false;
}

function realizarAccion(accion) {

    if (!accion) {
        return false;
    }

    if (accion.condicion) {
        if (!comprobarCondicion(accion.condicion)) {
            console.log("No cumples los requisitos.");
            return false;
        }
    }

    if (accion.consumirObjeto && !tieneObjeto(accion.consumirObjeto)) {
        return false;
    }

    if (accion.decision) {
        decisiones[accion.decision] = true;
    }

    if (accion.consumirObjeto) {
        usarObjeto(accion.consumirObjeto);
    }

    return true;
}

/* ==========================================
   6. MOSTRAR ESCENAS EN PANTALLA
   ========================================== */

function mostrarEscena(nombreEscena) {

    const escena = historia[nombreEscena];

    if (!escena) {
        console.log("La escena no existe:", nombreEscena);
        return;
    }

    escenaActual = nombreEscena;

    const texto = document.getElementById("texto-escena");
    const imagen = document.getElementById("imagen-escena");
    const opciones = document.getElementById("opciones-escena");

    if (texto) {
        texto.textContent = escena.texto;
    }

    if (imagen) {

        if (escena.imagen) {
            imagen.src = escena.imagen;
            imagen.style.display = "block";
        } else {
            imagen.style.display = "none";
        }
    }

    if (opciones) {

        opciones.innerHTML = "";

        escena.opciones.forEach(function (opcion) {

            const boton = document.createElement("button");
            boton.textContent = opcion.texto;

            boton.addEventListener("click", function () {
                seleccionarOpcion(opcion);
            });

            opciones.appendChild(boton);
        });
    }

    mostrarInventario();
}

function seleccionarOpcion(opcion) {

    if (opcion.condicion) {

        if (!comprobarCondicion(opcion.condicion)) {
            alert("No puedes realizar esta acción todavía.");
            return;
        }
    }

    if (opcion.accion) {

        const resultado = realizarAccion(opcion.accion);

        if (!resultado) {
            return;
        }
    }

    if (opcion.objeto) {
        recogerObjeto(opcion.objeto);
    }

    if (opcion.destino) {
        mostrarEscena(opcion.destino);

    } else {
        mostrarEscena(escenaActual);
    }
}

/* ==========================================
   7. EVENTOS DE LOS BOTONES
   ========================================== */

function configurarBotones() {

    const botonGuardar = document.getElementById("btn-guardar");

    if (botonGuardar) {

        botonGuardar.addEventListener("click", async function () {

            try {
                await guardarPartida(escenaActual, inventario);
                alert("Partida guardada correctamente.");

            } catch (error) {
                console.error(error);
                alert("No se ha podido guardar la partida.");
            }
        });
    }

    const botonCargar = document.getElementById("btn-cargar");

    if (botonCargar) {

        botonCargar.addEventListener("click", async function () {

            try {
                await cargarPartida();
                mostrarEscena(escenaActual);
                alert("Partida cargada correctamente.");

            } catch (error) {
                console.error(error);
                alert("No se ha podido cargar la partida.");
            }
        });

        mostrarPantallaHistoria();
    }

    const botonReiniciar = document.getElementById("btn-reiniciar");

    if (botonReiniciar) {

        botonReiniciar.addEventListener("click", async function () {

            try {
                const reiniciada = await reiniciarPartida();

                if (reiniciada) {
                    mostrarEscena(escenaActual);
                }

            } catch (error) {
                console.error(error);
                alert("No se ha podido reiniciar la partida.");
            }
        });
    }
}

/* ==========================================
   8. INICIO DEL JUEGO
   ========================================== */

function mostrarPantallaHistoria() {

    document.getElementById("pantalla-inicio").hidden = true;
    document.getElementById("pantalla-historia").hidden = false;
}

function iniciarJuego() {

    configurarBotones();
    mostrarInventario();

    const botonIniciar = document.getElementById("iniciar-juego");

    if (botonIniciar) {

        botonIniciar.addEventListener("click", function () {

            mostrarPantallaHistoria();
            mostrarEscena("inicio");

        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarJuego);

} else {
    iniciarJuego();
}