'use strict';

(async function () {
    const panelAcceso = document.getElementById('panel-acceso');
    const panelUsuario = document.getElementById('panel-usuario');

    async function actualizar() {
        const usuario = await consultarSesion();

        panelAcceso.hidden = !!usuario;
        panelUsuario.hidden = !usuario;

        if (usuario) {
            document.getElementById('nombre-usuario').textContent = usuario.nombre;
            document.getElementById('correo-usuario').textContent = usuario.email;
            document.getElementById('fecha-usuario').textContent = usuario.creado_en;
        }
    }

    try {
        await actualizar();
    } catch (error) {
        mostrarAviso('aviso-perfil', error.message, false);
        return;
    }

    for (const [id, url] of [
        ['form-login', 'php/login.php'],
        ['form-registro', 'php/registro.php'],
        ['form-password', 'php/cambiar-password.php']
    ]) {
        const formulario = document.getElementById(id);

        formulario.addEventListener('submit', async function (evento) {
            evento.preventDefault();

            const boton = formulario.querySelector('[type="submit"]');
            boton.disabled = true;

            try {
                const resultado = await enviarFormulario(formulario, url);

                formulario.reset();
                mostrarAviso('aviso-perfil', resultado.mensaje, true);

                await actualizar();

            } catch (error) {
                mostrarAviso('aviso-perfil', error.message, false);

            } finally {
                boton.disabled = false;
            }
        });
    }

    document.getElementById('cerrar-sesion').addEventListener('click', async function () {
        const datos = new FormData();

        datos.set('accion', 'salir');
        datos.set('csrf', csrf);

        try {
            const respuesta = await fetch('php/sesiones.php', {
                method: 'POST',
                body: datos,
                credentials: 'same-origin'
            });

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(resultado.error);
            }

            mostrarAviso('aviso-perfil', resultado.mensaje, true);
            await actualizar();

        } catch (error) {
            mostrarAviso('aviso-perfil', error.message, false);
        }
    });
})();