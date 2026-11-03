/* 09. Calcular una media · 1,25 puntos
Crea calcularMedia, que reciba un array de notas numéricas y devuelva su media. Usa reduce()
con acumulador inicial 0 para obtener la suma. Si el array está vacío, devuelve null. Realiza y
muestra las llamadas con el siguiente array y con un array vacío */

const notas = [6, 8, 4, 10];

const calcularMedia = (notasN) => {
    if (notasN.length === 0) {
        return;
    }

    const sumatoria = notasN.reduce((a, b) => {
        return a + b; }, 0);

    const media = sumatoria / notasN.length;

    return media;
};

console.log(calcularMedia(notas));