"use strict";
(() => {
  const form = document.getElementById("formulario-contacto");
  const enviar = form.querySelector("[type=submit]");
  let usuario = null;
  function mostrarIdentidad() {
    form.hidden = !usuario;
    document.getElementById("acceso-contacto").hidden = Boolean(usuario);
    enviar.disabled = !usuario;
  }
  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    enviar.disabled = true;
    enviar.textContent = "Enviando…";
    form.setAttribute("aria-busy", "true");
    try {
      usuario = await consultarSesion();
      if (!usuario) throw new Error("Inicia sesión para escribir a Jack.");
      await enviarFormulario(form, form.action);
      mostrarAviso("respuesta-contacto", "Mensaje enviado.", true);
      form.reset();
    } catch (error) {
      mostrarAviso("respuesta-contacto", error.message, false);
    } finally {
      mostrarIdentidad();
      enviar.textContent = "Enviar a Jack";
      form.removeAttribute("aria-busy");
      document
        .getElementById("respuesta-contacto")
        .focus({ preventScroll: false });
    }
  });
  consultarSesion()
    .then((datos) => {
      usuario = datos;
      mostrarIdentidad();
    })
    .catch(() => {
      mostrarIdentidad();
      mostrarAviso(
        "respuesta-contacto",
        "No podemos comprobar tu sesión en este momento. Vuelve a intentarlo más tarde.",
        false,
      );
    });
})();
