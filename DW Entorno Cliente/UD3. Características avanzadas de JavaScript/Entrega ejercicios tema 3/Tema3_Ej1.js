//EJERCICIO 1
/* Partiendo del fichero datos.js que contiene una estructura de datos con información de los álbumes
de música que se venden en una tienda, programar las siguientes funcionalidades, importarlo en un
fichero de código JavaScript y programar las siguientes funcionalidades:
· A partir de una cadena de búsqueda filtra todos los discos que la incluyan en su título.
· Filtrar los discos por país (suponemos que lo ha introducido el usuario en un variable) y después
mostrarlos ordenados por copias vendidas
· Mostrar los datos del álbum más reciente.
· Obtener el título que menos copias ha vendido.
· Crear un array de países sin repetición que existen en la tienda de discos.
· Obtener la recaudación total organizada por países. */

import { tienda } from "./datos";

const busqueda = "the";
const discosFiltrados = tienda.filter(disco => 
    disco.titulo.toLowerCase().includes(busqueda.toLowerCase())
);

console.log("Discos por titulo: ");
console.log(discosFiltrados);

const paisBuscado = "USA";
const discosPais = tienda.filter(disco => 
    disco.pais === paisBuscado
);

console.log("Discos por pais: ");
console.log(discosPais);

const discosOrdenados = [...discosPais].sort((a, b) => 
    a.copias - b.copias
);

console.log("Discos por copia: ");
console.log(discosOrdenados);

const albumReciente = tienda.reduce((reciente, disco) =>
    if ()
);