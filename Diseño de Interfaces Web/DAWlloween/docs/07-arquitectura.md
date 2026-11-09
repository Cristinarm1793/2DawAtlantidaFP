# 7. Arquitectura y datos

## Cliente
El museo carga main.js (anomalías), expediente.js (Sobre nosotros), comunicacion.js (API) y perfil.js (avatar e identidad). En perfil.html, perfil.js activa también el menú de la momia y sus formularios. Cada inicializador comprueba que existe su contenedor antes de actuar. Contacto comparte comunicacion.js. Recetario carga recetas.json. El juego conserva su JS y API independientes.

## Servidor
| Archivo | Responsabilidad |
|---|---|
| usuarios.php | GET: usuario público y CSRF. POST: accion=registro, login, password, avatar o salir. |
| funciones.php | Sesión, JSON privado, validación, hashes y funciones de cuenta, separadas por comentarios. |
| correo.php | Validar identidad y mensaje; llamar a mail(). |
| config-correo.php | Destinatario fijo y remitente SMTP opcional; sin contraseñas. |
| juego.php | Guardar, cargar y reiniciar la partida en sesión. |

Las rutas antiguas de cuentas se eliminan y los formularios apuntan a usuarios.php. El acceso de contacto es contacto.html; se retira la redirección antigua contacto.php.

## Persistencia
usuarios.json contiene una lista con Id, Usuario, Email, Contraseña (hash), Perfil, Pregunta, Respuesta (hash), Avatar, CreadoEn y Version. No contiene UsuarioActual: esa información debe ser individual por navegador. PHP no devuelve los hashes en su API.

El archivo se crea fuera de DocumentRoot. Una variable de entorno MUSEUM_DATOS_DIR permite elegir una carpeta explícita. El programa rechaza carpetas dentro de la raíz pública. No añadir alias de Apache que expongan esa carpeta.

Cada operación usa usuarios.lock para mantener bloqueada toda la lectura, comprobación de duplicados y escritura. Se escribe un archivo temporal en la misma carpeta y se renombra al destino; un JSON corrupto se rechaza sin sobrescribirlo. No editar manualmente el JSON con el servidor en funcionamiento. No borrar el archivo de bloqueo durante el uso.

La sesión guarda usuario_id y usuario_version. El cambio de contraseña incrementa Version y los accesos con la versión anterior dejan de estar autenticados. Cerrar sesión regenera su identificador y CSRF sin borrar casa_velasco ni las cuentas. Cada petición vuelve a leer el archivo para ver cambios de otros navegadores.

## Límites de la demostración
No se migran automáticamente cuentas de la matriz anterior. Los límites de intentos son por sesión, no un sistema global contra abuso. La recuperación por pregunta se conserva para la práctica; un servicio público necesita correo verificado y recuperación más robusta. JSON no sustituye todas las garantías y consultas de una base de datos. El juego sigue guardándose por sesión, no por cuenta. mail() necesita transporte y su aceptación no prueba entrega.
