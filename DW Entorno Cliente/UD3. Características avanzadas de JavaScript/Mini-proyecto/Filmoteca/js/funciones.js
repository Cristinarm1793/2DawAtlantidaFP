export function filtrarPeliculas(peliculas, texto, genero) {
  return peliculas.filter(p => p.titulo.toLocaleLowerCase('es').includes(texto.trim().toLocaleLowerCase('es')) && (!genero || p.genero === genero));
}
export function ordenarPeliculas(peliculas, criterio) {
  
  return [...peliculas].sort((a,b) => {
    if (criterio === 'titulo') return a.titulo.localeCompare(b.titulo,'es');
    if (criterio === 'anio') return b.anio-a.anio;
    if (criterio === 'duracion') return a.duracion-b.duracion;
    return b.nota-a.nota;
  });
}
export function obtenerResumen(peliculas) {
  const porGenero = {}; let suma = 0;
  peliculas.forEach(p => { porGenero[p.genero] = (porGenero[p.genero] || 0)+1; suma += p.nota; });
  return {total:peliculas.length, media:peliculas.length ? suma/peliculas.length : 0, porGenero};
}
export function buscarPelicula(peliculas,titulo) {
  return peliculas.find(p => p.titulo === titulo);
}
export function agregarASesion(sesion,pelicula) {
  if (!pelicula) return 'No se ha encontrado la película.';
  if (sesion.some(p => p.titulo === pelicula.titulo)) return 'Esta película ya está en tu sesión.';
  if (sesion.length >= 3) return 'Tu sesión ya tiene tres películas. Quita una para añadir otra.';
  sesion.push(pelicula); return `Añadida: ${pelicula.titulo}.`;
}
export function quitarDeSesion(sesion,titulo) {
  const posicion = sesion.findIndex(p => p.titulo === titulo);
  if (posicion !== -1) sesion.splice(posicion,1);
}
export function analizarSesion(sesion) {
  let minutos=0; sesion.forEach(p => { minutos += p.duracion; });
  return {minutos, todasCortas:sesion.length>0 && sesion.every(p => p.duracion<=120)};
}
export function obtenerFicha(pelicula) {
  const etiquetas={genero:'Género',anio:'Año',nota:'Nota orientativa',duracion:'Duración (min)',director:'Dirección'};
  const pares=Object.entries(pelicula)
    .filter(([clave]) => clave !== 'titulo' && clave !== 'cartel')
    .map(([clave,valor]) => [etiquetas[clave],valor]);
  return Object.fromEntries(pares);
}
