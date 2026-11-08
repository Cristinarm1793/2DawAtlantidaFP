"use strict";

/* MUSEUM 404: NOT FOUND*/

/* =====================================================
   1. GUSANO MORRIS
===================================================== */

//Cada clic crea una copia del disquete y cuando la vitrina está llena, deja de multiplicarse.

const btnMorris = document.getElementById("btn-morris");
const zonaMorris = document.getElementById("zona-morris");
const objetoMorris = document.getElementById("objeto-morris");
const mensajeMorris = document.getElementById("mensaje-morris");

const MAX_COPIAS = 12;
let copiasMorris = 0;

btnMorris.addEventListener("click", () => {
  if (copiasMorris < MAX_COPIAS) {
    const copia = document.createElement("img");

    copia.src = objetoMorris.src;
    copia.alt = "Copia del disquete infectado";
    copia.classList.add("copia-morris");

    zonaMorris.appendChild(copia);

    copiasMorris++;

    mensajeMorris.textContent = `El gusano se ha replicado. Copias: ${copiasMorris}`;

    if (copiasMorris === MAX_COPIAS) {
      mensajeMorris.textContent =
        "ERROR: La vitrina está completamente infectada.";
      btnMorris.disabled = true;
    }
  }
});

/* =====================================================
   2. WINDOWS 98
===================================================== */

//Al pasar el cursor sobre el monitor aparece un pantallazo azul durante unos segundos.

const objetoWindows = document.getElementById("objeto-windows");
const pantallazoAzul = document.getElementById("pantallazo-azul");

let temporizadorWindows = null;
let windowsActivo = false;

const btnWindows = document.getElementById("btn-windows");

btnWindows.addEventListener("click", () => {
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
===================================================== */

// El disco duro desaparece y reaparece repetidamente.

const objetoDeathstar = document.getElementById("objeto-deathstar");
const mensajeDeathstar = document.getElementById("mensaje-deathstar");

let deathstarDesaparecido = false;

document.getElementById("btn-deathstar").addEventListener("click", () => {
  deathstarDesaparecido = !deathstarDesaparecido;
  objetoDeathstar.classList.toggle("desaparecido", deathstarDesaparecido);
  mensajeDeathstar.textContent = deathstarDesaparecido
    ? "ERROR: Dispositivo no encontrado."
    : "Dispositivo detectado... por ahora.";
});

/* =====================================================
   4. THERAC-25
===================================================== */

// El sistema se bloquea permanentemente al intentar encenderlo.

const btnTherac = document.getElementById("btn-therac");
const mensajeTherac = document.getElementById("mensaje-therac");

btnTherac.addEventListener("click", () => {
  mensajeTherac.textContent =
    "MALFUNCTION 54 — SISTEMA BLOQUEADO. " +
    "Por seguridad, la máquina no puede encenderse.";

  btnTherac.disabled = true;

  btnTherac.setAttribute("aria-label", "Sistema bloqueado; restablece las anomalías");
});

/* =====================================================
   5. PATRIOT
===================================================== */

// Simulación de 100 horas de funcionamiento en aproximadamente 10 segundos. El desfase aumenta hasta 0,34 segundos.

const btnPatriot = document.getElementById("btn-patriot");
const panelPatriot = document.getElementById("panel-patriot");
const horasPatriot = document.getElementById("horas-patriot");
const desfasePatriot = document.getElementById("desfase-patriot");
const mensajePatriot = document.getElementById("mensaje-patriot");

let intervaloPatriot = null;
let horasSimuladas = 0;

btnPatriot.addEventListener("click", () => {
  if (intervaloPatriot !== null) {
    return;
  }

  horasSimuladas = 0;

  horasPatriot.textContent = "0";
  desfasePatriot.textContent = "0.000";
  panelPatriot.hidden = false;
  btnPatriot.setAttribute("aria-expanded", "true");
  mensajePatriot.textContent = "Simulación en curso...";

  btnPatriot.disabled = true;

  intervaloPatriot = setInterval(() => {
    horasSimuladas++;

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
    }
  }, 100);
});

/* =====================================================
   6. POLILLA DEL HARVARD MARK II
===================================================== */

// Al pasar el cursor sobre la polilla, comienza una animación de vuelo.

const objetoBug = document.getElementById("objeto-bug");
const mensajeBug = document.getElementById("mensaje-bug");

let bugVolando = false;

function volarPolilla() {
  if (bugVolando) {
    return;
  }

  bugVolando = true;

  mensajeBug.textContent = "BUG DETECTED";

  objetoBug.classList.add("volando");
}

objetoBug.addEventListener("mouseenter", volarPolilla);
setInterval(() => {
  if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) volarPolilla();
}, 8000);

objetoBug.addEventListener("animationend", () => {
  objetoBug.classList.remove("volando");

  mensajeBug.textContent = "Error solucionado. Hasta el próximo bug.";

  bugVolando = false;
});

/* =====================================================
   7. RESTAURAR MUSEO
===================================================== */

// Reinicia todas las anomalías de las vitrinas.

const btnRestaurar = document.getElementById("btn-restaurar");

btnRestaurar.addEventListener("click", () => {
  /* ---------- MORRIS ---------- */

  const copias = zonaMorris.querySelectorAll(".copia-morris");

  copias.forEach((copia) => {
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

  btnTherac.setAttribute("aria-label", "Encender el sistema Therac-25");

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

  panelPatriot.hidden = true;
  btnPatriot.disabled = false;
  btnPatriot.setAttribute("aria-expanded", "false");

  /* ---------- POLILLA ---------- */

  objetoBug.classList.remove("volando");

  mensajeBug.textContent = "";

  bugVolando = false;

  /* ---------- CONFIRMACIÓN ---------- */

  document.getElementById("estado-museo").textContent = "Museo restaurado. Anomalías reiniciadas.";
});

/* Las fichas se leen fuera de las vitrinas para no desplazar los objetos. */
const dialogoFicha = document.getElementById("ficha-museo");
let origenFicha = null;
for (const ficha of document.querySelectorAll(".ficha-objeto")) {
  const resumen = ficha.querySelector("summary");
  resumen.addEventListener("click", (evento) => {
    evento.preventDefault();
    origenFicha = resumen;
    document.getElementById("titulo-ficha").textContent = resumen.textContent;
    const contenido = document.getElementById("contenido-ficha");
    contenido.replaceChildren();
    for (const hijo of ficha.children) {
      if (hijo !== resumen) contenido.append(hijo.cloneNode(true));
    }
    dialogoFicha.showModal();
  });
}
dialogoFicha.addEventListener("close", () => origenFicha?.focus());
