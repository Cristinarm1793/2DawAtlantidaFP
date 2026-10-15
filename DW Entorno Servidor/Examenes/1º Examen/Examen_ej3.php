<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        /* 03. Tabla de multiplicar · 0,75 puntos
        Muestra la tabla del número indicado, desde el multiplicador 1 hasta el 10, utilizando un bucle.
        Cada operación debe aparecer en una línea con el formato «7 x 1 = 7».
        $numero = 7; */

        $numero = 7;

        for ($i = 1; $i < 10; $i++) { 
           echo $numero . " x " . $i;
        }

    ?>
</body>
</html>