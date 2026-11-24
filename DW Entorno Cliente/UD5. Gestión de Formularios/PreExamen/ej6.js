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