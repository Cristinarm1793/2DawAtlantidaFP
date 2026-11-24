# Pruebas del Club Deportivo - Parte 2

## 1. Ejecución de las pruebas

Para comprobar el funcionamiento de la aplicación se abre `index.html` con Live Server.

Las pruebas automatizadas se encuentran en `pruebas.js` y sus resultados se pueden consultar en la consola del navegador pulsando F12.

## 2. Pruebas automatizadas

Las funciones de validación se han comprobado de forma independiente antes de probar los formularios.

### Nombre del socio

| Entrada | Esperado | Obtenido |
|---|---|---|
| ` Ana López ` | Válido y normalizado | Correcto |
| `Ana    López` | Válido y normalizado | Correcto |
| Ana2 López | Inválido | Correcto |
| Vacío | Inválido | Correcto |
| 3 caracteres | Inválido | Correcto |
| 4 caracteres | Válido | Correcto |
| 50 caracteres | Válido | Correcto |
| 51 caracteres | Inválido | Correcto |

### Usuario

| Entrada | Esperado | Obtenido |
|---|---|---|
| ana77 | Válido | Correcto |
| 7ana7 | Inválido | Correcto |
| ana_7 | Inválido | Correcto |
| Vacío | Inválido | Correcto |
| 4 caracteres | Inválido | Correcto |
| 5 caracteres | Válido | Correcto |
| 20 caracteres | Válido | Correcto |
| 21 caracteres | Inválido | Correcto |

### Contraseña

| Entrada | Esperado | Obtenido |
|---|---|---|
| Clave_12 | Válido | Correcto |
| 1Clave_2 | Inválido | Correcto |
| Clave-12 | Inválido | Correcto |
| Contraseña con espacios | Inválido | Correcto |
| Vacío | Inválido | Correcto |
| 7 caracteres | Inválido | Correcto |
| 8 caracteres | Válido | Correcto |
| 16 caracteres | Válido | Correcto |
| 17 caracteres | Inválido | Correcto |

Las pruebas de usuario y contraseña se han ejecutado dos veces para comprobar que los resultados no cambian.

### Teléfono

| Entrada | Esperado | Obtenido |
|---|---|---|
| +34 612 345 678 | Válido | Correcto |
| Teléfono con espacios exteriores | Válido | Correcto |
| 34 612 345 678 | Inválido | Correcto |
| +34612345678 | Inválido | Correcto |
| +34 512 345 678 | Inválido | Correcto |
| +34 612 345 6789 | Inválido | Correcto |
| Vacío | Inválido | Correcto |

### Código de servicio

| Entrada | Esperado | Obtenido |
|---|---|---|
| DEP-007 | Válido | Correcto |
| dep-007 | Inválido | Correcto |
| DEP-07 | Inválido | Correcto |
| XDEP-007 | Inválido | Correcto |
| Vacío | Inválido | Correcto |

### Referencia de cita

| Entrada | Esperado | Obtenido |
|---|---|---|
| CITA-0001 | Válido | Correcto |
| RES-0001 | Válido | Correcto |
| XCITA-0001 | Inválido | Correcto |
| RES-001 | Inválido | Correcto |
| Vacío | Inválido | Correcto |

## 3. Pruebas manuales

### Extracción de números

| Entrada | Esperado | Obtenido |
|---|---|---|
| Hay 12 clases y 3 pistas | ["12", "3"] | Correcto |
| Texto sin números | [] | Correcto |

### Etiquetas de noticias

| Entrada | Esperado | Obtenido |
|---|---|---|
| club, salud, , verano | Tres etiquetas | Correcto |
| Campo vacío | Sin etiquetas | Correcto |

### Validación mediante pattern

| Entrada | Esperado | Obtenido |
|---|---|---|
| Campo vacío | Error de obligatoriedad | Correcto |
| DEP-007 | Código válido | Correcto |
| XDEP-007 | Error de formato | Correcto |

La validación mediante JavaScript muestra mensajes personalizados, mientras que pattern utiliza los mensajes del navegador.

## 4. Integración con los formularios

Se han comprobado las nuevas reglas de formato y se han repetido las principales pruebas de la Parte 1 para verificar que las validaciones anteriores siguen funcionando.

| Prueba | Resultado esperado | Resultado obtenido |
|---|---|---|
| Formulario vacío | Mostrar errores | Correcto |
| Socio con edad de 17 años | Rechazar | Correcto |
| Correo incorrecto | Mostrar error | Correcto |
| Contraseñas diferentes | Mostrar error | Correcto |
| Sin imagen | Rechazar | Correcto |
| Imagen PNG de 781 bytes | Rechazar | Correcto |
| Imagen JPEG de 4.999.999 bytes | Aceptar | Correcto |
| Imagen JPEG de 5.000.000 bytes | Aceptar | Correcto |
| Imagen JPEG de 5.000.001 bytes | Rechazar | Correcto |
| Duración de 20 minutos | Rechazar | Correcto |
| Precio negativo | Rechazar | Correcto |
| Noticia con fecha de hoy | Rechazar | Correcto |
| Cita con fecha pasada | Rechazar | Correcto |
| Condiciones sin marcar | Mostrar error | Correcto |
| Corregir un campo incorrecto | Eliminar el error | Correcto |
| Modificar datos después de un envío válido | Eliminar la confirmación anterior | Correcto |
| Enviar datos correctos | Mostrar confirmación simulada | Correcto |

El formato correcto de un campo no sustituye al resto de las validaciones del formulario.

