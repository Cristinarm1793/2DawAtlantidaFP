/* 04. Contar aprobados y suspensos · 1 punto
Recorre el array y muestra cuántas notas son aprobados y cuántas son suspensos. Se aprueba con
una nota mayor o igual que 5. Todas las notas están entre 0 y 10.
const notas = [4, 7, 5, 3, 9, 6]; */

const notas = [4, 7, 5, 3, 9, 6];
let notasAprobadas = 0;
let notasSuspensas = 0;

notas.forEach(nota => {
    if (nota >= 5) {
        notasAprobadas++;
    } else {
        notasSuspensas++;
    }
});

console.log("Notas aprobadas: " + notasAprobadas);
console.log("Notas suspensas: " + notasAprobadas);
