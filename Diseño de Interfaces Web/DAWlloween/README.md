# Museum 404: Not Found — DAWlloween

Proyecto de 2.º DAW: museo interactivo de errores informáticos, recetario y aventura de terror con opciones de texto.

Versión de trabajo: rama `main`, base `a5d54d1`, con la limpieza de archivos y la corrección de configuración de correo de esta revisión.

## Funciones implementadas
- Museo con seis objetos y anomalías, expediente «Sobre nosotros» y bibliografía.
- Recetario generado desde `recetas.json`.
- Juego con inventario, dos vidas, escondites y tres salidas. Guardado de partida en sesión PHP.
- Registro, acceso por email, recuperación por pregunta de seguridad y diez avatares.
- Cuentas compartidas entre navegadores y persistentes en `usuarios.json` privado.
- Contacto de Jack para visitantes identificados. Requiere configurar transporte de correo para entregar mensajes.

## Ejecutar en Windows
Requiere PHP 8 o superior (por ejemplo, XAMPP). No requiere MySQL ni Composer.

Opción local: si ya tienes `iniciar-local.bat`, puedes seguir usándolo. Si no, abrir CMD en la carpeta DAWlloween y ejecutar:

```bat
C:\xampp\php\php.exe -S 127.0.0.1:8088 -t .
```

Visitar http://127.0.0.1:8088/index.html. Dejar la ventana abierta; Ctrl+C detiene el servidor. El lanzador local no está versionado en la base revisada.

Opción Apache: colocar el proyecto en `C:/xampp/htdocs/DAWlloween`, activar Apache y abrir http://localhost/DAWlloween/index.html. También se puede usar un VirtualHost cuyo DocumentRoot apunte al proyecto. Live Server no ejecuta PHP.

## Dónde quedan las cuentas
PHP crea `museum404-datos/usuarios.json` **al lado de la carpeta pública del servidor**, no dentro de ella. Si Apache sirve `C:/xampp/htdocs`, el archivo será `C:/xampp/museum404-datos/usuarios.json`. Si el servidor local sirve la carpeta DAWlloween, se crea en la carpeta inmediatamente superior, dentro de `museum404-datos`.

Se puede fijar otra carpeta mediante `MUSEUM_DATOS_DIR`, siempre fuera de DocumentRoot. PHP necesita permiso de lectura y escritura. Para compartir las mismas cuentas entre Apache y el lanzador, configurar ambos con la misma carpeta privada.

Las contraseñas y respuestas se guardan como hashes. La sesión conserva únicamente la identidad conectada, CSRF y el estado del juego. Cambiar la contraseña invalida los accesos anteriores de esa cuenta. La partida **no** se sincroniza entre navegadores.

Las cuentas de la antigua matriz de sesión no se importan automáticamente: crear de nuevo las cuentas de demostración una sola vez. No subir usuarios reales ni credenciales a Git. Copiar la carpeta privada, con el servidor detenido, si se necesita trasladar las cuentas a otro equipo.

## Organización
| Archivo | Función |
|---|---|
| `php/usuarios.php` | API única: registro, acceso, contraseña, avatar, consulta y cierre de sesión. |
| `php/funciones.php` | Funciones por secciones: sesión, validación, JSON privado, altas y contraseña. |
| `php/correo.php` | Contacto autenticado y envío mediante mail(). |
| `php/config-correo.php` | Destinatario y remitente, sin credenciales. |
| `php/juego.php` | Guardado, carga y nueva partida del juego. |
| `js/perfil.js` | Avatares, identidad en el museo y formularios de perfil. |
| `js/comunicacion.js` | Peticiones compartidas por museo, perfil y contacto. |
| `js/main.js`, `expediente.js`, `juego.js`, `recetario.js`, `contacto.js` | Interacciones separadas por sección. |

Se mantienen los CSS compartidos: `general.css` y `avatares.css` evitan duplicar reglas entre páginas.

## Correo
El destinatario es `g78409890@gmail.com`. Configurar PHP/sendmail o el transporte SMTP elegido. Mailtrap Email Sandbox sirve para inspeccionar pruebas en su bandeja; Brevo permite envío real sujeto a configuración y verificación del remitente. Guardar credenciales solo en configuración local ajena a Git. Que mail() acepte un mensaje no demuestra que haya llegado a Gmail.

## Documentación y estado
[Índice](docs/00-indice-documentacion.md) · [Guía de usuario](docs/03-guia-usuario.md) · [Despliegue](docs/04-despliegue.md) · [Pruebas](docs/05-comprobacion.md) · [Ampliar historia](docs/06-mantenimiento.md) · [Arquitectura](docs/07-arquitectura.md) · [Limpieza](docs/09-organizacion-json.md).

Esta versión se orienta a una demostración de clase. JSON permite persistencia sencilla; para un servicio público permanente conviene una base de datos, recuperación por correo verificado y controles de abuso globales. Quedan por verificar la recepción real de correo, recursos personales y el ajuste visual en los dispositivos de presentación.

## Presentación
Seguir [la guía de cierre y demostración](docs/05-comprobacion.md). Si se comparte mediante Cloudflare, usar el servidor Apache ya operativo y añadir al dominio temporal la misma ruta /DAWlloween/index.html que funciona en localhost. No confundir una URL temporal con alojamiento permanente.

La limpieza retira nueve PHP de cuentas antiguos, dos JS integrados en perfil.js y la redirección contacto.php. No se borran otros ejercicios del repositorio ni recursos de juego por falta de una referencia literal. Los documentos sin número ya fueron retirados; el sitemap editable y sus imágenes se conservan.
