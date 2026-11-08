# 9. Organización y persistencia JSON

Base revisada: rama arreglo-juego, commit db2a7ec. Se recorrieron los HTML, PHP, JS, CSS, JSON y Markdown versionados para revisar rutas, dependencias y documentación. Se inventariaron los nombres de recursos; no se certifica una revisión visual de cada imagen ni la reproducción de cada audio. Los cambios locales no subidos no están en esta base.

## Archivos que desaparecen con el parche
No borrarlos antes de aplicar: el parche integra su contenido y actualiza referencias.

| Archivo | Destino |
|---|---|
| php/VarGlobales.php | php/funciones.php, adaptado a JSON privado. |
| php/altaUsuario.php, php/login.php, php/cambioPass.php, php/sesiones.php | php/usuarios.php por acciones. |
| php/registro.php, php/cambiar-password.php | Alias de los anteriores, ya innecesarios. |
| php/config.php | Alias de VarGlobales sin consumidores activos. |
| php/enviar-contacto.php | Alias; el formulario usa php/correo.php. |
| js/avatares.js, js/visitante.js | js/perfil.js, con inicialización según la página. |

## Archivos que se conservan
- css/avatares.css se comparte entre museo y perfil: no es código duplicado.
- css/general.css se usa en museo, juego, recetario y conocenos.
- conocenos.html y css/conocenos.css tienen un enlace en index.html; no declararlos sin uso aunque el JS abra normalmente el expediente.
- contacto.php redirige a contacto.html: pequeño punto de compatibilidad para enlaces existentes.
- correo.php y juego.php tienen responsabilidades distintas de las cuentas.
- docs e imágenes de bocetos son material documental, no archivos muertos de la aplicación.

Las imágenes `puerta abierta.png` y `puerta cerrada.png` sí se usan: juego.js construye la ruta con el estado de la puerta.

## Recursos para revisar antes de borrar
No se eliminan imágenes ni audios en este parche. Las carpetas assets/img/Descartadore-Referencias y assets/audio/juego/Recursos contienen material de referencia/originales. No se encontraron referencias literales a esas carpetas en los archivos de ejecución; pueden archivarse fuera de la web si no se quieren distribuir.

Otros recursos sin referencia literal encontrada (esto no prueba por sí solo que sobren, porque algunas rutas se construyen dinámicamente):
- `assets/img/juego/Mapa de la Casa de los Velasco (2).png`
- `assets/img/juego/Objetos funcionales/Grabadora.png`
- `assets/img/juego/objetos historia/Inspección del reloj antiguo.png`
- `assets/img/museo/MUSEUM 404  ERROR GLITCH.png`
- `assets/img/otros/Boton-return-der-museo.png`
- `assets/img/otros/Boton-return-izq-museo.png`
- `assets/img/otros/Carpeta confidencial_ expediente Nº 001.png`
- `assets/img/otros/Cartel gótico RECETARIO con flecha-2.png`
- `assets/img/otros/Cartel gótico de museo embrujado-1.png`
- `assets/img/otros/Perfil.png`
- `assets/img/otros/demo-vitrinas-arcos.jpg`

## Qué cambia para la clase
Registrar de nuevo las cuentas antiguas una vez. En una ventana privada, acceder con el mismo email y contraseña: el JSON conserva los datos aunque se borren las cookies. Cambiar el avatar y comprobarlo desde otro navegador. Cerrar y abrir el servidor y volver a entrar. Mostrar el JSON solo con cuentas ficticias: contiene emails y hashes, no es un archivo público.

Para respaldar, detener el servidor y copiar museum404-datos. Para empezar de cero, respaldar y retirar usuarios.json con el servidor detenido; todas las cuentas de esa instalación se perderán y se recreará una lista vacía.

## Pendientes
Recepción real de correo, ajuste visual en móvil/escritorio, foto de autora y recursos personales. Si el enunciado exige expresamente mimatriz en sesión, explicar al profesor que esta versión amplía el almacenamiento a JSON y conservar la versión anterior en Git como referencia.
