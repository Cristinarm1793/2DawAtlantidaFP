"use strict";

let csrf = "";
const ERROR_CONEXION = "No hemos podido conectar con el museo. Inténtalo de nuevo dentro de unos momentos.";

async function peticionMuseo(url, opciones = {}) {
    const controlador = new AbortController();
    const limite = setTimeout(() => controlador.abort(), 12000);
    try {
        const respuesta = await fetch(url, { ...opciones, credentials: "same-origin", signal: controlador.signal });
        const datos = await leerRespuesta(respuesta);
        if (datos.csrf) csrf = datos.csrf;
        if (!respuesta.ok || datos.ok === false) throw new Error(datos.error || ERROR_CONEXION);
        return datos;
    } catch (error) {
        if (error.name === "AbortError" || error instanceof TypeError) throw new Error(ERROR_CONEXION);
        throw error;
    } finally {
        clearTimeout(limite);
    }
}
async function consultarSesion() {
    const datos = await peticionMuseo("php/usuarios.php");
    return datos.usuario;
}
async function enviarFormulario(formulario, destino) {
    if (!csrf) await consultarSesion();
    const datos = new FormData(formulario);
    datos.set("csrf", csrf);
    return peticionMuseo(destino, { method: "POST", body: datos });
}
function mostrarAviso(id, mensaje, correcto) {
    const elemento = document.getElementById(id);
    elemento.textContent = mensaje;
    elemento.className = correcto ? "mensaje-exito" : "mensaje-error";
    elemento.setAttribute("role", correcto ? "status" : "alert");
}
async function leerRespuesta(respuesta) {
    if (!(respuesta.headers.get("content-type") || "").includes("application/json")) {
        throw new Error(ERROR_CONEXION);
    }
    try { return await respuesta.json(); }
    catch { throw new Error(ERROR_CONEXION); }
}
