// 03 · Filtrar con un evento input
/* <input id="busqueda" type="text">
<ul id="lista"><li>Jazz</li><li>Rock</li><li>Jazz latino</li></ul>
En cada evento input, muestra solo los li cuyo texto contenga la
búsqueda, ignorando mayúsculas y espacios al principio o al final de la
búsqueda. Usa la propiedad hidden. Con una búsqueda vacía deben
mostrarse todos. */

const campoBusqueda = document.querySelector("#busqueda");
const generos = document.querySelectorAll("#lista li");

campoBusqueda.addEventListener("input", function () {
  const busqueda = campoBusqueda.value.trim().toLowerCase();

  for (const genero of generos) {
    const textoGenero = genero.textContent.toLowerCase();
    genero.hidden = !textoGenero.includes(busqueda);
  }
});
