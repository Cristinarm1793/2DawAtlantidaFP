// 02 · Contador con límite
/* <button id="menos">-</button>
<span id="total">0</span>
<button id="mas">+</button>
Programa ambos botones con addEventListener para aumentar o
disminuir el contador. Nunca puede ser negativo. El botón #menos
debe estar deshabilitado cuando el valor sea 0, también al iniciar, y
habilitado en los demás casos. */

const botonMenos = document.querySelector("#menos");
const botonMas = document.querySelector("#mas");
const totalContador = document.querySelector("#total");

let contador = 0;

function actualizarContador() {
  totalContador.textContent = contador;
  botonMenos.disabled = contador === 0;
}

botonMas.addEventListener("click", function () {
  contador++;
  actualizarContador();
});

botonMenos.addEventListener("click", function () {
  if (contador > 0) {
    contador--;
    actualizarContador();
  }
});

actualizarContador();
