/* 05. Encontrar el mayor · 1 punto
Recorre el array y muestra su mayor número. No puedes usar Math.max() ni ordenar el array. El
array no estará vacío y puede contener únicamente números negativos. */

const numeros = [-8, -3, -12, -1, -6];
let nMayor = numeros[0];

numeros.forEach(numero => {
    if (numero > nMayor) {
        nMayor = numero;
    }
});

console.log("El número mayor es: " + nMayor);