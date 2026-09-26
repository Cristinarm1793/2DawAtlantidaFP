// 05 / Productos de una tienda
/*Objeto que contiene un array de objetos
Crea un objeto tienda con la propiedad productos. Su valor será un array con estos
objetos: Cuaderno, 4 €; Bolígrafo, 2 €; Mochila, 25 €. Cada producto tendrá nombre y
precio.
1. Añade un método calcularTotal() que recorra los productos y devuelva la suma de sus
precios.
2. Se cuenta una unidad por producto. Los precios ya son válidos.
3. Muestra el resultado con dos decimales. Comprueba también un array vacío.

Comprueba tu resultado
Total: 31,00 €. Con productos vacío: 0,00 €.
Si añades un Estuche de 6 €, el total debe pasar a 37,00 €.*/

const tienda = {
    productos: [
        {
            nombre: "Cuaderno",
            precio: 4
        },
        {
            nombre: "Boligrafo",
            precio: 2
        },
        {
            nombre: "Mochila",
            precio: 25
        },
    ],
    calcularTotal(){
        let total = 0;

        for (const producto of this.productos) {
            total = total + producto.precio;
        }
        return total;
    }
};

const totalTienda = tienda.calcularTotal();
console.log(`Total: ${totalTienda.toFixed(2)} €`);