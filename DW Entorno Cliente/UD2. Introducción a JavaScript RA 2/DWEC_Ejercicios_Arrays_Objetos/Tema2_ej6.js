// 06 / Edad de un perro: modelo simplificado
/* Repaso de prompt, validación, bucles y funciones
Solo para este ejercicio, usa la regla ficticia edad humana = edad del perro × 7; no es
un modelo biológico real.
1. Pide la edad con prompt. Acepta números finitos mayores que 0 y menores que 30,
incluidos decimales con punto.
2. Rechaza texto vacío, espacios, valores no numéricos y números fuera del intervalo.
Muestra un error y vuelve a preguntar.
3. Si cancela, termina sin calcular.
4. Con un dato válido, llama a una función que reciba la edad y devuelva su equivalente.
Muestra el resultado con alert.

Comprueba tu resultado
2 → 14 años. 1.5 → 10.5 años.
0, 30, «hola» y vacío → error y nueva pregunta.
Cancelar → fin del ejercicio. */

function calcularEdadHumana(edadPerro) {
    return edadPerro * 7;
}

while (true) {
    const insertar = prompt("Introduce la edad del perro: ");

    if (insertar === null) {
        break;
    }

    if (insertar.trim() === ""){
        alert("Error, introduce edad valida");
        continue;
    }

    const edad = Number(insertar);

    if (!Number.isFinite(edad) || edad <= 0 || edad >= 30) {
        alert("Error, introduce edad valida");
        continue;
    }

    const edadHumana = calcularEdadHumana(edad);
    alert(`Serian ${edadHumana} años humanos`);
    break;
}