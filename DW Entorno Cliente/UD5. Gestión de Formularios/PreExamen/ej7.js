// 07 · Número y condición adicional
/* <input id="cantidad" type="number">
<input id="socio" type="checkbox"> Soy socio
<button id="comprobar">Comprobar</button>
<p id="error"></p>
Al pulsar, valida que cantidad sea un entero desde 1 hasta 6 si es
socio, o desde 1 hasta 3 si no lo es. Usa valueAsNumber y checked.
Vacío, decimales y valores fuera del rango deben fallar. Muestra
«Cantidad no válida» o borra el error. */

const campoCantidad = document.querySelector("#cantidad");
const socioCantidad = document.querySelector("#socio");
const botonComprobar = document.querySelector("#comprobar");
const errorCantidad = document.querySelector("#error");

botonComprobar.addEventListener("click", function () {
  const cantidad = campoCantidad.valueAsNumber;
  let maximo = 3;

  if (socioCantidad.checked) {
    maximo = 6;
  }

  if (Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= maximo) {
    errorCantidad.textContent = "";
  } else {
    errorCantidad.textContent = "Cantidad no válida";
  }
});
