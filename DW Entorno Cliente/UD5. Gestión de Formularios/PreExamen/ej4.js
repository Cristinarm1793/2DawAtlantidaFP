// 04 · Crear un listado filtrado
/* <ul id="discos"></ul>
// Datos JavaScript:
const discos = [
 {titulo: "Blue Train", precio: 18},
 {titulo: "Kind of Blue", precio: 24},
 {titulo: "Abbey Road", precio: 20}
];
Crea un li solo para los discos cuyo precio sea menor o igual a 20.
Cada texto seguirá el formato «Blue Train - 18.00 €». Conserva el
orden del array. Usa createElement y textContent, sin innerHTML. */

const discos = [
  { titulo: "Blue Train", precio: 18 },
  { titulo: "Kind of Blue", precio: 24 },
  { titulo: "Abbey Road", precio: 20 },
];

const listaDiscos = document.querySelector("#discos");

for (const disco of discos) {
  if (disco.precio <= 20) {
    const elementoDisco = document.createElement("li");
    const precioFormateado = disco.precio.toFixed(2);

    elementoDisco.textContent = disco.titulo + " - " + precioFormateado + " €";
    listaDiscos.appendChild(elementoDisco);
  }
}
