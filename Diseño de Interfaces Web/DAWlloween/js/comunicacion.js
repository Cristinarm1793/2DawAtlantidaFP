'use strict';

// Funciones compartidas por las páginas de contacto y perfil.
let csrf = '';

async function consultarSesion() {
    const respuesta = await fetch('php/sesiones.php', {
        credentials: 'same-origin'
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.error || 'Error de sesión');
    }

    csrf = datos.csrf;
    return datos.usuario;
}

async function enviarFormulario(formulario, destino) {
    const datos = new FormData(formulario);
    datos.set('csrf', csrf);

    const respuesta = await fetch(destino, { method: 'POST', body: datos, credentials: 'same-origin' });

    const resultado = await respuesta.json();

    if (!respuesta.ok || !resultado.ok) {
        throw new Error(
            resultado.error || 'No se pudo completar la operación.'
        );
    }

    return resultado;
}

function mostrarAviso(id, mensaje, correcto) {
    const elemento = document.getElementById(id);

    elemento.textContent = mensaje;
    elemento.className = correcto ? 'mensaje-exito' : 'mensaje-error';

    elemento.setAttribute(
        'role',
        correcto ? 'status' : 'alert'
    );
}