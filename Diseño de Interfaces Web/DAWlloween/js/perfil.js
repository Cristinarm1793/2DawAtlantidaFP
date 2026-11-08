// ==================== AVATARES COMPARTIDOS ====================
'use strict';
const avataresMuseo = ['esqueleto-hombre','momia-hombre','zombi-hombre','vampiro-hombre','hombre-lobo','esqueleto-mujer','momia-mujer','zombi-mujer','vampiro-mujer','mujer-lobo'];
function pintarAvatar(elemento, valor) {
 let i = avataresMuseo.indexOf(valor); if (i < 0) i = 1;
 elemento.classList.add('avatar-halloween');
 elemento.style.backgroundPosition = `${(i % 5) * 25}% ${i < 5 ? 0 : 100}%`;
 elemento.setAttribute('aria-hidden','true');
}
function opcionesAvatar(contenedor, elegido) {
 contenedor.replaceChildren();
 avataresMuseo.forEach((valor) => {
  const label = document.createElement('label');
  const radio = document.createElement('input');
  radio.type = 'radio'; radio.name = 'avatar'; radio.value = valor; radio.required = true; radio.checked = valor === elegido;
  const foto = document.createElement('span'); pintarAvatar(foto,valor);
  const texto = document.createElement('span'); texto.textContent = valor.replaceAll('-',' ');
  label.append(radio,foto,texto); contenedor.append(label);
 });
}

// ==================== VISITANTE EN EL MUSEO ====================
'use strict';
(() => {
 document.querySelectorAll('a[href="contacto.php"]').forEach(a=>a.setAttribute('href','contacto.html'));
 const boton=document.getElementById('btn-perfil'); if(!boton) return;
 if(boton.tagName==='A') boton.href='perfil.html';
 else boton.addEventListener('click',()=>{location.href='perfil.html';});
 consultarSesion().then(usuario=>{
  const datos = {usuario};
  if(!datos.usuario)return;
  const avatar=document.createElement('span'); pintarAvatar(avatar,datos.usuario.avatar);
  const nombre=document.createElement('span');nombre.className='nombre-visitante';nombre.textContent=datos.usuario.nombre;
  boton.replaceChildren(avatar,nombre);boton.title=`Perfil de ${datos.usuario.nombre}`;boton.setAttribute('aria-label',boton.title);
 }).catch(()=>{ /* El enlace al perfil sigue disponible si PHP no está activo. */ });
})();

// ==================== FORMULARIOS DEL PERFIL ====================
"use strict";
(() => {
    const $ = id => document.getElementById(id);
    let usuario = null;
    let navegacionUsada = false;
    const vistas = { menu: "menu-perfil", login: "form-login", registro: "form-registro", recuperar: "form-password", usuario: "panel-usuario" };
    const menu = $(vistas.menu);
    if (!menu) return; // En index.html solo se actualiza el botón del visitante.
    const botones = [...menu.querySelectorAll("button")];
    let seleccionado = botones[0];

    function apuntar(boton) {
        seleccionado = boton;
        $("mano-menu").style.top = `${boton.offsetTop + boton.offsetHeight / 2}px`;
        $("mano-menu").style.setProperty("--giro", boton === botones[0] ? "-12deg" : "14deg");
    }
    function mostrar(vista, foco = true) {
        if (usuario && ["menu", "login", "registro"].includes(vista)) vista = "usuario";
        Object.entries(vistas).forEach(([nombre, id]) => { $(id).hidden = nombre !== vista; });
        document.querySelector(".contenido-perfil").scrollTop = 0;
        if (vista === "menu") requestAnimationFrame(() => apuntar(seleccionado));
        if (foco) $(vistas[vista]).querySelector("input:not([type=hidden]),button,a")?.focus({ preventScroll: true });
    }
    function pintarUsuario() {
        if (!usuario) return;
        $("nombre-usuario").textContent = `Bienvenido/a, ${usuario.nombre}`;
        $("correo-usuario").textContent = usuario.email;
        $("recuperar-usuario").value = usuario.nombre;
        opcionesAvatar($("avatares-perfil"), usuario.avatar);
    }
    function aviso(texto, correcto) {
        mostrarAviso("aviso-perfil", texto, correcto);
        $("aviso-perfil").focus({ preventScroll: true });
    }
    opcionesAvatar($("avatares-registro"), "momia-hombre");
    document.querySelectorAll("[data-vista]").forEach(boton => boton.addEventListener("click", () => {
        navegacionUsada = true;
        $("aviso-perfil").textContent = "";
        mostrar(boton.dataset.vista);
    }));
    botones.forEach((boton, i) => {
        boton.addEventListener("pointerenter", () => apuntar(boton));
        boton.addEventListener("focus", () => apuntar(boton));
        boton.addEventListener("keydown", e => {
            if (["ArrowUp", "ArrowDown"].includes(e.key)) { e.preventDefault(); botones[1 - i].focus(); }
        });
    });
    new ResizeObserver(() => { if (!menu.hidden) apuntar(seleccionado); }).observe(menu);
    ["form-login", "form-registro", "form-password", "form-avatar", "form-salir"].forEach(id => {
        const form = $(id);
        form.addEventListener("invalid", () => mostrarAviso("aviso-perfil", "Revisa los campos señalados antes de continuar.", false), true);
        form.addEventListener("submit", async e => {
            e.preventDefault();
            const boton = form.querySelector("button[type=submit],button:not([type])");
            const etiqueta = boton.textContent;
            boton.disabled = true; boton.textContent = "Un momento…"; form.setAttribute("aria-busy", "true");
            mostrarAviso("aviso-perfil", id === "form-registro" ? "Creando tu cuenta…" : "Comprobando los datos…", true);
            let guardado = false;
            try {
                // Refrescar token sin repetir automáticamente operaciones que cambian datos.
                await consultarSesion();
                const resultado = await enviarFormulario(form, form.action);
                guardado = true;
                if (id === "form-password" || id === "form-salir") {
                    usuario = null;
                    form.reset();
                    mostrar(id === "form-password" ? "login" : "menu");
                } else {
                    usuario = await consultarSesion();
                    pintarUsuario();
                    if (id !== "form-avatar") form.reset();
                    mostrar("usuario");
                }
                const texto = id === "form-registro" ? "Cuenta creada. Ya has iniciado sesión." : id === "form-password" ? "Contraseña cambiada. Entra con tu correo y la nueva contraseña." : resultado.mensaje || "Cambios guardados.";
                aviso(texto, true);
            } catch (error) {
                aviso(guardado ? "La operación se ha guardado, pero no hemos podido actualizar tu perfil. Recarga la página." : error.message, false);
            } finally {
                boton.disabled = false; boton.textContent = etiqueta; form.removeAttribute("aria-busy");
            }
        });
    });
    const hash = location.hash.slice(1);
    mostrar(["login", "registro", "recuperar"].includes(hash) ? hash : "menu", false);
    consultarSesion().then(datos => {
        usuario = datos; pintarUsuario();
        if (!navegacionUsada) mostrar(["login", "registro", "recuperar"].includes(hash) ? hash : "menu", false);
    }).catch(() => { /* No interrumpir la visita con un aviso técnico al abrir. Se informa si intenta enviar. */ });
})();
