# 5. Guía de cierre y demostración

Base: `main`, commit `a5d54d1`, con la limpieza y corrección de esta revisión. Usar cuentas y mensajes ficticios para las pruebas. Marcar las casillas solo después de observar el resultado en tu ordenador.

## 1. Aplicar y revisar
- [ ] Confirmar que trabajas en main y que tienes tus cambios guardados en Git.
- [ ] Comprobar y aplicar el parche de limpieza correspondiente a a5d54d1. Si falla, no forzarlo ni aplicar parches anteriores.
- [ ] Revisar `git diff --stat`: deben desaparecer los 12 archivos antiguos enumerados en 09-organizacion-json.md.
- [ ] En php quedan funciones.php, usuarios.php, correo.php, config-correo.php y juego.php.
- [ ] Comprobar que config-correo.php comienza por `<?php`.

## 2. Arranque local
- [ ] Activar Apache en XAMPP, abrir la dirección que ya funcionaba y confirmar que es Museum 404, no el panel XAMPP.
- [ ] Recargar con Ctrl+F5 para que no se utilice el JavaScript antiguo.
- [ ] Abrir F12 → Consola y Red: revisar errores JS y peticiones 404/500 al navegar. Un recurso fallido debe corregirse antes de entregar.
- [ ] Mantener la misma dirección local durante las pruebas: cambiar entre localhost y 127.0.0.1 crea cookies distintas.

## 3. Perfil y cuentas persistentes
- [ ] Crear una cuenta ficticia con nombre, email, contraseña, pregunta, respuesta y avatar; debe confirmar la creación.
- [ ] Intentar registrar el mismo email: debe rechazarlo.
- [ ] Cerrar sesión e iniciar con el email; probar primero una clave incorrecta y después la correcta.
- [ ] Entrar con esa cuenta desde una ventana privada: debe funcionar sin registrarla otra vez.
- [ ] Cambiar el avatar y volver al museo: nombre y personaje deben verse correctamente.
- [ ] Cambiar la contraseña: la anterior debe fallar, la nueva debe funcionar y otra sesión abierta debe pedir acceso de nuevo.
- [ ] Reiniciar Apache y volver a entrar: la cuenta debe seguir existiendo en el JSON privado.
- [ ] Comprobar que usuarios.json está fuera de la carpeta pública, no en assets ni subido a GitHub.

## 4. Contactar con Jack
- [ ] Sin sesión: debe ofrecer registro/acceso y no permitir enviar.
- [ ] Con sesión: debe mostrar asunto y mensaje sin pedir de nuevo el correo.
- [ ] Intentar enviar campos vacíos: debe indicarlo sin confirmar envío.
- [ ] Configurar el transporte elegido en XAMPP/sendmail: destinatario escrito en PHP no basta para enviar.
- [ ] Enviar un mensaje ficticio y comprobar su llegada real: bandeja de Gmail/Spam si se usa envío real, o bandeja Mailtrap si se usa Sandbox.
- [ ] Ver el aviso debajo del formulario; comprobar que el texto se conserva cuando falla el envío.
- [ ] Confirmar que el formulario no tapa los dedos de Jack y que Volver al museo funciona.

Importante: «Mensaje enviado» indica aceptación por el transporte, no acredita llegada a Gmail. La recepción real es una comprobación aparte. Mailtrap Sandbox demuestra captura de pruebas, no entrega normal en Gmail.

## 5. Museo y expediente
- [ ] Activar cada anomalía: Morris, Windows, Deathstar, Therac-25, Patriot y polilla.
- [ ] Pulsar Restablecer: deben retirarse copias/efectos y volver a estar disponibles las acciones.
- [ ] Abrir las seis fichas, leerlas y cerrarlas con botón y Escape.
- [ ] Abrir Sobre nosotros: ver tu foto, entrar en Sobre mí, El proyecto y Bibliografía; probar volver y cerrar.
- [ ] Activar la fotografía del ente con volumen moderado y comprobar que cerrar detiene el sonido.
- [ ] Revisar textos personales, créditos y enlaces del pie. La imagen de Cristina ya está configurada; AUDIO_SUSTO vacío utiliza sonido sintético de respaldo.

## 6. Recetario
- [ ] Abrir el libro y recorrer las tarjetas con ambas flechas; el tamaño debe ser estable.
- [ ] Abrir el índice completo y regresar a las tarjetas.
- [ ] Abrir varias recetas desde ambos índices; verificar imagen, ingredientes y pasos.
- [ ] Recorrer las 13 recetas; comprobar primera/última y botones anterior/siguiente.
- [ ] Volver al índice desde una receta: debe ir al índice de tarjetas.
- [ ] Volver al museo y comprobar el comportamiento con reducción de movimiento del sistema.

## 7. Juego
- [ ] Nueva partida, guantera y linterna: imagen de objeto centrada e inventario en texto.
- [ ] Entrar en la casa; recorrer habitaciones, obtener llave del sótano y acceder al sótano.
- [ ] Obtener pilas y encender linterna; obtener botiquín y verificar recuperación de una vida cuando corresponda.
- [ ] Comprobar pasos del enemigo, esconderse, daño y Game Over con su imagen.
- [ ] Leer documentos; reproducir/detener las tres cintas y confirmar que Continuar detiene el audio.
- [ ] Ver todas las opciones con sus botones de paginación, sin perder opciones fuera del marco.
- [ ] Guardar, avanzar, cargar: se debe recuperar la posición, inventario, vidas y estado guardados.
- [ ] Nueva partida pide confirmación y borra el guardado de esa sesión.

Probar las tres salidas en partidas separadas (también comprobar que rechazan intentos sin requisitos):

| Salida | Requisitos |
|---|---|
| Puerta principal, recibidor | Ganzúa + destornillador. |
| Ventana, sótano | Palanca + llave pequeña. |
| Verja, patio | Usar fusible en sala eléctrica para desconectar + llave robusta. |

La partida se guarda por sesión del navegador; no viaja con la cuenta a otros dispositivos.

## 8. Pantallas y teclado
- [ ] Escritorio y pantalla estrecha: botones visibles, texto legible y ningún campo inaccesible.
- [ ] Tab/Enter, foco visible y Escape en diálogos.
- [ ] Revisar recortes de imágenes, tamaño de avatar y formularios largos con desplazamiento interno.
- [ ] Probar Chrome o Edge y el navegador del teléfono de presentación.

## 9. Enlace de presentación
Si el museo abre en `http://localhost/DAWlloween/index.html` y Apache está en el puerto 80:

```powershell
cloudflared tunnel --url http://localhost:80
```

- [ ] Copiar el dominio nuevo y añadir `/DAWlloween/index.html` (o la ruta local real).
- [ ] Abrirlo desde el móvil con datos móviles, no usando localhost.
- [ ] Probar imágenes, perfil, libro y juego desde ese enlace.
- [ ] Mantener ordenador despierto, Apache activo y terminal del túnel abierta.
- [ ] Guardar el enlace de esa sesión de presentación. Al reiniciar el túnel cambia; no es alojamiento permanente.

Si la URL local real no es la anterior, seguir 04-despliegue.md y ajustar servidor/ruta; no cambiar a 8088 si no hay un servidor escuchando en ese puerto.

## 10. Entrega
- [ ] Completar atribuciones/licencias de recursos externos y conservar los reconocimientos a las herramientas utilizadas.
- [ ] Revisar sitemap y capturas de la documentación; el boceto de Contacto ya no está en Git, no dejar un enlace roto a él.
- [ ] Si exportaste documentos a PDF en otro chat, volver a exportar los Markdown modificados: los PDF anteriores no cambian con este parche.
- [ ] Ejecutar `git status --short`; no incluir usuarios.json, credenciales SMTP ni archivos accidentales.
- [ ] Hacer commit y push a main; comprobar que la última versión está en GitHub.
- [ ] Preparar una demostración breve: museo → anomalía → receta → juego → perfil → contacto.

## Qué se ha comprobado automáticamente
- Sintaxis de todos los PHP y JS restantes; configuración de correo devuelve un array sin imprimir texto.
- Referencias locales HTML/CSS/Markdown, IDs únicos y acciones de los cinco formularios.
- Datos e imágenes de las 13 recetas; imágenes dinámicas de mapa, objetos, documentos, cintas y puertas contrastadas con el inventario de Git.
- Cuentas entre sesiones, duplicados, avatar, CSRF, cambio de contraseña, invalidación de accesos anteriores y persistencia al reiniciar PHP.
- Cinco procesos PHP con altas simultáneas sin pérdida de cuentas; JSON corrupto rechazado sin sobrescribirlo.
- Guardar/cargar/nueva partida y conservación del guardado al cerrar sesión.
- Contacto sin sesión rechazado y fallo de transporte simulado devuelto como JSON, sin enviar correo externo.
- Lógica aislada de mapa/patrulla, requisitos de las tres salidas, fusible, botiquín y navegación de recetas/índices.

No se certifican pruebas visuales, reproducción de todos los audios, recepción en Gmail ni un túnel activo en el PC de la autora. Esas casillas deben completarse allí antes de considerar cerrada la entrega.
