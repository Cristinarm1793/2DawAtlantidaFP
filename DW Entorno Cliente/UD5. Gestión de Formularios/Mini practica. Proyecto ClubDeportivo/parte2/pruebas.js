"use strict";

function comprobar(nombre, obtenido, esperado) {

    if (obtenido === esperado) {
        console.log("CORRECTO: " + nombre);
    } else {
        console.error(
            "ERROR: " + nombre +
            " | Esperado: " + esperado +
            " | Obtenido: " + obtenido
        );
    }
}

console.log("----- NOMBRE -----");

comprobar("Nombre con espacios",
    validarNombre(" Ana López "), true);

comprobar("Nombre con varios espacios",
    validarNombre("Ana    López"), true);

comprobar("Nombre con números",
    validarNombre("Ana2 López"), false);

comprobar("Nombre vacío",
    validarNombre(""), false);

comprobar("Nombre de 3 caracteres",
    validarNombre("Ana"), false);

comprobar("Nombre de 4 caracteres",
    validarNombre("Juan"), true);

comprobar("Nombre de 50 caracteres",
    validarNombre("a".repeat(50)), true);

comprobar("Nombre de 51 caracteres",
    validarNombre("a".repeat(51)), false);

comprobar("Normalización del nombre",
    normalizarNombre(" Ana    López "), "Ana López");

console.log("----- USUARIO -----");

for (let i = 1; i <= 2; i++) {

    console.log("Repetición " + i);

    comprobar("Usuario correcto",
        validarUsuario("ana77"), true);

    comprobar("Usuario empieza por número",
        validarUsuario("7ana7"), false);

    comprobar("Usuario con guion bajo",
        validarUsuario("ana_7"), false);

    comprobar("Usuario vacío",
        validarUsuario(""), false);

    comprobar("Usuario de 4 caracteres",
        validarUsuario("ana7"), false);

    comprobar("Usuario de 5 caracteres",
        validarUsuario("ana77"), true);

    comprobar("Usuario de 20 caracteres",
        validarUsuario("a".repeat(20)), true);

    comprobar("Usuario de 21 caracteres",
        validarUsuario("a".repeat(21)), false);
}

console.log("----- CONTRASEÑA -----");

for (let i = 1; i <= 2; i++) {

    console.log("Repetición " + i);

    comprobar("Contraseña correcta",
        validarContrasena("Clave_12"), true);

    comprobar("Contraseña empieza por número",
        validarContrasena("1Clave_2"), false);

    comprobar("Contraseña con guion",
        validarContrasena("Clave-12"), false);

    comprobar("Contraseña con espacios",
        validarContrasena(" Clave_12 "), false);

    comprobar("Contraseña vacía",
        validarContrasena(""), false);

    comprobar("Contraseña de 7 caracteres",
        validarContrasena("a".repeat(7)), false);

    comprobar("Contraseña de 8 caracteres",
        validarContrasena("a".repeat(8)), true);

    comprobar("Contraseña de 16 caracteres",
        validarContrasena("a".repeat(16)), true);

    comprobar("Contraseña de 17 caracteres",
        validarContrasena("a".repeat(17)), false);
}

console.log("----- TELÉFONO -----");

comprobar("Teléfono correcto",
    validarTelefono("+34 612 345 678"), true);

comprobar("Teléfono con espacios exteriores",
    validarTelefono(" +34 612 345 678 "), true);

comprobar("Teléfono sin símbolo +",
    validarTelefono("34 612 345 678"), false);

comprobar("Teléfono sin espacios",
    validarTelefono("+34612345678"), false);

comprobar("Teléfono empieza por 5",
    validarTelefono("+34 512 345 678"), false);

comprobar("Teléfono con una cifra de más",
    validarTelefono("+34 612 345 6789"), false);

comprobar("Teléfono vacío",
    validarTelefono(""), false);

console.log("----- SERVICIOS -----");

comprobar("Código correcto",
    validarCodigoServicio("DEP-007"), true);

comprobar("Código en minúsculas",
    validarCodigoServicio("dep-007"), false);

comprobar("Código con dos cifras",
    validarCodigoServicio("DEP-07"), false);

comprobar("Código con texto adicional",
    validarCodigoServicio("XDEP-007"), false);

comprobar("Código vacío",
    validarCodigoServicio(""), false);

console.log("----- CITAS -----");

comprobar("Referencia CITA correcta",
    validarReferenciaCita("CITA-0001"), true);

comprobar("Referencia RES correcta",
    validarReferenciaCita("RES-0001"), true);

comprobar("Referencia con texto adicional",
    validarReferenciaCita("XCITA-0001"), false);

comprobar("Referencia con tres cifras",
    validarReferenciaCita("RES-001"), false);

comprobar("Referencia vacía",
    validarReferenciaCita(""), false);