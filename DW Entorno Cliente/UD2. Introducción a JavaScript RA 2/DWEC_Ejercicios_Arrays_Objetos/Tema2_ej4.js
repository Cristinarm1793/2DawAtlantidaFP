// 04 / Antigüedad de un coche
/* Objetos, métodos y Date
Crea un objeto coche con marca «Toyota», modelo «Yaris» y año 2020.
1. Añade un método calcularAntiguedad().
2. Obtén el año actual con Date y calcula la diferencia respecto al año del coche.
3. Si el año del coche no es entero, es menor que 1886 o está en el futuro, devuelve null. Si
es válido, devuelve la antigüedad.
4. Fuera del método, muestra el resultado o un mensaje de año no válido.

Comprueba tu resultado
Si el año actual es 2026, un coche de 2020 tiene 6 años.
Prueba también el año actual y el año actual + 1.
Se calcula una aproximación por años, sin meses ni días. */

const coche = {
    marca: "Toyota", 
    modelo: "Yaris", 
    año: 2020, 
    calcularAntiguedad() {
        const añoActual = new Date().getFullYear();

        if (!Number.isInteger(this.año) || this.año < 1886 || this.año > añoActual){
            return null;
        }
        return añoActual - this.año;
     }
    };

    const antiguedad = coche.calcularAntiguedad();

    if (antiguedad === null) {
        console.log("Año no valido");
    } else {
        console.log(`El coche tiene ${antiguedad} años`);
    }