'use strict';

const contenedor = document.getElementById("contenedor-discos");
tienda.forEach(disco => {
    const ficha = document.createElement("div");
    
    ficha.classList.add("ficha");
    
    ficha.innerHTML = `
        <img class="caratula" src="${disco.caratula}" alt="${disco.titulo}">
        <div class="informacion">
            <h2>${disco.titulo}</h2>
            <p>Artista: ${disco.artista}</p>
            <p>Pais: <span class="pais">${disco.pais}</span></p>
            <p>Año: ${disco.publicacion}</p>
            <p>Copias vendidas: ${disco.copias}</p>
            <p class="precio">${disco.precio.toFixed(2)} €</p>
        </div>
    `;

    const imagen = ficha.querySelector("img");

    imagen.onerror = function () {
        this.onerror = null;
        this.src = "sin-caratula.png";
        this.style.opacity = "0.5";
    };

    contenedor.appendChild(ficha);
});