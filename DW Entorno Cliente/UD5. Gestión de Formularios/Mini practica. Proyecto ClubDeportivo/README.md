# Club Deportivo - Formularios fiables

Desarrollo Web en Entorno Cliente  
2.º DAW - Curso 2026/2027  
Unidad 5A y 5B

## 1. Descripción

El proyecto consiste en una aplicación web para la gestión simulada de un club deportivo.

La aplicación dispone de cinco formularios accesibles desde un menú principal:

- Socios.
- Servicios.
- Testimonios.
- Noticias.
- Citas.

El objetivo es aplicar los conocimientos de formularios, eventos, validación y expresiones regulares mediante HTML, CSS y JavaScript.

## 2. Organización del proyecto

```text
ClubDeportivo/
├── parte1/
│   ├── index.html
│   ├── estilos.css
│   ├── app.js
│   ├── pruebas.md
│   └── errores-socios.png
├── parte2/
│   ├── index.html
│   ├── estilos.css
│   ├── app.js
│   ├── validaciones.js
│   ├── pruebas.js
│   └── pruebas.md
└── README.md
```

## 3. Ejecución

Para utilizar la aplicación:

1. Abrir la carpeta del proyecto con Visual Studio Code.
2. Acceder a la carpeta parte1 o parte2.
3. Abrir index.html con Live Server.
4. Seleccionar un formulario desde el menú principal.

No es necesario instalar una base de datos ni configurar un servidor PHP.

Los iconos utilizan Font Awesome mediante una hoja de estilos externa.

## 4. Parte 1 - Formularios y validación

En la primera parte se han implementado los cinco formularios y sus validaciones mediante HTML y JavaScript.

Se comprueban:

- Campos obligatorios.
- Longitudes mínimas y máximas.
- Valores numéricos y rangos.
- Coincidencia de contraseñas.
- Tipo y tamaño de imágenes.
- Fechas futuras.
- Selecciones y casillas obligatorias.

Los errores se muestran junto a los campos correspondientes y se actualizan al corregir los datos después del primer intento de envío.

## 5. Parte 2 - Expresiones regulares

En la segunda parte se mantienen las validaciones anteriores y se incorporan nuevas reglas de formato.

También se añade la normalización del nombre, la extracción de números de los testimonios, la separación de etiquetas de noticias y una demostración independiente de validación mediante pattern.

Las funciones de validación se encuentran en validaciones.js.

## 6. Explicación de las expresiones regulares

### Nombre completo

`/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+( [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/`

Permite letras ASCII, vocales acentuadas, ü y ñ, tanto mayúsculas como minúsculas.

El símbolo `+` exige una o más letras. El grupo seguido de `*` permite añadir más palabras separadas por un espacio.

La longitud de 4 a 50 caracteres se comprueba mediante JavaScript.

### Usuario

`/^[a-zA-Z][a-zA-Z0-9]{4,19}$/`

El primer carácter debe ser una letra ASCII. Los siguientes 4 a 19 caracteres pueden ser letras o números.

La longitud total es de 5 a 20 caracteres.

### Contraseña

`/^[a-zA-Z][a-zA-Z0-9_]{7,15}$/`

Debe comenzar por una letra ASCII. El resto puede contener letras, números y guion bajo.

La longitud total es de 8 a 16 caracteres. No se normaliza la contraseña.

### Teléfono

`/^\+34 [6-9][0-9]{2} [0-9]{3} [0-9]{3}$/`

El prefijo +34 es obligatorio. La barra invertida permite interpretar el símbolo + de forma literal.

La primera cifra nacional debe estar entre 6 y 9. Después se completan los tres grupos de tres cifras separados por espacios.

### Código de servicio

`/^DEP-[0-9]{3}$/`

Debe comenzar por DEP- y terminar con exactamente tres cifras.

### Referencia de cita

`/^(CITA|RES)-[0-9]{4}$/`

Permite los prefijos CITA- o RES-, seguidos de exactamente cuatro cifras.

Los paréntesis agrupan las dos alternativas.

### Normalización de espacios

`/ +/g`

Busca uno o más espacios consecutivos y permite sustituirlos por un único espacio mediante replace().

### Extracción de números

`/[0-9]+/g`

Busca todas las secuencias de una o más cifras mediante match().

### Separación de etiquetas

`/,/`

Permite separar las etiquetas de las noticias mediante split(). Después se eliminan los espacios exteriores y las etiquetas vacías.

## 7. Anclas y banderas

Las anclas `^` y `$` permiten comprobar el texto completo y evitar coincidencias parciales.

La bandera `g` se utiliza para buscar todas las coincidencias durante la extracción de números y la normalización de espacios.

No se utiliza `g` en los validadores con test(), ya que podría modificar el estado de la expresión regular entre comprobaciones.

Tampoco se utiliza la bandera `i`, porque las reglas de los códigos y referencias distinguen entre mayúsculas y minúsculas.

## 8. Validación mediante pattern

Se ha añadido un formulario independiente que utiliza required y pattern para comprobar el código de servicio.

Pattern comprueba el formato, pero no sustituye a required, ya que un campo vacío puede ser válido si no es obligatorio.

Tampoco permite resolver por sí solo otras reglas, como el tamaño de los archivos, la edad o las fechas futuras.

## 9. Formato y significado

Una expresión regular permite comprobar si un dato cumple un formato determinado, pero no garantiza que ese dato exista o sea real.

Por ejemplo, un teléfono puede cumplir el formato establecido sin pertenecer a ningún usuario. Lo mismo ocurre con los códigos de servicio y las referencias de citas.

## 10. Pruebas

Las pruebas manuales se encuentran documentadas en el archivo pruebas.md de cada parte.

En la Parte 2 también se incluye pruebas.js, que permite comprobar automáticamente las funciones de validación.

Para consultar los resultados se abre la aplicación y se accede a la consola del navegador mediante F12.

## 11. Seguridad y limitaciones

La aplicación funciona únicamente en el entorno cliente. No utiliza PHP, bases de datos ni almacenamiento de información.

Todas las operaciones son simuladas.

En una aplicación real, el servidor tendría que volver a validar los datos recibidos, comprobar los permisos, verificar las fechas y revisar el contenido, tipo y tamaño de los archivos.

La validación del cliente no garantiza por sí sola la seguridad de una aplicación.

Todos los datos utilizados durante las pruebas son ficticios.