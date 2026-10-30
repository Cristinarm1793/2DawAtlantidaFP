"use strict";

/* =====================================================
   MUSEUM 404: NOT FOUND
   INTERACCIONES DE LAS SEIS VITRINAS
===================================================== */


/* =====================================================
   1. GUSANO MORRIS
   Cada clic crea una copia del disquete.
   Cuando la vitrina está llena, deja de multiplicarse.
===================================================== */

const btnMorris = document.getElementById("btn-morris");
const zonaMorris = document.getElementById("zona-morris");
const objetoMorris = document.getElementById("objeto-morris");
const mensajeMorris = document.getElementById("mensaje-morris");

const MAX_COPIAS = 12;
let copiasMorris = 0;

btnMorris.addEventListener("click", () => {

    if (copiasMorris < MAX_COPIAS) {

        // Creamos una copia de la imagen original
        const copia = document.createElement("img");

        copia.src = objetoMorris.src;
        copia.alt = "Copia del disquete infectado";
        copia.classList.add("copia-morris");

        // Añadimos la copia a la vitrina
        zonaMorris.appendChild(copia);

        copiasMorris++;

        mensajeMorris.textContent =
            `El gusano se ha replicado. Copias: ${copiasMorris}`;

        if (copiasMorris === MAX_COPIAS) {
            mensajeMorris.textContent =
                "ERROR: La vitrina está completamente infectada.";

            btnMorris.disabled = true;
        }

    }

});


/* =====================================================
   2. WINDOWS 98
   Al pasar el cursor sobre el monitor aparece
   un pantallazo azul durante unos segundos.
===================================================== */

const objetoWindows = document.getElementById("objeto-windows");
const pantallazoAzul = document.getElementById("pantallazo-azul");

let temporizadorWindows = null;
let windowsActivo = false;

objetoWindows.addEventListener("mouseenter", () => {

    if (windowsActivo) {
        return;
    }

    windowsActivo = true;

    pantallazoAzul.hidden = false;

    temporizadorWindows = setTimeout(() => {

        pantallazoAzul.hidden = true;
        windowsActivo = false;
        temporizadorWindows = null;

    }, 2500);

});


/* =====================================================
   3. DEATHSTAR
   El disco duro desaparece y reaparece repetidamente.
===================================================== */

const objetoDeathstar = document.getElementById("objeto-deathstar");
const mensajeDeathstar = document.getElementById("mensaje-deathstar");

let deathstarDesaparecido = false;

const intervaloDeathstar = setInterval(() => {

    deathstarDesaparecido = !deathstarDesaparecido;

    objetoDeathstar.classList.toggle(
        "desaparecido",
        deathstarDesaparecido
    );

    if (deathstarDesaparecido) {

        mensajeDeathstar.textContent =
            "ERROR: Dispositivo no encontrado.";

    } else {

        mensajeDeathstar.textContent =
            "Dispositivo detectado... por ahora.";

    }

}, 3000);


/* =====================================================
   4. THERAC-25
   El sistema se bloquea permanentemente
   al intentar encenderlo.
===================================================== */

const btnTherac = document.getElementById("btn-therac");
const mensajeTherac = document.getElementById("mensaje-therac");

btnTherac.addEventListener("click", () => {

    mensajeTherac.textContent =
        "MALFUNCTION 54 — SISTEMA BLOQUEADO. " +
        "Por seguridad, la máquina no puede encenderse.";

    btnTherac.disabled = true;

    btnTherac.textContent = "Sistema bloqueado";

});


/* =====================================================
   5. PATRIOT
   Simulación de 100 horas de funcionamiento
   en aproximadamente 10 segundos.

   El desfase aumenta hasta 0,34 segundos.
===================================================== */

const btnPatriot = document.getElementById("btn-patriot");
const horasPatriot = document.getElementById("horas-patriot");
const desfasePatriot = document.getElementById("desfase-patriot");
const mensajePatriot = document.getElementById("mensaje-patriot");

let intervaloPatriot = null;
let horasSimuladas = 0;

btnPatriot.addEventListener("click", () => {

    // Evitamos iniciar dos simulaciones a la vez
    if (intervaloPatriot !== null) {
        return;
    }

    horasSimuladas = 0;

    horasPatriot.textContent = "0";
    desfasePatriot.textContent = "0.000";
    mensajePatriot.textContent = "";

    btnPatriot.disabled = true;
    btnPatriot.textContent = "Simulación en curso...";

    intervaloPatriot = setInterval(() => {

        horasSimuladas++;

        // El desfase aumenta proporcionalmente
        const desfase = (horasSimuladas / 100) * 0.34;

        horasPatriot.textContent = horasSimuladas;
        desfasePatriot.textContent = desfase.toFixed(3);

        if (horasSimuladas >= 100) {

            clearInterval(intervaloPatriot);
            intervaloPatriot = null;

            mensajePatriot.textContent =
                "ERROR DE SINCRONIZACIÓN. " +
                "Desfase acumulado: 0,34 segundos. " +
                "La simulación ha finalizado.";

            btnPatriot.textContent = "Simulación finalizada";

        }

    }, 100);

});


/* =====================================================
   6. POLILLA DEL HARVARD MARK II
   Al pasar el cursor sobre la polilla,
   comienza una animación de vuelo.
===================================================== */

const objetoBug = document.getElementById("objeto-bug");
const mensajeBug = document.getElementById("mensaje-bug");

let bugVolando = false;

objetoBug.addEventListener("mouseenter", () => {

    if (bugVolando) {
        return;
    }

    bugVolando = true;

    mensajeBug.textContent = "BUG DETECTED";

    objetoBug.classList.add("volando");

});

objetoBug.addEventListener("animationend", () => {

    objetoBug.classList.remove("volando");

    mensajeBug.textContent =
        "Error solucionado. Hasta el próximo bug.";

    bugVolando = false;

});


/* =====================================================
   7. RESTAURAR MUSEO
   Reinicia todas las anomalías de las vitrinas.
===================================================== */

const btnRestaurar = document.getElementById("btn-restaurar");

btnRestaurar.addEventListener("click", () => {

    /* ---------- MORRIS ---------- */

    const copias = zonaMorris.querySelectorAll(".copia-morris");

    copias.forEach(copia => {
        copia.remove();
    });

    copiasMorris = 0;

    mensajeMorris.textContent = "";

    btnMorris.disabled = false;


    /* ---------- WINDOWS 98 ---------- */

    if (temporizadorWindows !== null) {
        clearTimeout(temporizadorWindows);
        temporizadorWindows = null;
    }

    pantallazoAzul.hidden = true;
    windowsActivo = false;


    /* ---------- DEATHSTAR ---------- */

    deathstarDesaparecido = false;

    objetoDeathstar.classList.remove("desaparecido");

    mensajeDeathstar.textContent = "";


    /* ---------- THERAC-25 ---------- */

    btnTherac.disabled = false;

    btnTherac.textContent = "Encender sistema";

    mensajeTherac.textContent = "";


    /* ---------- PATRIOT ---------- */

    if (intervaloPatriot !== null) {
        clearInterval(intervaloPatriot);
        intervaloPatriot = null;
    }

    horasSimuladas = 0;

    horasPatriot.textContent = "0";
    desfasePatriot.textContent = "0.000";

    mensajePatriot.textContent = "";

    btnPatriot.disabled = false;
    btnPatriot.textContent = "Iniciar simulación";


    /* ---------- POLILLA ---------- */

    objetoBug.classList.remove("volando");

    mensajeBug.textContent = "";

    bugVolando = false;


    /* ---------- CONFIRMACIÓN ---------- */

    alert("Museo restaurado. Todas las anomalías han sido reiniciadas.");

});