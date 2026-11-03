/* 02. Aplicar un descuento · 0,75 puntos
Si el importe alcanza los 100 euros, aplica un descuento del 10 %. En caso contrario, no apliques
descuento. Calcula y muestra el importe final. El importe inicial será no negativo. */

const importe = 120;
let importeF;

if (importe >= 100) {
    importeF = importe - (importe * 10 / 100);
} else {
    importeF = importe;
}

console.log("Importe final: " + importeF);
