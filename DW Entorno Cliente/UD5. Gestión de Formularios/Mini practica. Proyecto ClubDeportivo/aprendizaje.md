# Aprendizajes - Club Deportivo

## 1. Validación de formularios

He aprendido a combinar las restricciones de HTML con las validaciones de JavaScript.

- `required`: establece que un campo es obligatorio.
- `novalidate`: permite controlar la validación desde JavaScript.
- `validity`: permite consultar los errores de validación.
- `setCustomValidity()`: establece un mensaje de error personalizado.
- `preventDefault()`: evita el envío real del formulario.
- `valueAsNumber`: obtiene el valor numérico de un campo.
- `FormData`: permite recoger los datos de un formulario.

## 2. Eventos

He utilizado diferentes eventos según las necesidades de cada formulario.

- `submit`: comprueba los datos al enviar el formulario.
- `input`: detecta modificaciones mientras se escribe.
- `change`: detecta cambios en los campos.
- `click`: ejecuta acciones al pulsar un botón.

## 3. Accesibilidad

- `aria-describedby`: relaciona un campo con su mensaje de error.
- `aria-invalid`: indica si un campo contiene un error.
- `aria-hidden`: permite ocultar elementos decorativos a los lectores de pantalla.
- `role="status"`: permite comunicar mensajes de estado.
- `focus()`: sitúa el foco en un elemento.

## 4. Navegación entre formularios

He aprendido a mostrar y ocultar secciones sin tener que crear una página HTML diferente para cada formulario.

Para ello he utilizado:

- `hidden`: muestra u oculta elementos.
- `data-seccion`: identifica la sección asociada a cada botón.
- `dataset`: permite acceder a los atributos data.
- `querySelectorAll()`: selecciona varios elementos del documento.

## 5. Font Awesome

He incorporado la biblioteca Font Awesome para añadir iconos al menú principal.

He aprendido a utilizar una hoja de estilos externa y a seleccionar iconos mediante clases CSS.

Los iconos son decorativos y no intervienen en la validación de los formularios.

## 6. Expresiones regulares

He aprendido a comprobar el formato completo de una cadena mediante expresiones regulares.

| Elemento | Función |
|---|---|
| `^` | Inicio de la cadena |
| `$` | Final de la cadena |
| `[a-zA-Z]` | Letras ASCII |
| `[0-9]` | Cifras |
| `{3}` | Exactamente tres repeticiones |
| `{4,19}` | Entre cuatro y diecinueve repeticiones |
| `+` | Una o más repeticiones |
| `*` | Cero o más repeticiones |
| `\|` | Alternativas |
| `g` | Búsqueda global |

## 7. Tratamiento de cadenas

### test()

Comprueba si una cadena cumple una expresión regular y devuelve true o false.

### match()

Extrae las coincidencias de una expresión regular. Si no encuentra ninguna, devuelve null.

### replace()

Permite sustituir partes de una cadena. Se ha utilizado para reducir los espacios repetidos del nombre del socio.

### split()

Divide una cadena en un array. Se ha utilizado para separar las etiquetas de las noticias.

### trim()

Elimina los espacios exteriores de una cadena. No se utiliza para modificar las contraseñas.

### map()

Recorre un array y devuelve otro array con los elementos modificados.

### filter()

Devuelve un array con los elementos que cumplen una condición.

### join()

Une los elementos de un array utilizando un separador.

### JSON.stringify()

Convierte un valor JavaScript en una representación de texto. Se ha utilizado para mostrar el array de números extraídos del testimonio.

## 8. Pruebas automatizadas

He aprendido a crear funciones independientes del DOM para poder comprobarlas sin rellenar los formularios.

También he utilizado:

- `console.log()` para mostrar resultados correctos.
- `console.error()` para mostrar pruebas fallidas.
- `repeat()` para generar cadenas de una longitud determinada.
- Bucles para repetir las comprobaciones.

## 9. Organización del código

He separado las funciones de validación del código encargado de gestionar los formularios.

Esto permite reutilizar las mismas funciones tanto en la aplicación como en las pruebas automatizadas.

## 10. Seguridad

La validación en JavaScript ayuda al usuario a introducir correctamente los datos, pero no sustituye la validación del servidor.

En una aplicación real sería necesario volver a comprobar todos los datos recibidos, incluidos los archivos.