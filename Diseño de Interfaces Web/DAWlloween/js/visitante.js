'use strict';
(() => {
 document.querySelectorAll('a[href="contacto.php"]').forEach(a=>a.setAttribute('href','contacto.html'));
 const boton=document.getElementById('btn-perfil'); if(!boton) return;
 if(boton.tagName==='A') boton.href='perfil.html';
 else boton.addEventListener('click',()=>{location.href='perfil.html';});
 fetch('php/sesiones.php',{credentials:'same-origin'}).then(r=>{if(!r.ok)throw new Error('Sesión no disponible');return r.json();}).then(datos=>{
  if(!datos.usuario)return;
  const avatar=document.createElement('span'); pintarAvatar(avatar,datos.usuario.avatar);
  const nombre=document.createElement('span');nombre.className='nombre-visitante';nombre.textContent=datos.usuario.nombre;
  boton.replaceChildren(avatar,nombre);boton.title=`Perfil de ${datos.usuario.nombre}`;boton.setAttribute('aria-label',boton.title);
 }).catch(()=>{ /* El enlace al perfil sigue disponible si PHP no está activo. */ });
})();
