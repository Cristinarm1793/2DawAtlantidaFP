// 03 / Ficha de un empleado
/* Usa estos datos: Ana López, profesión administrativa, 3 años de antigüedad y 1.200 €
de sueldo base mensual.
1. Muestra sus datos mediante una cadena de plantilla.
2. Calcula un plus mensual del 10 % del sueldo base por cada año. El porcentaje no se
acumula de forma compuesta.
3. Muestra sueldo base, plus y total mensual con dos decimales. No hay retenciones ni
otras deducciones.

Comprueba tu resultado
Plus: 360,00 € · Total: 1.560,00 €.
Con 0 años, el plus es 0,00 € y el total coincide con el sueldo base */

const nombre = "Ana López";
const profesion = "profesión administrativa";
const antiguedad = 3;
const sueldoBasMensual = 1.200;

const plusMensual = 10;
const plus = (sueldoBasMensual * plusMensual / 100) * antiguedad;
const totalMensual = sueldoBasMensual + plus;

console.log (`Nombre: ${nombre}, Profesion = ${profesion}, Antigüedad: ${antiguedad} años, Sueldo base mensual: ${sueldoBasMensual.toFixed(3)} €, Plus: ${plus.toFixed(2)}, Total mensual: ${totalMensual.toFixed(2)} `);