"use strict";

/* ==========================================================
   1. IMÁGENES Y OBJETOS
========================================================== */

const carpetaJuego = "assets/img/juego/";
const carpetaEscenarios = carpetaJuego + "escenarios/";
const carpetaObjetos = carpetaJuego + "Objetos funcionales/";
const carpetaHistoria = carpetaJuego + "objetos historia/";

const imagenesObjetos = {
  Linterna: "Linterna.png",
  Pilas: "Pilas.png",
  "Llave pequeña": "Llave pequeña.png",
  "Llave del sótano": "Llave sotano.png",
  Palanca: "Palanca puertas.png",
  Ganzúa: "Ganzua.png",
  Botiquín: "botiquin.png",
  Fusible: "Fusible.png",
  Destornillador: "Destornillador.png",
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
    objetos: [{ accion: "Registrar la guantera", nombre: "Linterna" }],
  },

  porche: {
    nombre: "Porche",
    imagen: carpetaJuego + "cinematica/Cinematica entrada.png",
    texto: "Hay luz dentro de la casa. La puerta principal cede al empujarla.",
    salidas: ["coche", "recibidor"],
  },

  recibidor: {
    nombre: "Recibidor",
    imagen: carpetaEscenarios + "recibidor.png",
    texto:
      "La puerta principal está bloqueada. Desde aquí ves el salón y las escaleras.",
    salidas: ["salon", "pasillo", "almacen"],
    escondite: "el armario del recibidor",
  },

  salon: {
    nombre: "Salón",
    imagen: carpetaEscenarios + "salon.png",
    texto:
      "Hay un escritorio junto al reloj. El sofá está separado de la pared.",
    salidas: ["recibidor", "cocina", "bano"],
    objetos: [
      { accion: "Registrar el escritorio", nombre: "Llave del sótano" },
    ],
    escondite: "el hueco detrás del sofá",
  },

  cocina: {
    nombre: "Cocina",
    imagen: carpetaEscenarios + "cocina.png",
    texto:
      "La puerta trasera da al patio. Hay cajones bajo el fregadero y una despensa.",
    salidas: ["salon", "patio"],
    objetos: [
      { accion: "Abrir el cajón", nombre: "Llave pequeña" },
      { accion: "Registrar la alacena", nombre: "Pilas" },
    ],
    escondite: "la despensa",
  },

  bano: {
    nombre: "Baño",
    imagen: carpetaEscenarios + "baño.png",
    texto:
      "Bajo el espejo hay un cajón. La cortina cubre la bañera hasta el suelo.",
    salidas: ["salon"],
    objetos: [{ accion: "Abrir el cajón del espejo", nombre: "Botiquín" }],
    escondite: "la bañera, detrás de la cortina",
  },

  pasillo: {
    nombre: "Pasillo de arriba",
    imagen: carpetaEscenarios + "pasillo-arriba.png",
    texto: "En el rellano hay dos puertas. Detrás de ti quedan las escaleras.",
    salidas: ["recibidor", "principal", "secundario"],
  },

  principal: {
    nombre: "Dormitorio principal",
    imagen: carpetaEscenarios + "dormitorio.png",
    texto:
      "Hay un cajón en la mesilla. El armario es lo bastante grande para entrar.",
    salidas: ["pasillo"],
    objetos: [{ accion: "Registrar el cajón de la mesilla", nombre: "Ganzúa" }],
    escondite: "el armario del dormitorio",
  },

  secundario: {
    nombre: "Dormitorio secundario",
    imagen: carpetaEscenarios + "dormitorio-infantil.png",
    texto: "La colcha llega casi hasta el suelo. Hay sitio debajo de la cama.",
    salidas: ["pasillo"],
    escondite: "el hueco bajo la cama",
  },

  patio: {
    nombre: "Patio trasero",
    imagen: carpetaEscenarios + "patio-trasero.png",
    texto:
      "A la izquierda está la verja. A la derecha, el cobertizo de la puerta verde.",
    salidas: ["cocina", "cobertizo"],
  },

  cobertizo: {
    nombre: "Cobertizo",
    imagen: carpetaEscenarios + "cobertizo.png",
    texto:
      "Hay herramientas colgadas y un banco de trabajo con marcas en la madera.",
    salidas: ["patio"],
    objetos: [{ accion: "Buscar bajo el banco de trabajo", nombre: "Palanca" }],
  },

  almacen: {
    nombre: "Almacén del sótano",
    imagen: carpetaEscenarios + "sotano.png",
    texto:
      "Las estanterías forman un pasillo. Desde aquí puedes alcanzar la sala eléctrica y la ventana.",
    salidas: ["recibidor", "electrica", "ventana"],
    objetos: [
      { accion: "Registrar las estanterías", nombre: "Destornillador" },
    ],
    escondite: "el hueco entre las estanterías",
  },

  electrica: {
    nombre: "Sala eléctrica",
    imagen: carpetaEscenarios + "sotano.png",
    texto: "En el cuadro eléctrico hay una ranura vacía. Debajo pone «VERJA».",
    salidas: ["almacen"],
    objetos: [{ accion: "Buscar en la caja de repuestos", nombre: "Fusible" }],
  },

  ventana: {
    nombre: "Ventana del sótano",
    imagen: carpetaEscenarios + "sotano.png",
    texto:
      "Entra aire entre los tablones. Si consigues retirarlos, cabes por la ventana.",
    salidas: ["almacen"],
  },
};

/* El asesino recorre habitaciones contiguas.
   Al terminar el recorrido, vuelve al principio. */
const patrulla = [
  "salon",
  "cocina",
  "patio",
  "cobertizo",
  "patio",
  "cocina",
  "salon",
  "bano",
  "salon",
  "recibidor",
  "pasillo",
  "principal",
  "pasillo",
  "secundario",
  "pasillo",
  "recibidor",
  "almacen",
  "electrica",
  "almacen",
  "ventana",
  "almacen",
  "recibidor",
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
    final: "",
  };
}

let partida = crearPartida();
let ocupado = false;

function tieneObjeto(nombre) {
  return partida.inventario.includes(nombre);
}

function gastarObjeto(nombre) {
  partida.inventario = partida.inventario.filter((objeto) => objeto !== nombre);
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
    return (
      "Oyes pasos muy cerca, por la zona de " +
      mapa[lugarAsesino].nombre.toLowerCase() +
      "."
    );
  }

  return "Desde aquí no oyes pasos cercanos.";
}

function curarConBotiquin() {
  if (partida.vidas !== 1 || !tieneObjeto("Botiquín")) {
    return false;
  }

  gastarObjeto("Botiquín");
  partida.vidas++;
  return true;
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
    const estabaContigo =
      anterior === partida.lugar && origenJugador === partida.lugar;

    if (!partida.escondido && (mismaHabitacion || cruce || estabaContigo)) {
      partida.vidas--;
      let avisoCaptura;

      if (partida.vidas === 0) {
        partida.final = "El asesino te alcanza. Fin de la partida.";
        avisoCaptura = "Has perdido tu última vida.";
      } else {
        partida.lugar = "recibidor";
        partida.pasoAsesino = patrulla.indexOf("cobertizo");

        avisoCaptura = curado
          ? "El asesino te hiere. Usas el botiquín y recuperas la vida perdida."
          : "El asesino te ha alcanzado. Te queda una vida.";

        mensaje = avisoCaptura + " Consigues refugiarte en el recibidor.";
      }

      mostrarAviso(
        avisoCaptura,
        carpetaJuego + "Asesino encapuchado con cuchilla ensangrentada.png",
      );
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
    await capa.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 220,
      fill: "forwards",
    }).finished;

    for (const estado of ["cerrada", "abierta"]) {
      puerta.src = carpetaJuego + "puerta " + estado + ".png";
      await puerta.decode();
      capa.append(puerta);

      const fotogramas =
        estado === "cerrada"
          ? [{ transform: "scale(0.90)" }, { transform: "scale(0.95)" }]
          : [{ transform: "scale(0.95)" }, { transform: "scale(1)" }];

      await puerta.animate(fotogramas, {
        duration: 400,
        easing: "ease-out",
        fill: "forwards",
      }).finished;
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
      mostrarJuego(
        "Tienes la llave, pero abajo está oscuro. Necesitas la linterna encendida.",
      );
      return;
    }
  }

  ocupado = true;

  try {
    const reducirMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (origen !== "coche" && destino !== "coche" && !reducirMovimiento) {
      await mostrarPuerta();
    }

    partida.lugar = destino;

    if (origen === "porche" && destino === "recibidor") {
      partida.pasoAsesino = patrulla.indexOf("patio");
      mostrarJuego(
        "La puerta se bloquea a tu espalda. Desde el fondo de la casa llega un crujido.",
      );
    } else {
      pasarTurno(mapa[destino].texto, origen);
    }
  } finally {
    ocupado = false;
  }
}

const documentosCasa = {
  recibidor: [
    {
      titulo: "Periódico",
      accion: "Leer el periódico doblado",
      imagen: "Periódico maldito de 1986.png",
      fragmento:
        "Edición del 4 de noviembre de 1986. Han recortado la noticia " +
        "de la casa, pero alguien ha rodeado a mano la hora: 23:47.",
    },
  ],
  principal: [
    {
      titulo: "Diario",
      accion: "Leer el diario de la mesilla",
      imagen: "Diario personal manchado.png",
      fragmento:
        "3 de noviembre. Anoche oí el teléfono desde el salón. " +
        "Esta mañana encontré el cable dentro del cajón.",
    },
  ],
  salon: [
    {
      titulo: "Fotografía familiar",
      accion: "Examinar la fotografía familiar",
      imagen: "objetos historia/Fotografía familiar desgastada.png",
      fragmento: "Tres personas posan en el patio. La cuarta silla está vacía.",
      reverso:
        "Elena, Julián y Clara Velasco. Patio de la casa, 12 de junio de 1978.",
    },
    {
      titulo: "Fotografía del protagonista",
      accion: "Examinar la segunda fotografía",
      imagen: "Fotografía del protagonista.png",
      fragmento: "Reconoces tu abrigo antes de reconocerte a ti.",
      reverso: "Álex. Porche de los Velasco, 4 de noviembre de 1986.",
    },
  ],
  secundario: [
    {
      titulo: "Cinta de casete",
      accion: "Escuchar la cinta del dormitorio",
      imagen: "Cinta casete.png",
      fragmento:
        "En la etiqueta solo se lee «1». Puedes escucharla o seguir explorando.",
      audio: "assets/audio/juego/casete 1.mp3",
    },
  ],
};

const avisosPendientes = [];

function mostrarAviso(titulo, rutaImagen, documento = {}) {
  avisosPendientes.push({ titulo, rutaImagen, documento });
  abrirAvisoPendiente();
}

function abrirAvisoPendiente() {
  const dialogo = elemento("aviso-juego");
  if (dialogo.open || avisosPendientes.length === 0) return;

  const fragmento = elemento("fragmento-aviso");
  const audio = elemento("audio-casete");
  const esDocumento = Boolean(documento.fragmento || documento.reverso);

  elemento("titulo-aviso").textContent = titulo;
  elemento("imagen-aviso").src = rutaImagen;

  dialogo.classList.toggle("modo-documento", esDocumento);

  fragmento.textContent = [documento.fragmento, documento.reverso]
    .filter(Boolean)
    .join("\n\n");

  fragmento.hidden = !esDocumento;
  elemento("controles-casete").hidden = !documento.audio;

  if (documento.audio) {
    audio.src = documento.audio;
  }
}

elemento("play-casete").onclick = async () => {
  try {
    await elemento("audio-casete").play();
  } catch {
    elemento("fragmento-aviso").textContent =
      "No se ha podido reproducir la cinta. Puedes continuar explorando.";
  }
};

elemento("stop-casete").onclick = () => {
  const audio = elemento("audio-casete");
  audio.pause();
  audio.currentTime = 0;
};

elemento("saltar-casete").onclick = () => elemento("aviso-juego").close();

elemento("aviso-juego").addEventListener("close", () => {
  const audio = elemento("audio-casete");
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  abrirAvisoPendiente();
});

function recogerObjeto(nombre) {
  partida.encontrados.push(nombre);
  partida.inventario.push(nombre);

  const curado = nombre === "Botiquín" && curarConBotiquin();

  const mensaje = curado
    ? "Encuentras el botiquín y te curas. Vuelves a tener dos vidas."
    : "Has obtenido: " + nombre;

  mostrarAviso(mensaje, carpetaObjetos + imagenesObjetos[nombre]);
  pasarTurno(mensaje);
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

  if (partida.inventario.length === 0) {
    contenedor.textContent = "Inventario vacío";
    return;
  }

  contenedor.textContent = partida.inventario.join(" · ");
}

const imagenesDeHuida = {
  recibidor: carpetaJuego + "Salidas/ChatGPT Image 29 oct 2026, 00_54_54.png",
  patio: carpetaJuego + "Salidas/ChatGPT Image 29 oct 2026, 00_52_24.png",
  ventana: carpetaJuego + "Salidas/ChatGPT Image 29 oct 2026, 00_39_10.png",
};

function obtenerImagenDePantalla(sala) {
  if (!partida.final) return sala.imagen;

  if (partida.vidas === 0) {
    return carpetaJuego + "No debiste entrar.png";
  }

  return imagenesDeHuida[partida.lugar] || sala.imagen;
}

function mostrarJuego(mensaje) {
  const sala = mapa[partida.lugar];

  elemento("pantalla-inicio").hidden = true;
  elemento("pantalla-historia").hidden = false;

  const foto = elemento("imagen-escena");
  const ruta = obtenerImagenDePantalla(sala);
  const imagenesDeHuida = {
    recibidor: carpetaJuego + "salidas/huida-recibidor.png",
    patio: carpetaJuego + "salidas/huida-patio.png",
    ventana: carpetaJuego + "salidas/huida-sotano.png",
  };

  function obtenerImagenDePantalla(sala) {
    if (!partida.final) return sala.imagen;

    if (partida.vidas === 0) {
      return carpetaJuego + "No debiste entrar.png";
    }

    return imagenesDeHuida[partida.lugar] || sala.imagen;
  }

  elemento("pantalla-historia").classList.toggle(
    "pantalla-final",
    Boolean(partida.final),
  );

  if (ruta) {
    foto.src = ruta;
    foto.alt = partida.final || sala.nombre;
    foto.style.display = "block";
  } else {
    foto.removeAttribute("src");
    foto.style.display = "none";
  }

  elemento("cartel-sala").textContent = partida.final
    ? partida.vidas === 0
      ? "GAME OVER"
      : "Has escapado"
    : sala.nombre;

  const narracion = [
    mensaje || sala.texto,
    partida.escondido ? "Estás a cubierto." : "",
    escucharPasos(),
  ];

  elemento("texto-escena").textContent =
    partida.final || narracion.filter(Boolean).join(" · ");

  elemento("estado-vidas").textContent = "Vidas: " + partida.vidas + " de 2";

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

  for (const documento of documentosCasa[partida.lugar] || []) {
    const clave = "documento:" + documento.titulo;
    const descubierto = partida.encontrados.includes(clave);
    const etiqueta = descubierto
      ? "Revisar: " + documento.titulo
      : documento.accion;

    crearBoton(etiqueta, () => {
      mostrarAviso(
        descubierto ? documento.titulo : "Has encontrado: " + documento.titulo,
        carpetaHistoria + documento.imagen,
        documento,
      );

      if (!descubierto) {
        partida.encontrados.push(clave);
        pasarTurno("Has encontrado: " + documento.titulo + ".");
      }
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

  if (partida.lugar === "electrica" && !partida.cuadroReparado) {
    crearBoton("Reparar el cuadro eléctrico", () => {
      if (!tieneObjeto("Fusible")) {
        mostrarJuego("La ranura está vacía. Necesitas un fusible.");
        return;
      }

      gastarObjeto("Fusible");
      partida.cuadroReparado = true;
      pasarTurno(
        "El cuadro zumba. El motor de la verja vuelve a tener corriente.",
      );
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
        terminarPartida(
          "Los tablones ceden. Escapas por la ventana del sótano.",
        );
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
      body: datos,
    });

    if (!respuesta.ok) throw new Error("Error al acceder a la partida.");

    if (accion === "cargar") {
      const guardada = await respuesta.json();

      if (
        !guardada ||
        !mapa[guardada.lugar] ||
        !Array.isArray(guardada.inventario) ||
        !Array.isArray(guardada.encontrados)
      ) {
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
    alert(
      "No se pudo completar la operación. Abre el juego desde Apache en XAMPP.",
    );
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
