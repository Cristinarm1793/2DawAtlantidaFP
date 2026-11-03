'use strict';

(async function () {
    const formulario = document.getElementById('formulario-contacto');

    try {
        await consultarSesion();
    } catch (error) {
        mostrarAviso('respuesta-contacto', error.message, false);
        return;
    }

    formulario.addEventListener('submit', async function (evento) {
        evento.preventDefault();

        const boton = formulario.querySelector('[type="submit"]');
        boton.disabled = true;

        try {
            const resultado = await enviarFormulario(
                formulario,
                'php/enviar-contacto.php'
            );

            mostrarAviso('respuesta-contacto', resultado.mensaje, true);
            formulario.reset();

        } catch (error) {
            mostrarAviso('respuesta-contacto', error.message, false);

        } finally {
            boton.disabled = false;
        }
    });
})();