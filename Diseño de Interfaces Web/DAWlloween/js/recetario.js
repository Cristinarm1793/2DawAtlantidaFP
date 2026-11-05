"use strict";

/* ==========================================================
   RECETARIO DE BRUJA
   MUSEUM 404: NOT FOUND
========================================================== */

/* ==========================================================
   1. RECETAS
========================================================== */

const respuesta = await fetch("./recetas.json");

if (!respuesta.ok) {
  throw new Error(`No se pudo cargar recetas.json (HTTP ${respuesta.status}).`);
}

const recetas = await respuesta.json();

/* ==========================================================
   2. ELEMENTOS HTML
========================================================== */

const portada = document.getElementById("portada");
const indice = document.getElementById("indice");
const paginaReceta = document.getElementById("pagina-receta");

const botonAbrir = document.getElementById("abrir-libro");

const navegacion = document.getElementById("navegacion-libro");

const botonAnterior = document.getElementById("pagina-anterior");
const botonSiguiente = document.getElementById("pagina-siguiente");
const volverAlIndice = document.getElementById("volver-al-indice");

const numeroPagina = document.getElementById("numero-pagina");

const nombreReceta = document.getElementById("nombre-receta");
const fotoReceta = document.getElementById("foto-receta");

const listaIngredientes = document.getElementById("lista-ingredientes");
const listaPasos = document.getElementById("lista-pasos");

/* ==========================================================
   3. ESTADO DEL LIBRO

   0 = Portada
   1 = Índice
   2 = Primera receta
   3 = Segunda receta
   4 = Tercera receta
   5 = Cuarta receta
========================================================== */

let paginaActual = 0;

/* ==========================================================
   4. MOSTRAR UNA PÁGINA
========================================================== */

function mostrarPagina(numero) {
  portada.hidden = true;
  indice.hidden = true;
  paginaReceta.hidden = true;
  indiceCompleto.hidden = true;
  if (numero < 0 || numero > recetas.length + 1) {
    return;
  }

  paginaActual = numero;

  // Ocultamos todas las páginas.
  portada.hidden = true;
  indice.hidden = true;
  paginaReceta.hidden = true;

  // Portada.
  if (paginaActual === 0) {
    portada.hidden = false;
    navegacion.hidden = true;
    return;
  }

  // A partir del índice mostramos las flechas.
  navegacion.hidden = paginaActual === 1;

  // Índice.
  if (paginaActual === 1) {
    indice.hidden = false;
  } else {
    // Convertimos el número de página en índice del array.
    const posicionReceta = paginaActual - 2;

    mostrarReceta(posicionReceta);

    paginaReceta.hidden = false;
  }

  // Actualizamos los controles.
  botonAnterior.disabled = paginaActual === 0;
  botonSiguiente.disabled = paginaActual === recetas.length + 1;

  numeroPagina.textContent = `Página ${paginaActual} de ${recetas.length + 1}`;
}

/* ==========================================================
   5. MOSTRAR LOS DATOS DE UNA RECETA
========================================================== */

function mostrarReceta(posicion) {
  const receta = recetas[posicion];

  nombreReceta.textContent = receta.nombre;

  fotoReceta.src = receta.imagen;
  fotoReceta.alt = `Imagen de ${receta.nombre}`;

  // Limpiamos los ingredientes anteriores.
  listaIngredientes.innerHTML = "";

  receta.ingredientes.forEach((ingrediente) => {
    const elemento = document.createElement("li");

    elemento.textContent = ingrediente;

    listaIngredientes.appendChild(elemento);
  });

  // Limpiamos los pasos anteriores.
  listaPasos.innerHTML = "";

  receta.pasos.forEach((paso) => {
    const elemento = document.createElement("li");

    elemento.textContent = paso;

    listaPasos.appendChild(elemento);
  });
}

/* ==========================================================
   6. ABRIR EL LIBRO
========================================================== */

const libro = document.querySelector(".libro");
const imagenPortada = botonAbrir.querySelector(".imagen-libro");

botonAbrir.addEventListener("click", function () {
  // Si la persona prefiere menos movimiento, abrimos directamente.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    mostrarPagina(1);
    indice.querySelector("button").focus();
    return;
  }

  // Preparamos el índice debajo de la portada.
  botonAbrir.disabled = true;
  indice.inert = true;
  indice.hidden = false;

  // Al terminar el giro, activamos el índice y las flechas.
  imagenPortada.addEventListener(
    "animationend",
    function () {
      mostrarPagina(1);
      libro.classList.remove("abriendo");
      indice.inert = false;
      botonAbrir.disabled = false;
      indice.querySelector("button").focus();
    },
    { once: true },
  );

  libro.classList.add("abriendo");
});

/* ==========================================================
   7. ELEGIR UNA TARJETA Y ABRIR SU RECETA
========================================================== */

const listaRecetas = document.querySelector("#indice .lista-recetas");
const indiceCompleto = document.getElementById("indice-completo");
const listaIndiceCompleto = document.getElementById("lista-indice-completo");
const abrirIndiceCompleto = document.getElementById("abrir-indice-completo");
const volverATarjetas = document.getElementById("volver-a-tarjetas");

let pasandoHoja = false;

function abrirRecetaConAnimacion(posicion, paginaOrigen) {
  if (pasandoHoja) return;

  const numeroDestino = posicion + 2;
  const reducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducirMovimiento) {
    mostrarPagina(numeroDestino);
    return;
  }

  pasandoHoja = true;

  // Preparamos la receta debajo de la hoja que vamos a girar.
  mostrarPagina(numeroDestino);
  paginaOrigen.hidden = false;
  paginaOrigen.inert = true;
  paginaReceta.inert = true;

  function terminarGiro(evento) {
    if (
      evento.target !== paginaOrigen ||
      evento.animationName !== "abrir-tapa"
    ) {
      return;
    }

    paginaOrigen.removeEventListener("animationend", terminarGiro);
    paginaOrigen.removeEventListener("animationcancel", terminarGiro);

    paginaOrigen.hidden = true;
    paginaOrigen.classList.remove("hoja-que-gira");
    libro.classList.remove("girando-indice");

    paginaOrigen.inert = false;
    paginaReceta.inert = false;
    pasandoHoja = false;

    document.getElementById("volver-al-indice").focus({ preventScroll: true });
  }

  paginaOrigen.addEventListener("animationend", terminarGiro);
  paginaOrigen.addEventListener("animationcancel", terminarGiro);

  libro.classList.add("girando-indice");
  paginaOrigen.classList.add("hoja-que-gira");
}

recetas.forEach(function (receta, posicion) {
  const tarjeta = document.createElement("button");

  tarjeta.type = "button";
  tarjeta.className = "tarjeta-receta";
  tarjeta.dataset.receta = posicion;
  const titulo = receta.nombre || `Receta ${posicion + 1}`;

  const foto = document.createElement("img");
  foto.src = receta.imagen;
  foto.alt = "";
  foto.className = "foto-tarjeta";

  const nombre = document.createElement("span");
  nombre.textContent = titulo;

  tarjeta.append(foto, nombre);

  listaRecetas.appendChild(tarjeta);
  const elemento = document.createElement("li");
  const botonReceta = document.createElement("button");

  botonReceta.type = "button";
  botonReceta.textContent = titulo;

  botonReceta.addEventListener("click", function () {
    mostrarTarjeta(posicion);
    mostrarPagina(posicion + 2);
  });

  elemento.appendChild(botonReceta);
  listaIndiceCompleto.appendChild(elemento);
});

const tarjetas = listaRecetas.querySelectorAll(".tarjeta-receta");
const tarjetaAnterior = document.getElementById("tarjeta-anterior");
const tarjetaSiguiente = document.getElementById("tarjeta-siguiente");

let posicionTarjeta = 0;

function mostrarTarjeta(posicion) {
  posicionTarjeta = posicion;

  tarjetas.forEach(function (tarjeta, indiceTarjeta) {
    tarjeta.hidden = indiceTarjeta !== posicionTarjeta;
  });
}

tarjetaAnterior.addEventListener("click", function () {
  if (posicionTarjeta === 0) {
    mostrarTarjeta(tarjetas.length - 1);
  } else {
    mostrarTarjeta(posicionTarjeta - 1);
  }
});

tarjetaSiguiente.addEventListener("click", function () {
  if (posicionTarjeta === tarjetas.length - 1) {
    mostrarTarjeta(0);
  } else {
    mostrarTarjeta(posicionTarjeta + 1);
  }
});

tarjetas.forEach(function (tarjeta) {
  tarjeta.addEventListener("click", function () {
    const posicionReceta = Number(tarjeta.dataset.receta);
    mostrarPagina(posicionReceta + 2);
  });
});

mostrarTarjeta(0);

abrirIndiceCompleto.addEventListener("click", function () {
  indice.hidden = true;
  indiceCompleto.hidden = false;
  listaIndiceCompleto.querySelector("button")?.focus();
});

volverATarjetas.addEventListener("click", function () {
  mostrarPagina(1);
  abrirIndiceCompleto.focus();
});
abrirIndiceCompleto.addEventListener("click", function () {
  indice.hidden = true;
  indiceCompleto.hidden = false;
  listaIndiceCompleto.querySelector("button")?.focus();
});

volverATarjetas.addEventListener("click", function () {
  mostrarPagina(1);
  abrirIndiceCompleto.focus();
});

/* ==========================================================
   8. PASAR PÁGINAS MANUALMENTE
========================================================== */

botonAnterior.addEventListener("click", function () {
  mostrarPagina(paginaActual - 1);
});

botonSiguiente.addEventListener("click", function () {
  mostrarPagina(paginaActual + 1);
});

/* ==========================================================
   9. ESTADO INICIAL
========================================================== */

volverAlIndice.addEventListener("click", function () {
  mostrarPagina(1);
});

mostrarPagina(0);
