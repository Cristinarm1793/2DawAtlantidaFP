// 05 · Delegación con contenido anidado
/* <ul id="lista">
 <li>Jazz <button class="borrar"><span>×</span></button></li>
 <li>Rock <button class="borrar"><span>×</span></button></li>
</ul>
<p id="total"></p>
Usa un único listener en #lista para borrar el li al pulsar el botón o su
span. Ignora otros clics. Actualiza #total con el número de li restantes,
tanto al iniciar como después de borrar. Usa closest(). */

const listaBorrable = document.querySelector("#lista5");
const totalListaBorrable = document.querySelector("#total5");

function actualizarTotalLista() {
  const elementosRestantes = listaBorrable.querySelectorAll("li").length;
  totalListaBorrable.textContent = elementosRestantes;
}

listaBorrable.addEventListener("click", function (event) {
  const botonBorrar = event.target.closest("button.borrar");

  if (botonBorrar !== null) {
    const elementoBorrable = botonBorrar.closest("li");
    elementoBorrable.remove();
    actualizarTotalLista();
  }
});

actualizarTotalLista();
