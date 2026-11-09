# 9. Organización, JSON y limpieza revisada

## Base comprobada
Repositorio Cristinarm1793/2DawAtlantidaFP, rama main, commit a5d54d1. Contiene 10fe65d; arreglo-juego permanece como rama antigua. Se revisó el código versionado, las referencias y el inventario de recursos. No se altera ninguna otra asignatura del repositorio.

## Archivos retirados por esta corrección
| Archivos | Motivo |
|---|---|
| php/VarGlobales.php | Funciones antiguas con cuentas solo en sesión; sustituidas por funciones.php. |
| php/altaUsuario.php, login.php, cambioPass.php, sesiones.php | Los cinco formularios usan usuarios.php y sus acciones. |
| php/registro.php, cambiar-password.php, config.php, enviar-contacto.php | Alias del sistema antiguo sin consumidores activos. |
| js/avatares.js, js/visitante.js | Integrados en perfil.js, ya cargado por museo y perfil. |
| contacto.php | Redirección antigua. Los enlaces internos usan contacto.html. Un marcador externo a la ruta antigua deberá actualizarse. |

Son doce archivos en total. Se elimina también la sustitución JS de enlaces contacto.php que ya no existen. No borrar funciones.php ni usuarios.php.

## Archivos que se conservan
- Todos los HTML: cada página tiene acceso activo. conocenos.html es el destino del enlace Sobre nosotros si no se intercepta mediante el diálogo.
- Todos los CSS: avatares.css es compartido, general.css se carga en varias páginas y conocenos.css corresponde a la página independiente.
- Los siete JS restantes tienen una responsabilidad activa: main, expediente, perfil, comunicacion, contacto, juego y recetario.
- Los cinco PHP restantes: funciones, usuarios, correo, config-correo y juego.
- recetas.json es la fuente de las recetas, no un duplicado documental.
- docs/DAWlloween_sitemap.drawio e img/ se conservan como fuentes y bocetos. No son ejecutables ni archivos inútiles.
- Imágenes de puertas abierta/cerrada: su nombre se construye dinámicamente en juego.js.

## Cambios ya hechos en a5d54d1
La carpeta assets/img/Descartadore-Referencias y los documentos Historia-Juego.md, Objetos museo.md, Recetas.md e ideas.md ya están retirados. No hay que borrarlos otra vez. La investigación antigua puede recuperarse desde Git. Se ha actualizado el índice para no enlazarlos.

## Correcciones adicionales
- config-correo.php vuelve a comenzar por <?php para devolver la configuración como array y no como texto.
- Se corrige el enlace al boceto de contacto eliminado; se indica que no hay ese boceto en la versión actual.
- Se eliminan ocultaciones repetidas en mostrarPagina y se valida el destino antes de ocultar el libro.
- El texto del expediente distingue correctamente cuentas JSON de partidas en sesión y corrige erratas.

## Usuarios
Las cuentas se guardan fuera de DocumentRoot, en museum404-datos/usuarios.json. Contraseñas y respuestas se guardan como hashes. Cada navegador mantiene su propia identidad. Configurar MUSEUM_DATOS_DIR si Apache y el servidor local deben compartir el mismo almacén. No subir datos privados a Git ni editar el archivo con el servidor activo.

## Límite de esta revisión
La ausencia de referencias literales a un recurso no demuestra que pueda borrarse: puede ser dinámico, material original o documentación. No se eliminan más imágenes/audio sin verificar su función. Las pruebas automáticas no certifican el diseño visual ni la recepción real de correo en Gmail. Ver 05-comprobacion.md.
