
'use strict';

const formularios = document.querySelectorAll("form");
const intentados = new Set();

function mostrarError(campo, mensaje) {
    const error = document.getElementById("error" +
        campo.id.charAt(0).toUpperCase() + campo.id.slice(1));

    campo.setCustomValidity(mensaje);

    if (error) {
        error.textContent = mensaje;
    }

    campo.setAttribute("aria-invalid", mensaje !== "" ? "true" : "false");
}

function validarCampo(campo) {

    campo.setCustomValidity("");

    let mensaje = "";
    const valor = campo.value.trim();

    if (campo.type === "text" || campo.tagName === "TEXTAREA") {

        if (campo.required && valor === "") {
            mensaje = "Este campo es obligatorio.";
        } else if (valor !== "" && campo.minLength > 0 &&
            valor.length < campo.minLength) {
            mensaje = "Debe tener al menos " + campo.minLength + " caracteres.";
        } else if (campo.maxLength > 0 &&
            valor.length > campo.maxLength) {
            mensaje = "No puede superar " + campo.maxLength + " caracteres.";
        }
    }

    if (campo.type === "email") {
        if (valor === "") {
            mensaje = "Introduce un correo electrónico.";
        } else if (campo.validity.typeMismatch) {
            mensaje = "El formato del correo no es correcto.";
        }
    }

    if (campo.type === "tel" && valor === "") {
        mensaje = "Introduce un teléfono.";
    }

    if (campo.id === "contrasena") {
        if (campo.value === "") {
            mensaje = "Introduce una contraseña.";
        } else if (campo.value.length < 8 || campo.value.length > 16) {
            mensaje = "La contraseña debe tener entre 8 y 16 caracteres.";
        }
    }

    if (campo.id === "confirmarContrasena") {
        const contrasena = document.getElementById("contrasena").value;

        if (campo.value === "") {
            mensaje = "Confirma la contraseña.";
        } else if (campo.value !== contrasena) {
            mensaje = "Las contraseñas no coinciden.";
        }
    }

    if (campo.type === "number") {

        const numero = campo.valueAsNumber;

        if (campo.value === "") {
            mensaje = "Introduce un número.";
        } else if (!Number.isFinite(numero)) {
            mensaje = "Introduce un número válido.";
        } else if (campo.validity.rangeUnderflow ||
            campo.validity.rangeOverflow) {
            mensaje = "El número está fuera del rango permitido.";
        } else if (campo.validity.stepMismatch) {
            mensaje = "El número no cumple el incremento permitido.";
        }

        if (mensaje === "" && campo.id === "edad" &&
            !Number.isInteger(numero)) {
            mensaje = "La edad debe ser un número entero.";
        }

        if (mensaje === "" && campo.id === "duracion" &&
            (!Number.isInteger(numero) || numero % 15 !== 0)) {
            mensaje = "La duración debe ser múltiplo de 15 minutos.";
        }
    }

    if (campo.tagName === "SELECT" && campo.value === "") {
        mensaje = "Selecciona una opción.";
    }

    if (campo.type === "file") {

        const archivo = campo.files[0];

        if (!archivo) {
            mensaje = "Selecciona una imagen.";
        } else if (archivo.type !== "image/jpeg") {
            mensaje = "La imagen debe ser JPEG.";
        } else if (archivo.size > 5000000) {
            mensaje = "La imagen no puede superar 5.000.000 bytes.";
        }
    }

    if (campo.type === "checkbox" && campo.required && !campo.checked) {
        mensaje = "Debes marcar esta casilla.";
    }

    if (campo.id === "fechaNoticia") {

        const hoy = new Date();

        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");

        const fechaHoy = anio + "-" + mes + "-" + dia;

        if (campo.value === "") {
            mensaje = "Selecciona una fecha.";
        } else if (campo.value <= fechaHoy) {
            mensaje = "La fecha debe ser posterior a hoy.";
        }
    }

    if (campo.id === "fechaCita") {

        if (campo.value === "") {
            mensaje = "Selecciona una fecha y hora.";
        } else {
            const fechaElegida = new Date(campo.value);
            const ahora = new Date();

            if (!Number.isFinite(fechaElegida.getTime()) ||
                fechaElegida <= ahora) {
                mensaje = "La cita debe ser posterior al momento actual.";
            }
        }
    }

    mostrarError(campo, mensaje);

    return mensaje === "";
}

function validarModalidad() {

    const modalidades = document.querySelectorAll(
        'input[name="modalidad"]'
    );

    const seleccionada = document.querySelector(
        'input[name="modalidad"]:checked'
    );

    const error = document.getElementById("errorModalidad");

    if (!seleccionada) {
        error.textContent = "Selecciona una modalidad.";

        modalidades.forEach(radio => {
            radio.setAttribute("aria-invalid", "true");
            radio.setCustomValidity("Selecciona una modalidad.");
        });

        return false;
    }

    error.textContent = "";

    modalidades.forEach(radio => {
        radio.setAttribute("aria-invalid", "false");
        radio.setCustomValidity("");
    });

    return true;
}

function validarFormulario(formulario) {

    let correcto = true;
    let primerError = null;

    const campos = formulario.querySelectorAll(
        "input, select, textarea"
    );

    campos.forEach(campo => {

        if (campo.type === "radio") {
            if (campo.id === "mensual") {
                if (!validarModalidad()) {
                    correcto = false;
                    if (primerError === null) {
                        primerError = campo;
                    }
                }
            }

            return;
        }

        if (campo.id === "publicar") {
            return;
        }

        const valido = validarCampo(campo);

        if (!valido) {
            correcto = false;

            if (primerError === null) {
                primerError = campo;
            }
        }
    });

    if (!correcto && primerError !== null) {
        primerError.focus();
    }

    return correcto;
}

function mostrarResultado(formulario) {

    let mensaje = "";

    if (formulario.id === "formSocios") {

        const datos = new FormData(formulario);

        const nombre = datos.get("nombreSocio").trim();
        const usuario = datos.get("usuario").trim();
        const modalidad = datos.get("modalidad");

        datos.set("nombreSocio", nombre);
        datos.set("usuario", usuario);

        mensaje = "Registro simulado: " + nombre +
            " (" + usuario + "), modalidad " + modalidad + ".";
    }

    if (formulario.id === "formServicios") {
        mensaje = "El servicio se ha añadido correctamente (simulación).";
    }

    if (formulario.id === "formTestimonios") {

        const publicar = document.getElementById("publicar").checked;

        if (publicar) {
            mensaje = "Testimonio recibido. Publicación autorizada (simulación).";
        } else {
            mensaje = "Testimonio recibido. Permanecerá privado (simulación).";
        }
    }

    if (formulario.id === "formNoticias") {
        mensaje = "Noticia preparada correctamente (simulación).";
    }

    if (formulario.id === "formCitas") {

        const socio = document.getElementById("socioCita");
        const servicio = document.getElementById("servicioCita");
        const fecha = document.getElementById("fechaCita").value;

        mensaje = "Reserva simulada: " +
            socio.options[socio.selectedIndex].text +
            " - " +
            servicio.options[servicio.selectedIndex].text +
            " - " + fecha;
    }

    const resultado = formulario.querySelector(".resultado");
    resultado.textContent = mensaje;
}

formularios.forEach(formulario => {

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        intentados.add(formulario.id);

        const correcto = validarFormulario(formulario);

        if (correcto) {
            mostrarResultado(formulario);
        } else {
            formulario.querySelector(".resultado").textContent = "";
        }
    });

    const campos = formulario.querySelectorAll(
        "input, select, textarea"
    );

    campos.forEach(campo => {

        function revisarCambio() {

            formulario.querySelector(".resultado").textContent = "";

            if (!intentados.has(formulario.id)) {
                return;
            }

            if (campo.type === "radio") {
                validarModalidad();
            } else if (campo.id !== "publicar") {
                validarCampo(campo);
            }

            if (campo.id === "contrasena") {
                validarCampo(
                    document.getElementById("confirmarContrasena")
                );
            }
        }

        campo.addEventListener("input", revisarCambio);
        campo.addEventListener("change", revisarCambio);
    });
});

const testimonio = document.getElementById("testimonio");
const contador = document.getElementById("contadorTestimonio");

testimonio.addEventListener("input", function () {
    contador.textContent = testimonio.value.length + " / 500 caracteres";
});

const menuPrincipal = document.getElementById("menuPrincipal");
const volverMenu = document.getElementById("volverMenu");

const botonesMenu = document.querySelectorAll(".menu button");
const secciones = document.querySelectorAll("main section");

botonesMenu.forEach(boton => {

    boton.addEventListener("click", function () {

        const nombreSeccion = boton.dataset.seccion;
        const seccion = document.getElementById(nombreSeccion);

        menuPrincipal.hidden = true;

        secciones.forEach(elemento => {
            elemento.hidden = true;
        });

        seccion.hidden = false;
        volverMenu.hidden = false;

        volverMenu.focus();
    });
});

volverMenu.addEventListener("click", function () {

    secciones.forEach(seccion => {
        seccion.hidden = true;
    });

    menuPrincipal.hidden = false;
    volverMenu.hidden = true;

    botonesMenu[0].focus();
});
