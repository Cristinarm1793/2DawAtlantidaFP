# No debiste entrar — Historia y reglas actuales

Este documento describe lo que aparece en el código, sin convertir ideas nuevas en hechos ya implementados. Contiene spoilers.

## Premisa
El coche se detiene en una carretera. El protagonista encuentra una linterna en la guantera y se acerca a una casa. Al entrar, la puerta se bloquea. Una figura patrulla las habitaciones y el jugador debe explorar, esconderse y reunir objetos para escapar.

## Pistas existentes
- Periódico, recibidor: edición del 4 de noviembre de 1986; noticia recortada y hora 23:47 rodeada.
- Diario, dormitorio principal: entrada del 3 de noviembre, teléfono que suena y cable guardado en un cajón.
- Fotografía familiar, salón: Elena, Julián y Clara Velasco; patio, 12 de junio de 1978; cuarta silla vacía.
- Fotografía del protagonista, salón: Álex en el porche, 4 de noviembre de 1986.
- Cinta 1, dormitorio secundario; cinta 2, salón junto al teléfono; cinta 3, cobertizo.

Los archivos casete 1.mp3, casete 2.mp3 y casete 3.mp3 están referenciados en assets/audio/juego. Esta revisión no transcribe ni verifica su contenido sonoro. La explicación definitiva del ente, parentescos y desenlace narrativo queda a decisión de la autora.

## Objetos y ubicación
| Objeto | Lugar y búsqueda |
|---|---|
| Linterna | Coche, guantera. |
| Llave del sótano | Salón, escritorio. |
| Llave pequeña | Cocina, cajón. |
| Pilas | Cocina, alacena. |
| Botiquín | Baño, cajón del espejo. |
| Ganzúa | Dormitorio principal, mesilla. |
| Llave robusta | Dormitorio secundario, cajón del armario. |
| Palanca | Cobertizo, bajo el banco. |
| Destornillador | Sótano, estanterías. |
| Fusible | Sala eléctrica, caja de repuestos. |

## Finales y requisitos
Puerta principal: Ganzúa + Destornillador. Verja: Fusible utilizado para desconectar electricidad + Llave robusta. Ventana del sótano: Palanca + Llave pequeña. Las tres salidas reutilizan sus imágenes en assets/img/juego/salidas. Agotar las dos vidas produce Game Over; el botiquín recupera automáticamente una vida cuando procede.

## Integración narrativa
documentosCasa en js/juego.js contiene los documentos. Sus textos no son objetos necesarios para escapar. mapa contiene las descripciones al llegar a cada sala. Las acciones especiales y los textos de final se encuentran en mostrarAccionesEspeciales y terminarPartida. Para ampliar sin romper el juego, seguir 06-mantenimiento.md.
