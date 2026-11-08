# 6. Mantenimiento y ampliación

## Añadir más historia al mismo juego
Edita `js/juego.js`, busca `const documentosCasa = {`. Cada clave es una sala y contiene una lista de documentos. Por ejemplo, dentro de la lista `principal: [...]`, después del diario, añade otro objeto separado por coma:

```javascript
{
  titulo: "Carta del desván",
  accion: "Leer la carta bajo el diario",
  imagen: "carta-desvan.png",
  fragmento: "Aquí escribes el fragmento nuevo de tu historia.",
  reverso: "Una fecha, firma o segunda parte opcional."
}
```

Guarda la imagen en `assets/img/juego/objetos historia/carta-desvan.png`. No copies el nombre si tu archivo se llama distinto. El botón se genera automáticamente y abre el texto con la imagen de fondo. `reverso` es texto adicional: no gira físicamente la imagen. Usa títulos únicos, porque la marca de descubrimiento se guarda como `documento:` más el título. Releer no consume un nuevo turno; descubrirlo por primera vez sí.

Para ampliar un documento existente, modifica `fragmento` y `reverso`. Puedes utilizar una cadena con acentos graves y saltos de línea. El contenido se muestra mediante textContent: no se interpreta HTML. En documentos largos comprueba que se puede leer todo dentro del diálogo.

## Cintas
En el mismo objeto añade `audio: "assets/audio/juego/casete 4.mp3"` y crea ese archivo. Los controles de reproducción aparecen cuando existe audio. Continuar cierra el diálogo y detiene la reproducción. No necesitas añadir botones manualmente. Las tres cintas actuales se encuentran en secundario, salon y cobertizo.

## Descripción de habitación e introducción
Busca `const mapa = {`: cambia `texto` en la sala que quieras. `nombre` se muestra en el cartel y `imagen` identifica su fondo. La introducción visual también contiene textos en juego.html. La llegada inicial al recibidor tiene un mensaje específico dentro de irA; los finales están en mostrarAccionesEspeciales. Cambiar mapa.recibidor.texto no sustituye ese mensaje de entrada.

## Nueva habitación
1. Añade una clave única a mapa, con nombre, imagen, texto y salidas.
2. Conecta la sala desde las salidas de una habitación existente; añade también la vuelta si debe ser bidireccional.
3. Añade objetos o escondite solo si corresponden. Los objetos funcionales usan nombres exactos y requieren su entrada en imagenesObjetos.
4. Si el enemigo debe visitarla, modifica patrulla manteniendo habitaciones contiguas. El enemigo no descubre rutas por sí solo.
5. Revisa escucharPasos, los requisitos de entrada de irA y las acciones especiales si añades cerraduras.
6. Prueba con Nueva partida: cambiar la patrulla puede cambiar el significado de pasoAsesino en guardados antiguos.

## Historia completamente distinta
No basta con cambiar un fragmento. Trabaja en una rama Git, sustituye mapa y documentosCasa, revisa objetos, patrulla, crearPartida, irA, acciones de escape, imágenes finales y textos de juego.html. Si quieres conservar ambas aventuras, separa sus datos y utiliza claves de guardado distintas en PHP; la versión actual comparte casa_velasco y no incluye selector de campañas.

## Recetas
Edita recetas.json. Conserva la estructura de una receta existente; añade nombre, imagen, ingredientes y pasos. El índice se construye a partir del JSON. No añadas comentarios ni comas finales a JSON. Comprueba rutas y los nuevos botones tras recargar.

## Sobre nosotros
En js/expediente.js: FOTO_AUTORA apunta a tu fotografía; AUDIO_SUSTO a tu audio; IMAGEN_ENTE a la imagen del ente; contenidos contiene los párrafos de Sobre mí, El proyecto y Bibliografía. No introduzcas credenciales en estos archivos públicos.

## Contacto y perfil
php/config-correo.php fija el destinatario. SMTP se configura fuera de Git en XAMPP. La lista de avatares se comparte entre js/perfil.js y php/funciones.php: mantener mismos identificadores. Las cuentas se guardan en el JSON privado; no borrar toda la sesión al salir, porque contiene la partida. Las altas y cambios pasan por php/usuarios.php. Nunca modificar usuarios.json manualmente mientras la web esté en uso.

## Flujo de cambio
Guardar una versión en Git, modificar una cosa, ejecutar comprobación de sintaxis y probar en Apache, revisar git diff, confirmar y subir. Si cambias nombres de recursos, actualizar cada referencia respetando mayúsculas, especialmente al publicar en Linux.
