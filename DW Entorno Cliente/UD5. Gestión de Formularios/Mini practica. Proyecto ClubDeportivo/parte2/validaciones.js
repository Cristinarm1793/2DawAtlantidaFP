"use strict";

function normalizarNombre(nombre) {
    return nombre.trim().replace(/ +/g, " ");
}

function validarNombre(nombre) {

    nombre = normalizarNombre(nombre);

    const patron = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+( [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/;

    return nombre.length >= 4 &&
           nombre.length <= 50 &&
           patron.test(nombre);
}

function validarUsuario(usuario) {

    const patron = /^[a-zA-Z][a-zA-Z0-9]{4,19}$/;

    return patron.test(usuario);
}

function validarContrasena(contrasena) {

    const patron = /^[a-zA-Z][a-zA-Z0-9_]{7,15}$/;

    return patron.test(contrasena);
}

function validarTelefono(telefono) {

    const patron = /^\+34 [6-9][0-9]{2} [0-9]{3} [0-9]{3}$/;

    return patron.test(telefono.trim());
}

function validarCodigoServicio(codigo) {

    const patron = /^DEP-[0-9]{3}$/;

    return patron.test(codigo);
}

function validarReferenciaCita(referencia) {

    const patron = /^(CITA|RES)-[0-9]{4}$/;

    return patron.test(referencia);
}