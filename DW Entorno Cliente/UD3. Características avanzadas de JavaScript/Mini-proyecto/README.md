# 📚 Proyecto: Sistema de Gestión con JavaScript

## 🎯 Objetivo General

Desarrollar una aplicación web interactiva que gestione un catálogo de elementos (productos, películas, libros, videojuegos, etc.) utilizando JavaScript, módulos ES6 y métodos avanzados de arrays y objetos.

## 📋 Descripción del Proyecto

Crearás un sistema completo de gestión que permitirá visualizar, filtrar, ordenar, buscar y analizar información de un catálogo personalizado. La aplicación debe demostrar el dominio de conceptos fundamentales de JavaScript y manipulación del DOM.

## 🎨 Temática (Elige UNA)

Selecciona una de las siguientes temáticas para tu catálogo:

1. **🎮 Videojuegos** (indie, AAA, retro, etc.)
2. **🎬 Películas o Series** (cualquier género)
3. **📚 Libros** (novelas, cómics, técnicos, etc.)
4. **🎵 Música** (álbumes, artistas, canciones)
5. **🍕 Restaurantes o Recetas** 
6. **✈️ Destinos Turísticos**
7. **🚗 Vehículos** (coches, motos, etc.)
8. **👟 Productos Deportivos**
9. **🎨 Obras de Arte**
10. **💻 Productos Tecnológicos**

O propón tu propia temática.

## 📊 Estructura de Datos

Cada elemento de tu catálogo debe ser un **objeto** con AL MENOS 5 propiedades:

```javascript
{
    id: "único_identificador",
    nombre: "Nombre del elemento",
    categoria: "Categoría o género",
    precio: 0.00,  // o valoración numérica
    puntuacion: 0.0  // rating de 0-10
}
```

**Requisitos de datos:**
- Mínimo **10 elementos** en tu catálogo
- Datos coherentes y realistas
- Al menos **3 categorías diferentes**
- Variedad en precios y puntuaciones

## 🗂️ Estructura de Archivos

```
nombre-proyecto/
│
├── index.html
├── README.md
├── styles/
│   └── styles.css
└── js/
    ├── app.js          (archivo principal)
    ├── datos.js        (array de objetos)
    └── funciones.js    (funciones exportadas)
```

## 💻 Requisitos Técnicos

### 1. HTML (index.html)
- Estructura HTML5 válida
- Título descriptivo del proyecto
- Vinculación correcta de CSS
- Carga de módulos JavaScript con `type="module"`
- Un contenedor principal con ID

### 2. JavaScript - Módulos ES6

#### **datos.js** ✅
Debe contener:
- Array exportado con mínimo 10 objetos
- Cada objeto con mínimo 5 propiedades
- Uso de `export` para hacer disponible el array

#### **funciones.js** ✅
Debe incluir AL MENOS las siguientes funciones exportadas:

**Obligatorias (todas deben implementarse):**

1. **Visualización:**
   - `mostrarCatalogoHTML(array)` - Usa `map()` para generar HTML

2. **Ordenamiento:**
   - `ordenarPorPuntuacion(array)` - Usa `sort()` (mayor a menor)
   - `ordenarPorPrecio(array)` - Usa `sort()` (menor a mayor)

3. **Verificación:**
   - `existeCategoria(array, categoria)` - Usa `some()`
   - `todosCumplenPrecioMinimo(array, precio)` - Usa `every()`

4. **Filtrado:**
   - `filtrarPorCategoria(array, categoria)` - Usa `filter()`
   - `filtrarPorPuntuacionMinima(array, puntuacion)` - Usa `filter()`

5. **Búsqueda:**
   - `buscarPorId(array, id)` - Usa `find()`
   - `buscarPorNombre(array, nombre)` - Usa `find()`
   - `obtenerIndicePorId(array, id)` - Usa `findIndex()`

6. **Cálculos:**
   - `calcularPrecioPromedio(array)` - Usa `forEach()`
   - `calcularPuntuacionPromedio(array)` - Usa `forEach()`

7. **Manipulación de Objetos:**
   - `obtenerPropiedades(objeto)` - Usa `Object.keys()`
   - `objetoAEntradas(objeto)` - Usa `Object.entries()`
   - `crearObjetoDesdeEntradas(entradas)` - Usa `Object.fromEntries()`

**Importante:** 
- Todas las funciones deben ser **puras** (no modificar el array original)
- Usar **spread operator** `[...array]` cuando sea necesario
- Incluir comentarios JSDoc explicando cada función

#### **app.js** ✅
Debe contener:
- Import de datos y funciones
- Event listener para `DOMContentLoaded`
- Manipulación del DOM creando elementos dinámicamente
- Uso de TODAS las funciones creadas en funciones.js
- Creación de secciones visuales para cada funcionalidad

### 3. CSS (styles.css)

Requisitos mínimos:
- **Diseño responsive** (móvil y escritorio)
- Sistema de **tarjetas (cards)** para mostrar elementos
- **Gradientes** o colores atractivos
- **Hover effects** en elementos interactivos
- Separadores visuales entre secciones
- Tipografía legible y jerarquía clara
- **Bonus:** Animaciones o transiciones

## 📱 Secciones que debe tener tu aplicación

Tu interfaz debe mostrar las siguientes secciones (en orden):

### 1. **Encabezado** 
- Título del proyecto
- Descripción breve

### 2. **Catálogo Completo**
- Lista de todos los elementos
- Información completa de cada uno

### 3. **Estadísticas Generales**
- Precio promedio
- Puntuación promedio
- Total de elementos

### 4. **Top 5 Mejor Valorados**
- Los 5 elementos con mejor puntuación
- Ordenados de mayor a menor
- Con medallas o iconos: 🥇 🥈 🥉

### 5. **Verificaciones**
- ¿Existe la categoría X? (elegir 2 categorías para verificar)
- ¿Todos los elementos cuestan más de X€?
- ¿Todos los elementos cuestan más de Y€?

### 6. **Filtro por Categoría**
- Mostrar elementos de UNA categoría específica
- Indicar cuántos elementos se encontraron

### 7. **Elementos Premium**
- Filtrar elementos con puntuación >= 9.0
- Mostrar como sección destacada

### 8. **Sistema de Búsqueda**
- Buscar por ID y mostrar resultado
- Buscar por nombre y mostrar resultado
- Mostrar posición en el catálogo

### 9. **Análisis de Propiedades**
- Mostrar propiedades del primer elemento (Object.keys)
- Convertir elemento a entradas (Object.entries)
- Crear nuevo elemento desde entradas (Object.fromEntries)

### 10. **Top 5 Más Económicos**
- Los 5 elementos más baratos
- Ordenados de menor a mayor precio

### 11. **Footer**
- Créditos
- Año actual
- Tecnologías utilizadas

## ✅ Lista de Verificación

Antes de entregar, asegúrate de que tu proyecto cumple con:

**Estructura:**
- [ ] 4 archivos correctamente organizados
- [ ] Nombres de archivo correctos
- [ ] Módulos ES6 funcionando correctamente

**JavaScript:**
- [ ] Array con mínimo 10 objetos
- [ ] Todas las funciones obligatorias implementadas
- [ ] Uso correcto de: map, filter, find, findIndex, sort, forEach, some, every
- [ ] Uso de Object.keys, Object.entries, Object.fromEntries
- [ ] Código comentado y limpio
- [ ] Sin errores en la consola

**HTML/CSS:**
- [ ] HTML5 válido
- [ ] Diseño atractivo y profesional
- [ ] Responsive (se ve bien en móvil)
- [ ] Todas las secciones visibles

**Funcionalidad:**
- [ ] Todas las secciones funcionan correctamente
- [ ] Los cálculos son precisos
- [ ] Las búsquedas funcionan
- [ ] Los filtros muestran resultados correctos

**Documentación:**
- [ ] README.md completo
- [ ] Instrucciones de instalación
- [ ] Descripción del proyecto

## 📦 Entregables

Debes entregar:

1. **Carpeta comprimida (.zip)** con todos los archivos
2. **README.md** con:
   - Descripción del proyecto
   - Temática elegida
   - Instrucciones de instalación
   - Capturas de pantalla (opcional pero recomendado)
3. **Código limpio y comentado**

**Nombre del archivo:** `Apellido_Nombre_ProyectoJS.zip`

## 🎯 Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| **Estructura y organización** | 10% |
| **Implementación de funciones obligatorias** | 40% |
| **Manipulación del DOM** | 20% |
| **Diseño y CSS** | 15% |
| **Creatividad y originalidad** | 10% |
| **README y documentación** | 5% |
| **TOTAL** | 100% |
