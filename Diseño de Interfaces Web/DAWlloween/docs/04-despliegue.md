# Ejecución y despliegue local con XAMPP

## Primera prueba
1. Conserva el proyecto dentro de una carpeta servida por Apache, por ejemplo `C:\xampp\htdocs\DAWlloween`. Si utilizas un enlace existente a tu repositorio, no dupliques la carpeta.
2. En XAMPP activa Apache. No necesitas MySQL para estas cuentas: se usa un archivo JSON privado.
3. Abre `http://localhost/DAWlloween/index.html`. Perfil: `http://localhost/DAWlloween/perfil.html`. Contacto: `http://localhost/DAWlloween/contacto.html`.
4. Si tu carpeta servida tiene otro nombre, cambia ese segmento de la URL. Live Server (puerto 5500/5501) no ejecuta PHP.

## VirtualHost solicitado en el proyecto
En `C:\xampp\apache\conf\extra\httpd-vhosts.conf`, adapta la ruta real:

```apache
<VirtualHost *:80>
    ServerName museum404.test
    DocumentRoot "C:/xampp/htdocs/DAWlloween"
    <Directory "C:/xampp/htdocs/DAWlloween">
        Require all granted
        AllowOverride All
        Options -Indexes +FollowSymLinks
        DirectoryIndex index.html
    </Directory>
</VirtualHost>
```

Comprueba que `httpd.conf` incluye ese archivo. En el archivo Windows `C:\Windows\System32\drivers\etc\hosts` (editar como administrador), añade `127.0.0.1 museum404.test`. Reinicia Apache y abre `http://museum404.test/`. Si tienes otros sitios, conserva sus VirtualHost y el de localhost. Toma capturas de configuración, permisos de lectura/ejecución, portada provisional y página final para la entrega. No concedas escritura a toda la carpeta innecesariamente.

## Correo pendiente
`php/config-correo.php` fija el destinatario en `g78409890@gmail.com`. El visitante no puede cambiarlo desde el formulario. No guardes su contraseña en Git.

Además del destinatario necesitas un transporte de correo operativo. En XAMPP Windows, `mail()` usa la configuración de PHP/sendmail; rellenar el email por sí solo no configura SMTP. Cuando elijas proveedor, configura servidor, puerto, cifrado, usuario y contraseña de aplicación en el `sendmail.ini` local según sus instrucciones. Configura `sendmail_path` en el php.ini que carga Apache, reinicia Apache y prueba entrada/spam. El proveedor puede exigir que From coincida con la cuenta autenticada: para eso existe `remitente_smtp`; Reply-To seguirá siendo el visitante. Si queda vacío, From es el correo del usuario, como en el enunciado.

No se ha realizado un envío externo de prueba: falta configurar el transporte SMTP. Mantener ambos archivos de credenciales de XAMPP fuera del repositorio.

## Publicación posterior
Docker puede ejecutar Apache/PHP, pero no proporciona por sí mismo alojamiento público. El dominio de hosts solo funciona en tu ordenador. El despliegue público y el correo real requieren configuración adicional. Los usuarios ya tienen persistencia JSON para la demostración.

## Prueba rápida de formularios con PHP
Si las peticiones a php/usuarios.php no devuelven JSON, no se pueden crear cuentas. No basta con retirar el aviso de pantalla. Para probar sin mover la carpeta, abre tu iniciar-local.bat, si lo conservas, en la raíz de DAWlloween (requiere PHP en C:\xampp\php\php.exe; adaptar esa ruta si usas otra instalación). Mantén la consola abierta y abre http://127.0.0.1:8088/index.html. Todos los enlaces deben permanecer en ese mismo host/puerto para compartir sesión. Este servidor es solo de desarrollo local; el VirtualHost de Apache sigue siendo la configuración de entrega.

Prueba registro y luego acceso por correo; revisa en las herramientas del navegador que usuarios.php responde application/json y que los POST devuelven un estado correcto. El frontend confirma explícitamente la creación y nunca simula una cuenta cuando PHP no está disponible. El correo sigue requiriendo SMTP; no se configura automáticamente con este lanzador.

## Almacén privado de usuarios
Consultar README.md para las rutas según Apache o el lanzador. PHP crea la carpeta y el JSON automáticamente; no crear usuarios.json en assets ni dentro de la web. En Apache/XAMPP con DocumentRoot C:/xampp/htdocs, la ruta predeterminada es C:/xampp/museum404-datos/usuarios.json.

Para fijar ruta con Apache, añadir `SetEnv MUSEUM_DATOS_DIR "C:/xampp/museum404-datos"` en el VirtualHost y reiniciar Apache. Para el .bat, añadir antes de ejecutar PHP la línea `set "MUSEUM_DATOS_DIR=C:\xampp\museum404-datos"`. Usar la misma ruta si se quieren compartir datos entre ambos servidores. El usuario que ejecuta PHP necesita permiso de escritura. No ubicar la carpeta en un directorio publicado mediante Alias.

Al mover la web a otro ordenador hay que trasladar también la carpeta privada, o crear nuevas cuentas de prueba. Guardar una copia con el servidor detenido. No incluirla en GitHub. Una nueva URL de túnel no borra el JSON; el visitante tendrá que volver a iniciar sesión.

## Alternativas para el correo
Mailtrap Email Sandbox captura los mensajes para inspeccionarlos en su panel y no los entrega normalmente a Gmail. Brevo ofrece envío real por SMTP, con cuenta y remitente verificados. Se puede usar cualquiera con el transporte de PHP/sendmail; las credenciales se configuran localmente. No se ha configurado una cuenta de estos proveedores ni enviado mensajes desde esta revisión.

## Compartir desde Apache con Cloudflare
El túnel debe apuntar al servidor que ya funciona. Si abre `http://localhost/DAWlloween/index.html`, mantener Apache encendido y ejecutar en otra terminal:

```powershell
cloudflared tunnel --url http://localhost:80
```

Si el ejecutable está en la carpeta actual y no está en PATH, usar `./cloudflared.exe` en lugar de `cloudflared`. Copiar la URL nueva que aparece y añadir `/DAWlloween/index.html`. El nombre de la subcarpeta debe coincidir exactamente con la URL local; si el proyecto está en otra ruta, conservar esa ruta.

Abrir solo la raíz del dominio temporal puede mostrar el panel de Apache/XAMPP: eso no demuestra que el museo esté roto. Si un VirtualHost sirve el museo en la raíz, el enlace no lleva /DAWlloween/ y el túnel debe enviar el host de ese VirtualHost; no mezclar ambos modos.

Antes de compartir, comprobar desde un móvil con datos: portada, imágenes, registro/acceso, recetario y juego. No utilizar localhost en el teléfono: localhost siempre apunta al propio dispositivo. Mantener ordenador despierto, Apache y terminal cloudflared activos. Si se suspende o se cierra el proceso, el enlace deja de funcionar; al arrancar otro túnel cambia el dominio. No incluir un dominio temporal antiguo como dirección permanente en la documentación.

El túnel publica el servicio al que apunta, no solo el enlace que compartes. La carpeta privada de usuarios debe seguir fuera de toda ruta pública, incluido cualquier Alias de Apache.

Referencia: https://developers.cloudflare.com/tunnel/get-started/quick-tunnels/ (consultada el 8 de noviembre de 2026). No se ha arrancado un túnel en el ordenador de la autora desde esta revisión.
