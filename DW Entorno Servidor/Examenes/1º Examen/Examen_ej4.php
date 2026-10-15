<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        /* 04. Contar aprobados y suspensos · 1 puntos
        Recorre el array y muestra cuántas notas son aprobados y cuántas son suspensos. Se aprueba con
        una nota mayor o igual que 5. Todas las notas están entre 0 y 10.
        $notas = [4, 7, 5, 3, 9, 6]; */

        $notas = [4, 7, 5, 3, 9, 6];

        foreach ($notas as $n) {
            if ($n < 0 || $n > 10){
                echo "error";
            } elseif ($n >= 5){
                echo "aprobado";
            } else {
                echo "no aprobado";
            };

            echo "Notas aprobadas: " . $n . "<br>";
        }
    ?>
</body>
</html>