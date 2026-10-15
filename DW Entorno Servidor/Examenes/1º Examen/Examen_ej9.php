<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        /*09. Función para calcular la media · 1,25 puntos
        Crea calcularMedia, que reciba un array no vacío de notas numéricas y devuelva su media. Calcula
        la suma mediante un bucle, sin array_sum(). Llama a la función con el siguiente array y muestra el
        resultado.
        $notas = [6, 8, 4, 10];*/

        $notas = [6, 8, 4, 10];

        function calcularMedia($notas) {
            $suma = 0;

            foreach ($notas as $nota) {
                $suma += $nota;
            }

            $media = $suma / count($notas);

            return $media;
        }

        echo "Media: " . calcularMedia($notas);
    ?>

</body>
</html>