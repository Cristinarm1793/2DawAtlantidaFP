<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        /* 05. Encontrar el mayor · 1 puntos
        Recorre el array y muestra su mayor número. No puedes utilizar max() ni ordenar el array. El array
        no estará vacío y puede contener únicamente números negativos.
        $numeros = [-8, -3, -12, -1, -6]; */

        $numeros = [-8, -3, -12, -1, -6];
        $numeroMayor = 0;

        foreach ($numeros as $n) {
            if ($n < $numeroMayor) {
                $numeroMayor = $n;
            }
        }

        echo "Numero mayor: " . $numeroMayor;
    ?>
</body>
</html>