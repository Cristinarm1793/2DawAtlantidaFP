"use strict";

// Añade aquí tu foto cuando esté preparada. Ejemplo: assets/img/otros/cristina.jpg
const FOTO_AUTORA = "assets/img/otros/cristina.png";
// Puedes sustituir el sonido provisional por un archivo de audio propio.
const AUDIO_SUSTO = "";
const IMAGEN_ENTE = "assets/img/otros/ente.png";

const plantilla = document.createElement("template");
plantilla.innerHTML = `
<dialog id="archivo-nosotros" class="archivo-dialogo" aria-labelledby="archivo-titulo">
  <div class="carpeta-expediente">
    <button type="button" class="cerrar-archivo" aria-label="Cerrar sobre nosotros">×</button>
    <header class="pestana-expediente"><span>ARCHIVO DEL MUSEO</span><span>N.º 001</span></header>
    <h2 id="archivo-titulo" class="solo-lectores">Sobre nosotros: expediente confidencial</h2>
    <div class="fotos-expediente">
      <figure class="polaroid autora">
        <div class="foto-autora"><span>FOTO DE<br>CRISTINA</span></div>
        <figcaption>Cristina · Diseño y desarrollo</figcaption>
      </figure>
      <button type="button" class="polaroid foto-ente" aria-label="Examinar la fotografía del ente">
        <img src="${IMAGEN_ENTE}" alt="El ente del museo">
        <span>Identidad desconocida</span>
      </button>
    </div>
    <nav class="menu-expediente" aria-label="Contenido del expediente">
      <h3>EXPEDIENTE <span>N.º 001</span></h3>
      <button type="button" data-hoja="autora">♙ <span>Sobre mí</span> ▸</button>
      <button type="button" data-hoja="proyecto">▱ <span>El proyecto</span> ▸</button>
      <button type="button" data-hoja="bibliografia">☷ <span>Bibliografía</span> ▸</button>
    </nav>
    <p class="sello-expediente" aria-hidden="true">CONFIDENCIAL</p>
  </div>
</dialog>
<dialog id="hoja-expediente" class="hoja-dialogo" aria-labelledby="hoja-titulo">
  <article class="folio-expediente">
    <span class="numero-folio">ARCHIVO 001 · MUSEUM 404</span>
    <h2 id="hoja-titulo" tabindex="-1"></h2>
    <div id="hoja-contenido"></div>
    <form method="dialog"><button type="submit" class="volver-expediente">← Volver a la carpeta</button></form>
  </article>
</dialog>
<dialog id="susto-ente" aria-label="Aparición del ente">
  <img src="${IMAGEN_ENTE}" alt="El ente aparece frente a ti">
  <form method="dialog"><button type="submit">Cerrar</button></form>
</dialog>`;
document.body.append(plantilla.content);

const carpeta = document.getElementById("archivo-nosotros");
const hoja = document.getElementById("hoja-expediente");
const susto = document.getElementById("susto-ente");
const contenidos = {
  autora: {
    titulo: "Sobre mí",
    parrafos: [
      "Soy Cristina, estudiante de segundo curso de Desarrollo de Aplicaciones Web y creadora de Museum 404: Not Found.",
      "En este proyecto combino programación, diseño de interfaces y una ambientación inspirada en los videojuegos de terror.",
    ],
  },
  proyecto: {
    titulo: "El proyecto",
    parrafos: [
      "Museum 404 es un proyecto de Halloween de segundo de DAW que consiste en aplicar lo aprendido en las asignaturas de programación y diseño web. Reúne un museo de errores informáticos, un recetario interactivo y una aventura de terror.",
      "Las vitrinas permiten experimentar con anomalías inspiradas en fallos históricos. El recetario funciona como un libro y el juego propone explorar una casa para encontrar una salida.",
      "La web utiliza HTML, CSS y JavaScript. PHP guarda las cuentas de visitantes en un archivo JSON privado y las partidas en la sesión del navegador, además de gestionar el formulario de contacto.",
    ],
  },
  bibliografia: {
    titulo: "Bibliografía y reconocimientos",
    parrafos: [
      "Proyecto creado por Cristina como parte de segundo curso de Desarrollo de Aplicaciones Web.",

      "ChatGPT, de OpenAI: apoyo en la elaboración y revisión del código, resolución de dudas, documentación y generación de recursos visuales. Su utilización se reconoce como asistencia durante el desarrollo.",

      "ElevenLabs y Descript: herramientas utilizadas durante la preparación de los recursos de voz y audio del proyecto.",

      "Zork: inspiración para la exploración de habitaciones, el inventario y la narración de la aventura. Nuestro juego adapta esas ideas a decisiones mediante botones.",

      "Otras referencias de ambientación: FAITH, Resident Evil y MediEvil. Jack Skellington es un personaje de referencia y no una creación original de este proyecto.",

      "Gusano Morris — FBI, Morris Worm: https://www.fbi.gov/history/cases-and-criminals/morris-worm",

      "Patriot — U.S. Government Accountability Office, Patriot Missile Defense: Software Problem Led to System Failure at Dhahran, Saudi Arabia: https://www.gao.gov/products/imtec-92-26",

      "La polilla del Harvard Mark II — Smithsonian, Log Book With Computer Bug: https://americanhistory.si.edu/collections/object/nmah_334663",

      "Los créditos de herramientas no sustituyen las atribuciones y licencias de las fotografías, tipografías y audios externos utilizados.",
    ],
  },
};

let origenCarpeta;
let origenHoja;
for (const enlace of document.querySelectorAll('a[href="conocenos.html"]')) {
  enlace.setAttribute("aria-haspopup", "dialog");
  enlace.addEventListener("click", (evento) => {
    evento.preventDefault();
    origenCarpeta = enlace;
    carpeta.showModal();
  });
}
carpeta.querySelector(".cerrar-archivo").onclick = () => carpeta.close();
carpeta.addEventListener("close", () => origenCarpeta?.focus());
for (const boton of carpeta.querySelectorAll("[data-hoja]")) {
  boton.onclick = () => {
    const contenido = contenidos[boton.dataset.hoja];
    origenHoja = boton;
    document.getElementById("hoja-titulo").textContent = contenido.titulo;
    const cuerpo = document.getElementById("hoja-contenido");
    cuerpo.replaceChildren();
    contenido.parrafos.forEach((texto) => {
      const p = document.createElement("p");
      p.textContent = texto;
      cuerpo.append(p);
    });
    hoja.showModal();
    document.getElementById("hoja-titulo").focus();
  };
}
hoja.addEventListener("close", () => origenHoja?.focus());

if (FOTO_AUTORA) {
  const foto = new Image();
  foto.src = FOTO_AUTORA;
  foto.alt = "Cristina, creadora del museo";
  foto.onload = () =>
    carpeta.querySelector(".foto-autora").replaceChildren(foto);
}

let temporizadorSusto;
let contextoAudio;
let audioPropio;
function detenerSusto() {
  clearTimeout(temporizadorSusto);
  if (audioPropio) {
    audioPropio.pause();
    audioPropio.currentTime = 0;
  }
  if (contextoAudio) {
    contextoAudio.close().catch(() => {});
    contextoAudio = null;
  }
}
carpeta.querySelector(".foto-ente").onclick = () => {
  if (susto.open) return;
  susto.showModal();
  // El sonido solo se inicia como consecuencia del clic del visitante.
  if (AUDIO_SUSTO) {
    audioPropio = new Audio(AUDIO_SUSTO);
    audioPropio.volume = 0.45;
    audioPropio.play().catch(() => {});
  } else {
    const AudioAPI = window.AudioContext || window.webkitAudioContext;
    if (AudioAPI) {
      contextoAudio = new AudioAPI();
      const oscilador = contextoAudio.createOscillator();
      const volumen = contextoAudio.createGain();
      oscilador.type = "sawtooth";
      oscilador.frequency.setValueAtTime(180, contextoAudio.currentTime);
      oscilador.frequency.exponentialRampToValueAtTime(
        45,
        contextoAudio.currentTime + 0.65,
      );
      volumen.gain.setValueAtTime(0.0001, contextoAudio.currentTime);
      volumen.gain.exponentialRampToValueAtTime(
        0.12,
        contextoAudio.currentTime + 0.025,
      );
      volumen.gain.exponentialRampToValueAtTime(
        0.0001,
        contextoAudio.currentTime + 0.7,
      );
      oscilador.connect(volumen).connect(contextoAudio.destination);
      contextoAudio.resume().catch(() => {});
      oscilador.start();
      oscilador.stop(contextoAudio.currentTime + 0.75);
    }
  }
  temporizadorSusto = setTimeout(() => {
    if (susto.open) susto.close();
  }, 1300);
};
susto.addEventListener("close", () => {
  detenerSusto();
  carpeta.querySelector(".foto-ente").focus();
});
