// 08 · Calcular según dos controles
/* <select id="envio">
 <option value="recogida">Recogida</option>
 <option value="domicilio">Domicilio</option>
</select>
<input id="socio" type="checkbox"> Soy socio
<p id="precio"></p>
Precio base: 30 €. Si es socio, descuenta un 10 % solo al precio base.
Después suma 4 € si el envío es a domicilio. Muestra el total con dos
decimales. Actualiza al cargar y cuando cambie cualquiera de los dos
controles, reutilizando una misma función.
 */

const tipoEnvio = document.querySelector("#envio");
const socioEnvio = document.querySelector("#socio8");
const precioMostrado = document.querySelector("#precio");

function actualizarPrecio() {
  const precioBase = 30;
  let precioFinal = precioBase;

  if (socioEnvio.checked) {
    precioFinal = precioBase - precioBase * 0.1;
  }

  if (tipoEnvio.value === "domicilio") {
    precioFinal = precioFinal + 4;
  }

  precioMostrado.textContent = precioFinal.toFixed(2) + " €";
}

tipoEnvio.addEventListener("change", actualizarPrecio);
socioEnvio.addEventListener("change", actualizarPrecio);

actualizarPrecio();
