# 5. Comprobación de la versión JSON

Base: db2a7ec, revisión del 8 de noviembre de 2026. Se usan cuentas ficticias y un directorio temporal independiente; no se modifican usuarios reales.

## Comprobado automáticamente
- Sintaxis de todos los PHP con PHP 8.3 y de todos los JS con Node.
- Referencias estáticas de HTML/CSS contrastadas con el inventario completo de Git y los archivos nuevos: sin destinos faltantes. Sin IDs HTML duplicados.
- Sin referencias ejecutables a los PHP y JS retirados.
- Registro, email duplicado rechazado y cuenta accesible desde otra sesión/navegador.
- Acceso por email, rechazo de contraseña incorrecta y persistencia tras reiniciar PHP.
- Cambio de avatar visible desde otra sesión; avatar no admitido rechazado.
- CSRF ausente rechazado.
- Recuperación con respuesta incorrecta rechazada; contraseña nueva aceptada y antigua rechazada.
- Cambio de contraseña invalida otras sesiones que tenían acceso a esa cuenta.
- Contraseña y respuesta guardadas como hashes; sin UsuarioActual global en el JSON.
- Cinco procesos PHP con altas simultáneas: todas las cuentas se conservaron.
- JSON corrupto: error controlado y archivo original intacto.
- Guardar y cargar partida después de cerrar sesión de usuario conserva los datos.
- Contacto sin sesión rechazado antes del envío.

## Pendiente en tu instalación de Windows
- [ ] Aplicar el parche sobre la base indicada y revisar git diff.
- [ ] Registrar de nuevo una cuenta de prueba; entrar desde ventana privada.
- [ ] Confirmar la ubicación privada de usuarios.json y hacer copia de seguridad.
- [ ] Comprobar perfil, mano y diez avatares; volver al museo y ver la identidad.
- [ ] Probar Jack con SMTP configurado y comprobar recepción real (o bandeja de Mailtrap Sandbox).
- [ ] Probar las seis anomalías, Restablecer, expediente, audio y screamer.
- [ ] Recetario: abrir libro, índices, recetas y navegación.
- [ ] Juego: tres salidas, vidas, objetos, escondites, cintas, guardar/cargar/nueva partida.
- [ ] Comprobar el diseño en escritorio y móvil, teclado y lectura de todos los formularios.
- [ ] Completar foto personal, textos y créditos de imágenes/audio.

No se ha enviado correo externo ni certificado la entrega a Gmail. No se ha realizado una prueba visual completa de todas las páginas en un navegador en esta revisión. El análisis de rutas no sustituye la inspección visual ni permite asegurar que todos los recursos candidatos sobren.
