// 05 / Recoger y mostrar productos
/* Arrays, bucles y control de la entrada
1. Crea un array vacío y pide productos mediante prompt.
2. Añade cada nombre después de eliminar espacios de los extremos. Se permiten
repetidos.
3. Si la entrada queda vacía, muestra un aviso y vuelve a pedirla.
4. Al pulsar Cancelar, finaliza la recogida.
5. Muestra por consola la lista completa y el número de productos. Si no hay ninguno,
indica «Lista vacía».

Comprueba tu resultado
Entradas: «pan», «leche», «pan» y Cancelar.
Lista final: pan, leche, pan. Número de productos: 3.
Cancelar en la primera pregunta → «Lista vacía». */

const productos = [];

while (true) {
    const productoIntroducido = prompt("Introduce un producto:");
    if (productoIntroducido === null) {
        break;
    }

    const producto = productoIntroducido.trim();

    if (producto === "") {
        console.log("Error, el producto no puede estar vacía");
        continue;
    }

    producto.push(producto);
}

if (productos.length === 0) {
    console.log("Lista vacia");
} else {
    console.log(`Lista final: ${productos.join(", ")}`);
    console.log(`Numero de productos: ${productos.length}`);
}