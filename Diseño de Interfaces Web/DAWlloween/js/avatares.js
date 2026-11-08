'use strict';
const avataresMuseo = ['esqueleto-hombre','momia-hombre','zombi-hombre','vampiro-hombre','hombre-lobo','esqueleto-mujer','momia-mujer','zombi-mujer','vampiro-mujer','mujer-lobo'];
function pintarAvatar(elemento, valor) {
 let i = avataresMuseo.indexOf(valor); if (i < 0) i = 1;
 elemento.classList.add('avatar-halloween');
 elemento.style.backgroundPosition = `${(i % 5) * 25}% ${i < 5 ? 0 : 100}%`;
 elemento.setAttribute('aria-hidden','true');
}
function opcionesAvatar(contenedor, elegido) {
 contenedor.replaceChildren();
 avataresMuseo.forEach((valor) => {
  const label = document.createElement('label');
  const radio = document.createElement('input');
  radio.type = 'radio'; radio.name = 'avatar'; radio.value = valor; radio.required = true; radio.checked = valor === elegido;
  const foto = document.createElement('span'); pintarAvatar(foto,valor);
  const texto = document.createElement('span'); texto.textContent = valor.replaceAll('-',' ');
  label.append(radio,foto,texto); contenedor.append(label);
 });
}
