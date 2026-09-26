// 01 / Precio final de un producto
/* Una tienda vende un producto por 100 €, antes de impuestos. Para esta simulación se
aplica un 21 % de impuesto.
1. Guarda el precio base y el porcentaje en variables.
2. Calcula el importe del impuesto y el precio final.
3. Muestra los tres importes por consola con dos decimales.

Comprueba tu resultado
Base: 100,00 € · Impuesto: 21,00 € · Total: 121,00 €.
Con una base de 50 €: impuesto 10,50 € y total 60,50 € */

const precioBase = 100;
const impuesto = 21;

const importe = precioBase * (impuesto / 100);
const total = precioBase + importe;


console.log(`Base: ${precioBase.toFixed(2)}`);
console.log(`Impuesto: ${importe.toFixed(2)}`);
console.log(`Total: ${total.toFixed(2)}`);