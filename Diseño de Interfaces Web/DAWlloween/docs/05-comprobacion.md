# Comprobación antes de entregar

## Incluido en este parche
- Registro, acceso por usuario, recuperación por pregunta y cambio de avatar.
- Matriz `mimatriz`, rol user establecido en servidor, hashes, CSRF y límites de intentos por sesión.
- Nombre/avatar de visitante en el museo. No se sustituye main.js ni los parches previos de diseño del museo/juego.
- Momia sin uniforme, mano independiente y diez avatares de Halloween.
- Contacto con mail(), identidad de sesión, errores controlados y destinatario fijo g78409890@gmail.com y transporte SMTP pendiente.
- Compatibilidad con rutas PHP anteriores y aboutus.html hacia conocenos.html.

## Completar manualmente
- [ ] Transporte SMTP local; probar recepción y spam.
- [ ] Foto personal, foto del ente, imagen y audio de susto en los recursos del expediente de Sobre nosotros que hayas aplicado previamente.
- [ ] Textos personales, bibliografía y créditos de recursos. Declarar las imágenes generadas y adaptar la entrega a las normas del profesor.
- [ ] Comprobar que existe assets/otros/Jack Skellington.png, con ese nombre y mayúsculas.
- [ ] Ajustar posición/tamaño de la mano si lo deseas tras verla en el navegador. Es una imagen independiente con traslado y giro CSS, no un modelo 3D articulado.
- [ ] Capturas de sitemap, wireframes, paleta, fuentes, componentes y VirtualHost para contrastarlas con el enunciado completo.

## Pruebas manuales en XAMPP
- [ ] Registrar cuenta, rechazar duplicados, cerrar sesión y entrar de nuevo.
- [ ] Cambiar clave con respuesta correcta; comprobar rechazo con respuesta incorrecta y con clave antigua.
- [ ] Cambiar los diez avatares y comprobar nombre/avatar al volver al museo.
- [ ] Contacto sin sesión, campos vacíos, fallo SMTP y recepción real configurada.
- [ ] Las seis anomalías y Restablecer; Sobre nosotros, subventanas, atrás, cerrar, audio y screamer.
- [ ] Libro: apertura, tarjetas, índice completo, las 13 recetas, avanzar/retroceder y volver al índice.
- [ ] Juego: guardar/cargar/nueva partida, inventario, botiquín, escondites, tres cintas, enemigo, game over y tres salidas con sus objetos.
- [ ] Pantalla pequeña y grande: sin solapamientos, botones accesibles, formularios completos visibles. Los formularios largos permiten desplazarse para no ocultar campos.
- [ ] Teclado: Tab, Enter, foco visible y flechas del selector; reducción de movimiento del sistema.

No marcar estas pruebas como superadas hasta ejecutarlas en la versión local completa. El parche conserva el resto de archivos para no deshacer modificaciones anteriores que aún no estén subidas a Git.

## Comprobaciones automáticas realizadas sobre este parche
- Sintaxis de todos los archivos PHP y JavaScript: correcta.
- HTML: sin identificadores duplicados; referencias locales de páginas contrastadas con el inventario de Git y archivos nuevos.
- recetas.json: 13 entradas, imágenes referenciadas presentes en Git.
- Lógica de juego: mapa con destinos válidos, patrulla contigua, rechazo/aceptación de requisitos de las tres salidas, botiquín consumido y títulos únicos de documentos.
- Integración HTTP con PHP 8.3 y cuenta ficticia local: registro, duplicados, token CSRF inválido, rol user impuesto, avatar inválido/válido, cierre y nuevo acceso, respuesta secreta incorrecta/correcta, clave antigua rechazada y nueva aceptada.
- Guardar/cargar conserva la partida al cerrar sesión de usuario; Nueva partida elimina el guardado.
- Contacto rechaza ausencia de sesión y campos inválidos. No se ha enviado ningún correo externo ni probado la recepción SMTP.

Estas pruebas no sustituyen las pruebas visuales, de audio, de teclado y de entrega de correo en XAMPP.

## Corrección de formularios
- Inicio de sesión cambiado a email; el nombre se mantiene para mostrar identidad y recuperar por pregunta.
- Perfil limitado al marco de la ventana, con desplazamiento interno y barra dorada.
- Contacto requiere sesión en interfaz y PHP; no solicita nombre/email de nuevo.
- Hoja de Jack transparente, sin cabecera/pie externos, con regreso al museo.
- contactanos.css reescrito: eliminadas las reglas copiadas del juego. perfil.css unificado: eliminadas reglas de mano duplicadas/sobrescritas.
- Avisos técnicos de PHP sustituidos por mensajes comprensibles, sin fingir éxito ni ocultar un envío fallido.
- GitHub consultado sigue en c246c8f; esta corrección se aplica después de museum404-c246c8f.patch.

Pendiente: confirmar recorte y alineación de ambas imágenes en el navegador final, y recepción SMTP.

Verificación de esta corrección: sintaxis PHP/JS correcta; referencias de formularios comprobadas; integración HTTP correcta para registro, acceso por correo, recuperación, avatar y conservación del guardado. Contacto rechaza usuarios sin sesión. No se ejecutó envío real de correo. El navegador de pruebas no estuvo disponible, por lo que no se certifica la alineación visual final.
