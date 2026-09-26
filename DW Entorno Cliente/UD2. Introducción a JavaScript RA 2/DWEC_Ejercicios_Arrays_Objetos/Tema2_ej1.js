// 01 / Buscar un texto
/* Repaso de arrays y cadenas
Crea un array con «rojo», «azul», «verde» y «amarillo». Define una variable con el color
que quieras buscar.
1. Elimina espacios de los extremos y convierte la búsqueda a minúsculas.
2. Indica por consola si el color está en el array.
3. Prueba un color existente y otro que no esté.

Comprueba tu resultado
« AZUL » → encontrado. «violeta» → no encontrado. */

const colores = ["rojo", "azul", "verde", "amarillo"];
const color = prompt("Introduce un color");

if (color === null) {
    console.log("Consulta cancelada");
} else {
    const colorIntroducido = color.trim().toLocaleLowerCase();

    if (colores.includes(colorIntroducido)) {
        console.log(`${colorIntroducido} encontrado`);
    } else if (colorIntroducido === "") {
        console.log(`Vacio`);
    } else {
        console.log(`No esta en la lista`);
    }
}