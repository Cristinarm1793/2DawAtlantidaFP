//02 / Reparto entre empleados
/* Han sobrado 23 jamones y se repartirán entre 10 empleados, dando la misma cantidad a
cada uno. Los jamones no pueden partirse.
1. Calcula cuántos recibe cada persona.
2. Calcula cuántos quedan sin repartir.
3. Muestra ambos resultados por consola.

Comprueba tu resultado
Cada empleado recibe 2 jamones y sobran 3.
Prueba también con 20 jamones: deben sobrar 0 */ 

const jamones = 23;
const empleados = 10;

const jamonXempleado = Math.floor(jamones / empleados);
const sinRepartir = jamones % empleados;

console.log(`Cada empleado recibe ${jamonXempleado} jamones`);
console.log(`Sobran ${sinRepartir} jamones`);