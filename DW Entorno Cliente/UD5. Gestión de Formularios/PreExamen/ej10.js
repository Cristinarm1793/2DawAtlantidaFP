// 10 · Validación personalizada con la API de navegador
/* <form id="alta" novalidate>
 <input id="alias" required pattern="[A-Za-z][A-Za-z0-9_]{3,11}">
 <button type="submit">Crear cuenta</button>
</form>
<p id="resultado"></p>
En submit, evita la recarga. Primero limpia cualquier error
personalizado anterior con setCustomValidity(""). Tras trim(), asigna el
valor limpio al campo. Si es «admin», ignorando mayúsculas,
establece un error personalizado. Usa checkValidity(): si falla, muestra
validationMessage y enfoca el campo; si cumple, muestra «Alias
válido». Debe permitir corregir un error y volver a validar. */

const formularioAlta = document.querySelector("#alta");
const campoAlias = document.querySelector("#alias");
const resultadoAlta = document.querySelector("#resultado");

formularioAlta.addEventListener("submit", function (event) {
  event.preventDefault();

  campoAlias.setCustomValidity("");
  campoAlias.value = campoAlias.value.trim();

  if (campoAlias.value.toLowerCase() === "admin") {
    campoAlias.setCustomValidity("El alias admin está reservado.");
  }

  if (campoAlias.checkValidity()) {
    resultadoAlta.textContent = "Alias válido";
  } else {
    resultadoAlta.textContent = campoAlias.validationMessage;
    campoAlias.focus();
  }
});
