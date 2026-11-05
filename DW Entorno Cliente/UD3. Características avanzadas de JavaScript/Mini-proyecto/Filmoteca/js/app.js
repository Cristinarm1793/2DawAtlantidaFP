import { peliculas } from './datos.js';
import { filtrarPeliculas, ordenarPeliculas, obtenerResumen, buscarPelicula, agregarASesion, quitarDeSesion, analizarSesion, obtenerFicha } from './funciones.js';
const sesion=[];
const catalogo=document.querySelector('#catalogo');
const filtros=document.querySelector('#filtros');
const busqueda=document.querySelector('#busqueda');
const genero=document.querySelector('#genero');
const orden=document.querySelector('#orden');
const mensaje=document.querySelector('#mensaje');
const detalle=document.querySelector('#detalle');
const resumen=obtenerResumen(peliculas);
Object.keys(resumen.porGenero).sort((a,b)=>a.localeCompare(b,'es')).forEach(nombre=>{
  const opcion=document.createElement('option'); opcion.value=nombre;
  opcion.textContent=`${nombre} (${resumen.porGenero[nombre]})`; genero.append(opcion);
});
function crearBoton(texto,accion,titulo) {
  const boton=document.createElement('button'); boton.type='button'; boton.textContent=texto;
  boton.dataset.accion=accion; boton.dataset.titulo=titulo;
  boton.setAttribute('aria-label',`${texto}: ${titulo}`); return boton;
}
function mostrarCatalogo() {
  const visibles=ordenarPeliculas(filtrarPeliculas(peliculas,busqueda.value,genero.value),orden.value);
  catalogo.replaceChildren();
  document.querySelector('#resultados').textContent=`${visibles.length} de ${peliculas.length} películas`;
  if (!visibles.length) { const aviso=document.createElement('p'); aviso.className='vacio'; aviso.textContent='No hay películas con estos filtros. Prueba otra búsqueda.'; catalogo.append(aviso); }
  visibles.forEach(pelicula=>{
    const tarjeta=document.createElement('article'); tarjeta.className='pelicula';
    const poster=document.createElement('div'); poster.className='poster';
    const imagen=document.createElement('img'); imagen.src=pelicula.cartel;
    imagen.alt=`Cartel gráfico de ${pelicula.titulo}`; imagen.loading='lazy'; imagen.width=400;imagen.height=580;
    const nota=document.createElement('span'); nota.className='nota'; nota.textContent=`★ ${pelicula.nota.toFixed(1)}`;
    const ficha=crearBoton('Ver ficha','ficha',pelicula.titulo); ficha.className='ver-ficha';
    poster.append(imagen,nota,ficha);
    const info=document.createElement('div'); info.className='info';
    const etiqueta=document.createElement('p'); etiqueta.className='metadatos'; etiqueta.textContent=`${pelicula.genero} / ${pelicula.anio}`;
    const titulo=document.createElement('h3'); titulo.textContent=pelicula.titulo;
    const pie=document.createElement('div');pie.className='pie-tarjeta';
    const duracion=document.createElement('span');duracion.textContent=`${pelicula.duracion} min`;
    pie.append(duracion,crearBoton('+ Mi sesión','agregar',pelicula.titulo));
    info.append(etiqueta,titulo,pie);tarjeta.append(poster,info);catalogo.append(tarjeta);
  });
}
function mostrarSesion() {
  const lista=document.querySelector('#seleccion');lista.replaceChildren();
  sesion.forEach(pelicula=>{
    const elemento=document.createElement('li'); const texto=document.createElement('span');
    texto.textContent=`${pelicula.titulo} · ${pelicula.duracion} min`;
    const boton=crearBoton('Quitar','quitar',pelicula.titulo);boton.className='secundario';elemento.append(texto,boton);lista.append(elemento);
  });
  const analisis=analizarSesion(sesion);
  document.querySelector('#contador').textContent=sesion.length;
  document.querySelector('#estado-sesion').textContent=!sesion.length ? 'Todavía no has elegido película. Tu butaca te espera.' : `${sesion.length}/3 películas · ${Math.floor(analisis.minutos/60)} h ${analisis.minutos%60} min en total. ${analisis.todasCortas ? 'Todas duran como máximo dos horas.' : 'Alguna película supera las dos horas.'}`;
  document.querySelector('#vaciar').disabled=!sesion.length;
}
function mostrarFicha(pelicula) {
  document.querySelector('#detalle-titulo').textContent=pelicula.titulo;
  const lista=document.querySelector('#detalle-datos');lista.replaceChildren();
  Object.entries(obtenerFicha(pelicula)).forEach(([clave,valor])=>{
    const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=clave;
    dd.textContent=clave==='Nota orientativa' ? valor.toFixed(1) : valor;lista.append(dt,dd);
  }); detalle.showModal();
}
filtros.addEventListener('submit',e=>e.preventDefault());
filtros.addEventListener('input',mostrarCatalogo);
filtros.addEventListener('reset',()=>setTimeout(mostrarCatalogo,0));
catalogo.addEventListener('click',evento=>{
  const boton=evento.target.closest('button[data-accion]');if (!boton) return;
  const pelicula=buscarPelicula(peliculas,boton.dataset.titulo);
  if (boton.dataset.accion==='ficha') mostrarFicha(pelicula);
  if (boton.dataset.accion==='agregar') {mensaje.textContent=agregarASesion(sesion,pelicula);mostrarSesion();}
});
document.querySelector('#seleccion').addEventListener('click',evento=>{
  const boton=evento.target.closest('button[data-accion="quitar"]');if (!boton) return;
  quitarDeSesion(sesion,boton.dataset.titulo);mensaje.textContent=`Eliminada: ${boton.dataset.titulo}.`;mostrarSesion();
});
document.querySelector('#vaciar').addEventListener('click',()=>{sesion.length=0;mensaje.textContent='Se ha vaciado la sesión.';mostrarSesion();});
document.querySelector('#cerrar').addEventListener('click',()=>detalle.close());
mostrarCatalogo();mostrarSesion();
