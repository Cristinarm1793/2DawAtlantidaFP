//04 / ¿Está en la lista de empleados?
/* Arrays, prompt, cadenas y condicionales
Crea un array con estos siete nombres en minúsculas: ana, luis, marta, pedro, lucia,
carlos y elena.
1. Pide un nombre con prompt y elimina espacios de los extremos.
2. Compara sin distinguir mayúsculas y minúsculas. Las tildes sí se distinguen en este
ejercicio.
3. Si existe, muestra un saludo por consola; si no, indica que no está en la lista.
4. Si cancela, termina con «Consulta cancelada». Si introduce vacío o solo espacios,
muestra «Nombre vacío» y termina.

Comprueba tu resultado
« ANA » → «Hola, ana». «Mario» → «No está en la lista».
Es una consulta de pertenencia, no un sistema real de autenticación. */

const empleados = ["ana", "luis", "marta", "pedro", "lucia", "carlos", "elena"];
const nombreIntroducido = prompt("Introduce su nombre");

if (nombreIntroducido === null) {
    console.log("Consulta cancelada");
} else {
    const nombre = nombreIntroducido.trim().toLocaleLowerCase();
    if (empleados.includes(nombre)){
        console.log(`Hola, ${nombre}`);
    } else if (nombre === "") {
        console.log("Nombre vacio");
    } else {
        console.log("No esta en la lista");
    }
}
