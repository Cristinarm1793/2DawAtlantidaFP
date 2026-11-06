"use strict";

/* ==========================================
   1. VARIABLES GENERALES DEL JUEGO
   ========================================== */

let escenaActual = "inicio";
let inventario = [];
let juegoTerminado = false;
let decisiones = crearDecisionesIniciales();

function crearDecisionesIniciales() {
    return {
        puertaSotanoAbierta: false,
        electricidadRestaurada: false,
        ventanaSotanoAbierta: false,
        verjaAbierta: false
    };
}

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
        imagen: "assets/img/juego/cinematica/accidente coche.png",
        texto: "1986. El motor se ha parado. Al otro lado de la carretera, " +
            "una ventana sigue encendida. La guantera se ha abierto con el golpe.",

        opciones: [
            {
                texto: "Registrar la guantera",
                objeto: "Linterna",
                mensaje: "Entre los papeles encuentras una linterna. Te la guardas."
            },
            {
                texto: "Acercarse a la casa",
                destino: "entrada"
            }
        ]
    },

    entrada: {
        imagen: "assets/img/juego/cinematica/Cinematica entrada.png",
        texto: "Subes los escalones. Antes de que llegues a llamar, " +
            "la puerta se entreabre. Desde dentro oyes una campanada.",

        opciones: [
            {
                texto: "Cruzar el umbral",
                destino: "salon",
                puerta: true
            },
            {
                texto: "Regresar al coche",
                destino: "inicio"
            }
        ]
    },

    salon: {
        imagen: "assets/img/juego/escenarios/salon.png",
        texto: "Hay un reloj de pie junto al escritorio. " +
            "Esperas la siguiente campanada, pero el péndulo está quieto.",

        opciones: [
            {
                texto: "Examinar el reloj",
                mensaje: "Las agujas están inmóviles. " +
                    "Entonces vuelves a oír la campanada. Viene del piso de arriba."
            },
            {
                texto: "Salir a la entrada",
                destino: "entrada",
                puerta: true
            }
        ]
    }
};

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

async function cruzarPuerta(destino) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        mostrarEscena(destino);
        return;
    }

    const pantalla = document.getElementById("pantalla-historia");
    const controles = document.querySelector(".controles-partida");

    // Durante el paso por la puerta evitamos un segundo clic.
    pantalla.inert = true;
    controles.inert = true;

    const capa = document.createElement("div");
    capa.className = "paso-puerta";
    capa.setAttribute("aria-hidden", "true");
    pantalla.appendChild(capa);

    const puerta = new Image();
    puerta.alt = "";

    try {
        // 1. La habitación actual se funde a negro.
        await capa.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { duration: 250 }
        ).finished;

        // 2. Aparece la puerta cerrada y la cámara se acerca.
        puerta.src = "assets/img/juego/puerta cerrada.png";
        await puerta.decode();
        capa.appendChild(puerta);

        await puerta.animate(
            [{ transform: "scale(0.92)" }, { transform: "scale(1)" }],
            { duration: 450, fill: "forwards" }
        ).finished;

        // 3. Cambia a abierta y avanzamos hacia el hueco.
        puerta.src = "assets/img/juego/puerta abierta.png";
        await puerta.decode();

        await puerta.animate(
            [{ transform: "scale(1)" }, { transform: "scale(1.18)" }],
            { duration: 400, fill: "forwards" }
        ).finished;
    } catch {
        // Si falta un PNG, el jugador puede continuar igualmente.
    }

    try {
        // 4. Preparamos el nuevo escenario detrás de la capa negra.
        puerta.remove();
        mostrarEscena(destino);

        const fondo = document.getElementById("imagen-escena");
        await fondo.decode().catch(() => {});

        await capa.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 300, fill: "forwards" }
        ).finished;
    } finally {
        capa.remove();
        pantalla.inert = false;
        controles.inert = false;

        const primeraOpcion = pantalla.querySelector("#opciones-escena button");
        primeraOpcion?.focus({ preventScroll: true });
    }
}

function seleccionarOpcion(opcion) {
    const texto = document.getElementById("texto-escena");

    if (opcion.condicion && !comprobarCondicion(opcion.condicion)) {
        texto.textContent = "Todavía no puedes hacerlo.";
        return;
    }

    if (opcion.accion && !realizarAccion(opcion.accion)) {
        texto.textContent = "Te falta algo para realizar esta acción.";
        return;
    }

    if (opcion.objeto) {
        if (tieneObjeto(opcion.objeto)) {
            texto.textContent = "Ya has registrado la guantera. Está vacía.";
            return;
        }

        recogerObjeto(opcion.objeto);
    }

    if (opcion.mensaje) {
        texto.textContent = opcion.mensaje;
    }

    if (opcion.destino) {
        if (opcion.puerta) {
            cruzarPuerta(opcion.destino);
        } else {
            mostrarEscena(opcion.destino);
        }
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