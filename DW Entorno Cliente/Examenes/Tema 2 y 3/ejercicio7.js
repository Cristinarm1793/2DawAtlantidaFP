/* 07. Transformar precios · 0,75 puntos
Crea un nuevo array llamado preciosConIVA usando map() y una función flecha. Incrementa cada
precio un 21 % y muestra el nuevo array. No modifiques el array original. No es necesario
redondear.
const precios = [10, 20, 100]; */

const precios = [10, 20, 100];

const preciosConIVA = precios.map(precio => precio * 1.21);

console.log(preciosConIVA);