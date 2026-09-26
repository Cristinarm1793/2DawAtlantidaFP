// 02 / Analizar una lista de números
/*Arrays, acumuladores y recorridos
Trabaja con [-4, -2, -8, -1, -3, -6].
1. Calcula el producto de todos los elementos.
2. Encuentra el mayor.
3. Calcula la media.
Usa bucles para practicar recorridos. El array siempre tendrá al menos un número. No
inicialices el máximo suponiendo que habrá valores positivos.

Comprueba tu resultado
Producto: 1152 · Mayor: -1 · Media: -4.
Con [2, 4, 6, 8, 10, 12]: producto 46080, mayor 12 y media 7. */

const numeros = [-4, -2, -8, -1, -3, -6];
let producto = 1;
let suma = 0;
let mayor = numeros[0];

for (const numero of numeros) {
    producto = producto * numero;
    suma = suma + numero;

    if (numero > mayor) {
        mayor = numero;
    }
}

const media = suma / numeros.length;

console.log (`Productos: ${producto}, Mayor: ${mayor}, Media: ${media}`);