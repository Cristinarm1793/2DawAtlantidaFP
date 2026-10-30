'use strict';

/* ==========================================================
   RECETARIO DE BRUJA
   MUSEUM 404: NOT FOUND
========================================================== */


/* ==========================================================
   1. RECETAS
========================================================== */

const recetas = [
    {
        nombre: "Dedos de bruja",
        imagen: "assets/img/recetario/dedos-bruja.jpg",

        ingredientes: [
            "250 g de harina",
            "125 g de mantequilla",
            "100 g de azúcar",
            "1 huevo",
            "1 cucharadita de esencia de vainilla",
            "Almendras enteras para las uñas",
            "Mermelada de fresa"
        ],

        pasos: [
            "Mezcla la mantequilla con el azúcar hasta obtener una crema.",
            "Añade el huevo y la esencia de vainilla.",
            "Incorpora la harina poco a poco hasta formar una masa.",
            "Refrigera la masa durante 30 minutos.",
            "Forma cilindros alargados que parezcan dedos.",
            "Coloca una almendra en la punta de cada dedo.",
            "Marca los nudillos con un cuchillo.",
            "Hornea a 180 °C durante 12-15 minutos, hasta que estén ligeramente dorados.",
            "Deja enfriar y añade un poco de mermelada alrededor de las uñas."
        ]
    },

    {
        nombre: "Ojos monstruosos",
        imagen: "assets/img/recetario/ojos-monstruosos.jpg",

        ingredientes: [
            "200 g de chocolate blanco",
            "100 g de queso crema",
            "150 g de galletas trituradas",
            "Lacasitos o caramelos redondos",
            "Chocolate negro para las pupilas",
            "Colorante alimentario rojo"
        ],

        pasos: [
            "Mezcla las galletas trituradas con el queso crema.",
            "Forma pequeñas bolas y refrigéralas durante 20 minutos.",
            "Derrite el chocolate blanco al baño maría.",
            "Cubre las bolas con el chocolate blanco.",
            "Coloca un caramelo redondo sobre cada bola para formar el iris.",
            "Añade una gota de chocolate negro para crear la pupila.",
            "Dibuja pequeñas venas con colorante alimentario rojo.",
            "Deja enfriar hasta que el chocolate se endurezca."
        ]
    },

    {
        nombre: "Pócima de frutos rojos",
        imagen: "assets/img/recetario/pocima.jpg",

        ingredientes: [
            "250 ml de zumo de frutos rojos",
            "250 ml de zumo de uva",
            "250 ml de agua con gas",
            "2 cucharadas de zumo de limón",
            "Frambuesas y arándanos",
            "Hielo"
        ],

        pasos: [
            "Enfría los zumos antes de comenzar.",
            "Mezcla el zumo de frutos rojos con el zumo de uva.",
            "Añade el zumo de limón.",
            "Incorpora el agua con gas justo antes de servir.",
            "Reparte el hielo entre los vasos.",
            "Sirve la mezcla y decora con frambuesas y arándanos."
        ]
    },

    {
        nombre: "Calabazas de hojaldre",
        imagen: "assets/img/recetario/calabazas-hojaldre.jpg",

        ingredientes: [
            "2 láminas de hojaldre",
            "150 g de puré de calabaza cocida",
            "2 cucharadas de azúcar moreno",
            "1 cucharadita de canela",
            "1 huevo para pintar",
            "Un poco de harina para trabajar la masa"
        ],

        pasos: [
            "Precalienta el horno a 190 °C.",
            "Mezcla el puré de calabaza con el azúcar y la canela.",
            "Extiende una lámina de hojaldre y corta figuras de calabaza.",
            "Coloca una pequeña cantidad de relleno en el centro.",
            "Corta otras figuras de hojaldre para utilizarlas como tapas.",
            "Haz pequeños cortes en las tapas para formar ojos y boca.",
            "Cubre las bases con las tapas y sella los bordes con un tenedor.",
            "Pinta con huevo batido.",
            "Hornea durante 15-20 minutos, hasta que el hojaldre esté dorado."
        ]
    }
];


/* ==========================================================
   2. ELEMENTOS HTML
========================================================== */

const portada = document.getElementById("portada");
const indice = document.getElementById("indice");
const paginaReceta = document.getElementById("pagina-receta");

const botonAbrir = document.getElementById("abrir-libro");

const navegacion = document.getElementById("navegacion-libro");

const botonAnterior = document.getElementById("pagina-anterior");
const botonSiguiente = document.getElementById("pagina-siguiente");

const numeroPagina = document.getElementById("numero-pagina");

const nombreReceta = document.getElementById("nombre-receta");
const fotoReceta = document.getElementById("foto-receta");

const listaIngredientes = document.getElementById("lista-ingredientes");
const listaPasos = document.getElementById("lista-pasos");


/* ==========================================================
   3. ESTADO DEL LIBRO

   0 = Portada
   1 = Índice
   2 = Primera receta
   3 = Segunda receta
   4 = Tercera receta
   5 = Cuarta receta
========================================================== */

let paginaActual = 0;


/* ==========================================================
   4. MOSTRAR UNA PÁGINA
========================================================== */

function mostrarPagina(numero) {

    if (numero < 0 || numero > recetas.length + 1) {
        return;
    }

    paginaActual = numero;

    // Ocultamos todas las páginas.
    portada.hidden = true;
    indice.hidden = true;
    paginaReceta.hidden = true;

    // Portada.
    if (paginaActual === 0) {
        portada.hidden = false;
        navegacion.hidden = true;
        return;
    }

    // A partir del índice mostramos las flechas.
    navegacion.hidden = false;

    // Índice.
    if (paginaActual === 1) {
        indice.hidden = false;
    } else {

        // Convertimos el número de página en índice del array.
        const posicionReceta = paginaActual - 2;

        mostrarReceta(posicionReceta);

        paginaReceta.hidden = false;
    }

    // Actualizamos los controles.
    botonAnterior.disabled = paginaActual === 0;
    botonSiguiente.disabled = paginaActual === recetas.length + 1;

    numeroPagina.textContent =
        `Página ${paginaActual} de ${recetas.length + 1}`;
}


/* ==========================================================
   5. MOSTRAR LOS DATOS DE UNA RECETA
========================================================== */

function mostrarReceta(posicion) {

    const receta = recetas[posicion];

    nombreReceta.textContent = receta.nombre;

    fotoReceta.src = receta.imagen;
    fotoReceta.alt = `Imagen de ${receta.nombre}`;

    // Limpiamos los ingredientes anteriores.
    listaIngredientes.innerHTML = "";

    receta.ingredientes.forEach(ingrediente => {

        const elemento = document.createElement("li");

        elemento.textContent = ingrediente;

        listaIngredientes.appendChild(elemento);
    });

    // Limpiamos los pasos anteriores.
    listaPasos.innerHTML = "";

    receta.pasos.forEach(paso => {

        const elemento = document.createElement("li");

        elemento.textContent = paso;

        listaPasos.appendChild(elemento);
    });
}


/* ==========================================================
   6. ABRIR EL LIBRO
========================================================== */

botonAbrir.addEventListener("click", function () {
    mostrarPagina(1);
});


/* ==========================================================
   7. SELECCIONAR UNA RECETA DESDE EL ÍNDICE
========================================================== */

const tarjetas = document.querySelectorAll(".tarjeta-receta");

tarjetas.forEach(tarjeta => {

    tarjeta.addEventListener("click", function () {

        const posicion = Number(tarjeta.dataset.receta);

        mostrarPagina(posicion + 2);
    });
});


/* ==========================================================
   8. PASAR PÁGINAS MANUALMENTE
========================================================== */

botonAnterior.addEventListener("click", function () {
    mostrarPagina(paginaActual - 1);
});

botonSiguiente.addEventListener("click", function () {
    mostrarPagina(paginaActual + 1);
});


/* ==========================================================
   9. ESTADO INICIAL
========================================================== */

mostrarPagina(0);