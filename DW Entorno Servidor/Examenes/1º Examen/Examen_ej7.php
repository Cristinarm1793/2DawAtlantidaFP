<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        /* 07. Sumar una matriz · 0,75 puntos
        Utiliza bucles anidados para recorrer la matriz y calcular la suma de todos sus elementos. Muestra
        un único total. No puedes utilizar array_sum().
        $matriz = [
        [2, 4, 6],
        [1, 3, 5]
        ]; */

        $matriz = [
            [2, 4, 6],
            [1, 3, 5]
        ];

        $suma = 0;

        foreach ($matriz as $m) {
            foreach ($m as $numero) {
                $suma += $numero;
            }
        }

        echo "Suma total: " . $suma;
    ?>


</body>
</html>