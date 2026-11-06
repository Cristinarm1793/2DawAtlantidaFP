"use strict";

/* ==========================================================
   1. IMÁGENES Y OBJETOS
========================================================== */

const carpetaJuego = "assets/img/juego/";
const carpetaEscenarios = carpetaJuego + "escenarios/";
const carpetaObjetos = carpetaJuego + "Objetos funcionales/";

const imagenesObjetos = {
    "Linterna": "Linterna.png",
    "Pilas": "Pilas.png",
    "Llave pequeña": "Llave pequeña.png",
    "Llave del sótano": "Llave sotano.png",
    "Palanca": "Palanca puertas.png",
    "Ganzúa": "Ganzua.png",
    "Botiquín": "botiquin.png",
    "Fusible": "Fusible.png",
    "Destornillador": "Destornillador.png"
};

/* ==========================================================
   2. MAPA DE LA CASA

   salidas: habitaciones a las que puedes ir desde aquí.
   objetos: qué puedes registrar y qué encuentras.
   escondite: dónde puedes ocultarte en esa habitación.
========================================================== */

const mapa = {
    coche: {
        nombre: "Carretera",
        imagen: carpetaJuego + "cinematica/averia coche.png",
        texto: "El coche se ha parado. Al fondo de la carretera ves una casa.",
        salidas: ["porche"],
        objetos: [
            { accion: "Registrar la guantera", nombre: "Linterna" }
        ]
    },

    porche: {
        nombre: "Porche",
        imagen: carpetaJuego + "cinematica/Cinematica entrada.png",
        texto: "Hay luz dentro de la casa. La puerta principal cede al empujarla.",
        salidas: ["coche", "recibidor"]
    },

    recibidor: {
        nombre: "Recibidor",
        imagen: carpetaJuego + "puerta cerrada.png",
        texto: "La puerta principal está bloqueada. Desde aquí ves el salón y las escaleras.",
        salidas: ["salon", "pasillo", "almacen"],
        escondite: "el armario del recibidor"
    },

    salon: {
        nombre: "Salón",
        imagen: carpetaEscenarios + "salon.png",
        texto: "Hay un escritorio junto al reloj. El sofá está separado de la pared.",
        salidas: ["recibidor", "cocina", "bano"],
        objetos: [
            { accion: "Registrar el escritorio", nombre: "Llave del sótano" }
        ],
        escondite: "el hueco detrás del sofá"
    },

    cocina: {
        nombre: "Cocina",
        imagen: carpetaEscenarios + "cocina.png",
        texto: "La puerta trasera da al patio. Hay cajones bajo el fregadero y una despensa.",
        salidas: ["salon", "patio"],
        objetos: [
            { accion: "Abrir el cajón", nombre: "Llave pequeña" },
            { accion: "Registrar la alacena", nombre: "Pilas" }
        ],
        escondite: "la despensa"
    },

    bano: {
        nombre: "Baño",
        imagen: carpetaEscenarios + "baño.png",
        texto: "Bajo el espejo del lavabo hay un cajón estrecho.",
        salidas: ["salon"],
        objetos: [
            { accion: "Abrir el cajón del espejo", nombre: "Botiquín" }
        ]
    },

    pasillo: {
        nombre: "Pasillo de arriba",
        imagen: "",
        texto: "En el rellano hay dos puertas. Detrás de ti quedan las escaleras.",
        salidas: ["recibidor", "principal", "secundario"]
    },

    principal: {
        nombre: "Dormitorio principal",
        imagen: carpetaEscenarios + "dormitorio.png",
        texto: "Hay un cajón en la mesilla. El armario es lo bastante grande para entrar.",
        salidas: ["pasillo"],
        objetos: [
            { accion: "Registrar el cajón de la mesilla", nombre: "Ganzúa" }
        ],
        escondite: "el armario del dormitorio"
    },

    secundario: {
        nombre: "Dormitorio secundario",
        imagen: carpetaEscenarios + "dormitorio-infantil.png",
        texto: "La colcha llega casi hasta el suelo. Hay sitio debajo de la cama.",
        salidas: ["pasillo"],
        escondite: "el hueco bajo la cama"
    },

    patio: {
        nombre: "Patio trasero",
        imagen: carpetaEscenarios + "patio-trasero.png",
        texto: "A la izquierda está la verja. A la derecha, el cobertizo de la puerta verde.",
        salidas: ["cocina", "cobertizo"]
    },

    cobertizo: {
        nombre: "Cobertizo",
        imagen: carpetaEscenarios + "cobertizo.png",
        texto: "Hay herramientas colgadas y un banco de trabajo con marcas en la madera.",
        salidas: ["patio"],
        objetos: [
            { accion: "Buscar bajo el banco de trabajo", nombre: "Palanca" }
        ]
    },

    almacen: {
        nombre: "Almacén del sótano",
        imagen: carpetaEscenarios + "sotano.png",
        texto: "Las estanterías forman un pasillo. Desde aquí puedes alcanzar la sala eléctrica y la ventana.",
        salidas: ["recibidor", "electrica", "ventana"],
        objetos: [
            { accion: "Registrar las estanterías", nombre: "Destornillador" }
        ],
        escondite: "el hueco entre las estanterías"
    },

    electrica: {
        nombre: "Sala eléctrica",
        imagen: carpetaEscenarios + "sotano.png",
        texto: "En el cuadro eléctrico hay una ranura vacía. Debajo pone «VERJA».",
        salidas: ["almacen"],
        objetos: [
            { accion: "Buscar en la caja de repuestos", nombre: "Fusible" }
        ]
    },

    ventana: {
        nombre: "Ventana del sótano",
        imagen: carpetaEscenarios + "sotano.png",
        texto: "Entra aire entre los tablones. Si consigues retirarlos, cabes por la ventana.",
        salidas: ["almacen"]
    }
};

/* El asesino recorre habitaciones contiguas.
   Al terminar el recorrido, vuelve al principio. */
const patrulla = [
    "salon", "cocina", "patio", "cobertizo", "patio", "cocina",
    "salon", "bano", "salon", "recibidor", "pasillo", "principal",
    "pasillo", "secundario", "pasillo", "recibidor", "almacen",
    "electrica", "almacen", "ventana", "almacen", "recibidor"
];

function crearPartida() {
    return {
        lugar: "coche",
        inventario: [],
        encontrados: [],
        vidas: 2,
        pasoAsesino: -1,
        escondido: false,
        linternaEncendida: false,
        cuadroReparado: false,
        final: ""
    };
}

let partida = crearPartida();
let ocupado = false;

function tieneObjeto(nombre) {
    return partida.inventario.includes(nombre);
}

function gastarObjeto(nombre) {
    partida.inventario = partida.inventario.filter(objeto => objeto !== nombre);
}

function elemento(id) {
    return document.getElementById(id);
}

/* ==========================================================
   3. PASOS Y TURNOS
========================================================== */

function escucharPasos() {
    if (partida.pasoAsesino < 0) return "";

    const lugarAsesino = patrulla[partida.pasoAsesino];

    if (lugarAsesino === partida.lugar) {
        return "Oyes su respiración en esta misma habitación.";
    }

    if (mapa[partida.lugar].salidas.includes(lugarAsesino)) {
        return "Oyes pasos muy cerca, por la zona de " +
            mapa[lugarAsesino].nombre.toLowerCase() + ".";
    }

    return "Desde aquí no oyes pasos cercanos.";
}

function pasarTurno(mensaje, origenJugador = partida.lugar) {
    if (partida.pasoAsesino >= 0) {
        const anterior = patrulla[partida.pasoAsesino];

        partida.pasoAsesino = (partida.pasoAsesino + 1) % patrulla.length;
        const actual = patrulla[partida.pasoAsesino];

        // Coincidís al terminar el turno, os cruzáis por una puerta
        // o sales del escondite mientras él sigue en tu habitación.
        const mismaHabitacion = actual === partida.lugar;
        const cruce = anterior === partida.lugar && actual === origenJugador;
        const estabaContigo = anterior === partida.lugar &&
            origenJugador === partida.lugar;

        if (!partida.escondido && (mismaHabitacion || cruce || estabaContigo)) {
            partida.vidas--;

            if (partida.vidas === 0) {
                partida.final = "Te ha encontrado por segunda vez. Fin de la partida.";
            } else {
                partida.lugar = "recibidor";
                partida.pasoAsesino = patrulla.indexOf("cobertizo");
                mensaje = "Te alcanza. Consigues soltarte y retrocedes al recibidor. " +
                    "Te queda una vida.";
            }
        }
    }

    mostrarJuego(mensaje);
}

/* ==========================================================
   4. TRANSICIÓN Y CAMBIO DE HABITACIÓN
========================================================== */

async function mostrarPuerta() {
    const capa = document.createElement("div");
    capa.className = "paso-puerta";
    capa.setAttribute("aria-hidden", "true");
    elemento("pantalla-historia").append(capa);

    const puerta = new Image();
    puerta.alt = "";

    try {
        await capa.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { duration: 220, fill: "forwards" }
        ).finished;

        for (const estado of ["cerrada", "abierta"]) {
            puerta.src = carpetaJuego + "puerta " + estado + ".png";
            await puerta.decode();
            capa.append(puerta);

            await puerta.animate(
                [{ transform: "scale(1)" }, { transform: "scale(1.1)" }],
                { duration: 400, fill: "forwards" }
            ).finished;
        }
    } catch {
        // Si falta una imagen de puerta, todavía se puede cruzar.
    } finally {
        capa.remove();
    }
}

async function irA(destino) {
    if (ocupado) return;

    const origen = partida.lugar;

    if (origen === "recibidor" && destino === "almacen") {
        if (!tieneObjeto("Llave del sótano")) {
            mostrarJuego("La puerta del sótano está cerrada con llave.");
            return;
        }

        if (!partida.linternaEncendida) {
            mostrarJuego("Tienes la llave, pero abajo está oscuro. Necesitas la linterna encendida.");
            return;
        }
    }

    ocupado = true;

    try {
        const reducirMovimiento = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (origen !== "coche" && destino !== "coche" && !reducirMovimiento) {
            await mostrarPuerta();
        }

        partida.lugar = destino;

        if (origen === "porche" && destino === "recibidor") {
            partida.pasoAsesino = patrulla.indexOf("patio");
            mostrarJuego("La puerta se bloquea a tu espalda. Desde el fondo de la casa llega un crujido.");
        } else {
            pasarTurno(mapa[destino].texto, origen);
        }
    } finally {
        ocupado = false;
    }
}

function recogerObjeto(nombre) {
    partida.encontrados.push(nombre);
    partida.inventario.push(nombre);
    pasarTurno("Encuentras: " + nombre + ".");
}

function terminarPartida(mensaje) {
    partida.final = mensaje;
    mostrarJuego();
}

/* ==========================================================
   5. PANTALLA E INVENTARIO
========================================================== */

function crearBoton(texto, accion) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = texto;

    boton.addEventListener("click", () => {
        if (!ocupado) accion();
    });

    elemento("opciones-escena").append(boton);
}

function mostrarInventario() {
    const contenedor = elemento("inventario");
    contenedor.replaceChildren();

    if (partida.inventario.length === 0) {
        contenedor.textContent = "Inventario vacío";
        return;
    }

    for (const nombre of partida.inventario) {
        const ficha = document.createElement("span");
        ficha.className = "objeto-inventario";

        const foto = new Image();
        foto.src = carpetaObjetos + imagenesObjetos[nombre];
        foto.alt = "";

        ficha.append(foto, nombre);
        contenedor.append(ficha);
    }
}

function mostrarJuego(mensaje) {
    const sala = mapa[partida.lugar];

    elemento("pantalla-inicio").hidden = true;
    elemento("pantalla-historia").hidden = false;

    const foto = elemento("imagen-escena");

    if (sala.imagen) {
        foto.src = sala.imagen;
        foto.alt = sala.nombre;
        foto.style.display = "block";
    } else {
        foto.removeAttribute("src");
        foto.style.display = "none";
    }

    const narracion = [
        sala.nombre,
        mensaje || sala.texto,
        partida.escondido ? "Estás a cubierto." : "",
        escucharPasos()
    ];

    elemento("texto-escena").textContent =
        partida.final || narracion.filter(Boolean).join(" · ");

    elemento("estado-vidas").textContent =
        "Vidas: " + partida.vidas + " de 2";

    mostrarInventario();
    elemento("opciones-escena").replaceChildren();

    if (partida.final) return;

    if (partida.escondido) {
        crearBoton("Esperar en silencio", () => {
            pasarTurno("Contienes la respiración.");
        });

        crearBoton("Salir del escondite", () => {
            partida.escondido = false;
            pasarTurno("Sales con cuidado.");
        });

        return;
    }

    for (const objeto of sala.objetos || []) {
        if (!partida.encontrados.includes(objeto.nombre)) {
            crearBoton(objeto.accion, () => recogerObjeto(objeto.nombre));
        }
    }

    for (const destino of sala.salidas) {
        crearBoton("Ir a " + mapa[destino].nombre, () => irA(destino));
    }

    if (sala.escondite) {
        crearBoton("Esconderse en " + sala.escondite, () => {
            partida.escondido = true;
            pasarTurno("Te ocultas y escuchas.");
        });
    }

    mostrarAccionesEspeciales();

    if (partida.pasoAsesino >= 0) {
        crearBoton("Esperar un turno", () => pasarTurno("Te quedas escuchando."));
    }
}

/* ==========================================================
   6. USAR OBJETOS Y ESCAPAR
========================================================== */

function mostrarAccionesEspeciales() {
    if (tieneObjeto("Linterna") && !partida.linternaEncendida) {
        crearBoton("Encender la linterna", () => {
            if (!tieneObjeto("Pilas")) {
                mostrarJuego("El interruptor hace clic. Faltan las pilas.");
                return;
            }

            gastarObjeto("Pilas");
            partida.linternaEncendida = true;
            pasarTurno("Colocas las pilas. La linterna se enciende.");
        });
    }

    if (tieneObjeto("Botiquín") && partida.vidas === 1) {
        crearBoton("Usar el botiquín", () => {
            gastarObjeto("Botiquín");
            partida.vidas = 2;
            pasarTurno("Te curas la herida.");
        });
    }

    if (partida.lugar === "electrica" && !partida.cuadroReparado) {
        crearBoton("Reparar el cuadro eléctrico", () => {
            if (!tieneObjeto("Fusible")) {
                mostrarJuego("La ranura está vacía. Necesitas un fusible.");
                return;
            }

            gastarObjeto("Fusible");
            partida.cuadroReparado = true;
            pasarTurno("El cuadro zumba. El motor de la verja vuelve a tener corriente.");
        });
    }

    if (partida.lugar === "recibidor") {
        crearBoton("Forzar la puerta principal", () => {
            if (tieneObjeto("Ganzúa")) {
                terminarPartida("La cerradura cede. Escapas por la puerta principal.");
            } else {
                mostrarJuego("El pestillo está bloqueado. Necesitas una ganzúa.");
            }
        });
    }

    if (partida.lugar === "patio") {
        crearBoton("Accionar la verja", () => {
            if (partida.cuadroReparado) {
                terminarPartida("La verja se abre. Escapas por el patio.");
            } else {
                mostrarJuego("Pulsas el interruptor. El motor sigue sin corriente.");
            }
        });
    }

    if (partida.lugar === "ventana") {
        crearBoton("Quitar los tablones", () => {
            if (tieneObjeto("Palanca")) {
                terminarPartida("Los tablones ceden. Escapas por la ventana del sótano.");
            } else {
                mostrarJuego("Los tablones están clavados. Necesitas una palanca.");
            }
        });
    }
}

/* ==========================================================
   7. GUARDAR, CARGAR Y REINICIAR
========================================================== */

async function controlarPartida(accion) {
    if (ocupado) return;

    if (accion === "reiniciar" && !confirm("¿Quieres reiniciar la partida?")) {
        return;
    }

    ocupado = true;

    try {
        const datos = new FormData();
        datos.append("accion", accion);

        if (accion === "guardar") {
            datos.append("estado", JSON.stringify(partida));
        }

        const respuesta = await fetch("php/juego.php", {
            method: "POST",
            body: datos
        });

        if (!respuesta.ok) throw new Error("Error al acceder a la partida.");

        if (accion === "cargar") {
            const guardada = await respuesta.json();

            if (!guardada || !mapa[guardada.lugar] ||
                !Array.isArray(guardada.inventario) ||
                !Array.isArray(guardada.encontrados)) {
                alert("Todavía no hay una partida guardada de esta versión.");
                return;
            }

            partida = guardada;
            mostrarJuego();
        } else if (accion === "reiniciar") {
            partida = crearPartida();
            mostrarJuego();
        } else {
            alert("Partida guardada.");
        }
    } catch {
        alert("No se pudo completar la operación. Abre el juego desde Apache en XAMPP.");
    } finally {
        ocupado = false;
    }
}

/* El script del HTML ya tiene defer, así que los botones ya existen. */
elemento("iniciar-juego").addEventListener("click", () => mostrarJuego());

for (const accion of ["guardar", "cargar", "reiniciar"]) {
    elemento("btn-" + accion).addEventListener("click", () => {
        controlarPartida(accion);
    });
}