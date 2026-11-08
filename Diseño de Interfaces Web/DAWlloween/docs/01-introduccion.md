# 1. Introducción

Museum 404: Not Found (DAWlloween) es una web temática de Halloween desarrollada por Cristina para segundo de Desarrollo de Aplicaciones Web. Presenta errores informáticos históricos como piezas de un museo encantado y combina información, recetas, una aventura de texto y formularios PHP.

## Objetivos
Aplicar estructura semántica HTML, diseño adaptable con CSS, eventos y manipulación del DOM con JavaScript, formularios y sesiones PHP y despliegue Apache. La ambientación aporta identidad; la navegación, la lectura y las acciones deben seguir siendo utilizables.

## Alcance implementado tras este parche
| Área | Comportamiento |
|---|---|
| Museo | Seis vitrinas, fichas informativas, anomalías y restablecimiento. |
| Recetario | Datos en JSON, portada, tarjeta navegable, índice completo y recetas. |
| Juego | Decisiones mediante botones, mapa, objetos, dos vidas, patrulla, escondites, documentos, tres cintas y tres salidas. |
| Sobre nosotros | Expediente modal desde el museo, folios interiores y susto del ente. Página conocenos.html como acceso independiente. |
| Perfil | Registro, acceso por correo, recuperación por pregunta y diez avatares. |
| Jack | Formulario con identidad de sesión, destinatario fijo y envío mediante mail(); requiere configurar transporte. |

No se implementa un intérprete de comandos escritos, ranking persistente, subida de fotos de usuario ni recuperación por email. Las cuentas se almacenan en $_SESSION['mimatriz'] conforme al alcance académico, no en una base de datos permanente. Una nueva sesión no comparte cuentas ni partida.

## Tecnologías y estructura
HTML5 para páginas; CSS para marcos, vitrinas y adaptación; JavaScript para eventos, fetch, diálogo y estado de juego; PHP para sesión, autenticación y correo; Apache/XAMPP para ejecución. Markdown y diagramas draw.io para documentación.

- Raíz: index.html, perfil.html, contacto.html, recetario.html, juego.html y recetas.json.
- css/: presentación de cada sección.
- js/: interacciones del museo, expediente, recetario, juego y formularios.
- php/: operaciones de cuentas, correo y guardado de partida.
- assets/: imágenes, fuentes y audios. Respetar nombres, espacios, acentos y mayúsculas.
- docs/: memoria, guías, diseño y evidencias.

Estado de entrega: implementación preparada; pruebas de integración, revisión visual final, SMTP y personalización indicados en 05-comprobacion.md. El proyecto no se considera validado para publicación permanente solo por aplicar el parche.
