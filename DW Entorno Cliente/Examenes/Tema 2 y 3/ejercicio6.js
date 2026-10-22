/* 06. Desestructurar y completar datos · 1 punto
Extrae nombre y descuento mediante desestructuración. Crea descuentoAplicado usando ?? para
asignar 10 únicamente si descuento es null o undefined. Muestra el nombre y el descuento
aplicado. Si descuento vale 0, debes conservarlo. */

const cliente = { nombre: "Ana", descuento: 0 };

const { nombre, descuento } = cliente;

const descuentoAplicado = descuento ?? 10;

console.log("Nombre: " + nombre);
console.log("Descuento aplicado: " + descuentoAplicado);