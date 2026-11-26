// 06 · Validar dos campos sin omitir errores
/* <form id="reserva" novalidate>
 <input id="nombre"><span id="errNombre"></span>
 <input id="ciudad"><span id="errCiudad"></span>
 <button type="submit">Reservar</button>
</form>
<p id="aviso"></p>
En submit, evita la recarga. Tras trim(), nombre debe tener al menos 3
caracteres y ciudad no puede estar vacía. Muestra un error específico
junto a cada campo incorrecto y limpia los errores corregidos.
Comprueba siempre ambos campos. #aviso mostrará «Reserva
válida» solo si todo cumple; en otro caso quedará vacío.
 */

const formularioReserva = document.querySelector("#reserva");
const campoNombre = document.querySelector("#nombre");
const campoCiudad = document.querySelector("#ciudad");
const errorNombre = document.querySelector("#errNombre");
const errorCiudad = document.querySelector("#errCiudad");
const avisoReserva = document.querySelector("#aviso");

formularioReserva.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombreValido = campoNombre.value.trim().length >= 3;
  const ciudadValida = campoCiudad.value.trim() !== "";

  if (nombreValido) {
    errorNombre.textContent = "";
  } else {
    errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
  }

  if (ciudadValida) {
    errorCiudad.textContent = "";
  } else {
    errorCiudad.textContent = "Introduce una ciudad.";
  }

  if (nombreValido && ciudadValida) {
    avisoReserva.textContent = "Reserva válida";
  } else {
    avisoReserva.textContent = "";
  }
});
