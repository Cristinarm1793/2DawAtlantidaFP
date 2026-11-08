# Ejecución y despliegue local con XAMPP

## Primera prueba
1. Conserva el proyecto dentro de una carpeta servida por Apache, por ejemplo `C:\xampp\htdocs\DAWlloween`. Si utilizas un enlace existente a tu repositorio, no dupliques la carpeta.
2. En XAMPP activa Apache. No necesitas MySQL para estas cuentas: se usa la matriz de sesión del enunciado.
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
Docker puede ejecutar Apache/PHP, pero no proporciona por sí mismo alojamiento público. El dominio de hosts solo funciona en tu ordenador. El despliegue público, correo real y persistencia de usuarios necesitan una decisión posterior; la matriz de sesión es el alcance de esta práctica.

## Prueba rápida de formularios con PHP
Si las peticiones a php/sesiones.php no devuelven JSON, no se pueden crear cuentas. No basta con retirar el aviso de pantalla. Para probar sin mover la carpeta, abre iniciar-local.bat en la raíz de DAWlloween (requiere PHP en C:\xampp\php\php.exe; adaptar esa ruta si usas otra instalación). Mantén la consola abierta y abre http://127.0.0.1:8088/index.html. Todos los enlaces deben permanecer en ese mismo host/puerto para compartir sesión. Este servidor es solo de desarrollo local; el VirtualHost de Apache sigue siendo la configuración de entrega.

Prueba registro y luego acceso por correo; revisa en las herramientas del navegador que sesiones.php responde application/json y que los POST devuelven un estado correcto. El frontend confirma explícitamente la creación y nunca simula una cuenta cuando PHP no está disponible. El correo sigue requiriendo SMTP; no se configura automáticamente con este lanzador.
