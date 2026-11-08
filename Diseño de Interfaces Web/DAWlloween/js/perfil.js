'use strict';

(async function () {
    const panelAcceso = document.getElementById('panel-acceso');
    const panelUsuario = document.getElementById('panel-usuario');

    const menu = document.querySelector('.menu-visitante');
    const mano = document.getElementById('mano-menu');
    const opciones = [...menu.querySelectorAll('button')];
    const login = document.getElementById('form-login');
    const registro = document.getElementById('form-registro');
    let seleccion = opciones[0];

    function apuntar(boton) {
        seleccion = boton;
        mano.style.top = `${boton.offsetTop + boton.offsetHeight / 2}px`;
    }

    function volverAlMenu() {
        login.hidden = true;
        registro.hidden = true;
        menu.hidden = false;
        opciones.forEach(boton => boton.setAttribute('aria-expanded', 'false'));
        apuntar(seleccion);
    }

    opciones.forEach((boton, posicion) => {
        boton.addEventListener('pointerenter', () => apuntar(boton));
        boton.addEventListener('focus', () => apuntar(boton));
        boton.addEventListener('click', () => {
            const formulario = posicion === 0 ? login : registro;
            login.hidden = formulario !== login;
            registro.hidden = formulario !== registro;
            boton.setAttribute('aria-expanded', 'true');
            menu.hidden = true;
            formulario.querySelector('input').focus();
        });
        boton.addEventListener('keydown', evento => {
            if (!['ArrowUp', 'ArrowDown'].includes(evento.key)) return;
            evento.preventDefault();
            opciones[1 - posicion].focus();
        });
    });
    document.querySelectorAll('.volver-menu').forEach(boton => {
        boton.addEventListener('click', () => {
            volverAlMenu();
            seleccion.focus();
        });
    });
    const recuperacion = document.getElementById('dialogo-recuperacion');
    document.getElementById('abrir-recuperacion').addEventListener('click', () => {
        recuperacion.showModal();
    });
    new ResizeObserver(() => {
        if (!menu.hidden) apuntar(seleccion);
    }).observe(menu);

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
        panelAcceso.hidden = false;
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
                if (!csrf) await consultarSesion();
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
            volverAlMenu();
            await actualizar();

        } catch (error) {
            mostrarAviso('aviso-perfil', error.message, false);
        }
    });
})();