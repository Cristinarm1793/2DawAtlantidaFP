# 7. Arquitectura y datos

## Cliente
index.html carga main.js (anomalías), expediente.js (Sobre nosotros) y visitante.js/avatares.js (identidad visual). perfil.html y contacto.html comparten comunicacion.js para obtener sesión/CSRF y enviar FormData. recetario.js carga recetas.json. juego.js mantiene el estado en memoria y llama a php/juego.php para guardarlo.

## Servidor
| Archivo | Responsabilidad |
|---|---|
| VarGlobales.php | Iniciar sesión, matriz, validación, hashes, CSRF y funciones compartidas. |
| altaUsuario.php | Validar registro y activar usuario creado. |
| login.php | Comprobar correo y contraseña. |
| cambioPass.php | Verificar pregunta/respuesta y guardar contraseña nueva. |
| sesiones.php | Consultar usuario público, cerrar sesión y cambiar avatar. |
| correo.php | Validar identidad y mensaje y llamar a mail(). |
| config-correo.php | Destinatario fijo y remitente SMTP opcional; sin contraseñas. |
| juego.php | Guardar, cargar y reiniciar estado completo. |

registro.php, cambiar-password.php y enviar-contacto.php conservan compatibilidad con nombres anteriores. config.php carga VarGlobales.php. Las operaciones de cuenta/contacto usan POST y token CSRF; el guardado del juego conserva su endpoint independiente de la versión base.

## Sesión
mimatriz contiene Usuario, Contraseña (hash), Email, Perfil=user, Pregunta, Respuesta (hash), UsuarioActual, Avatar y CreadoEn. La respuesta pública excluye hashes y respuesta secreta. currentUser regenera identificador y token; cerrar sesión desmarca usuario sin borrar las cuentas de esa sesión ni casa_velasco.

casa_velasco guarda lugar, inventario, encontrados, vidas, pasoAsesino, escondido, linternaEncendida, cuadroReparado y final. El navegador conserva su estado activo hasta que lo guarda; recargar sin cargar no restaura automáticamente la partida.

## Límites
La matriz es por sesión/navegador. Los límites de intentos son también por sesión, no un sistema global contra abuso. No hay base de datos de usuarios compartida ni recuperación por correo. mail() necesita transporte operativo y su aceptación no demuestra entrega. Antes de un servicio público permanente se requiere revisar persistencia, autenticación, límites globales y despliegue HTTPS.
