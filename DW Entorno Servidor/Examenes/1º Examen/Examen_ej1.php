
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        /* 01. Clasificar un número · 0,5 puntos
        Escribe un programa que muestre si el número es positivo, negativo o cero. La variable contendrá
        un número entero.
        $numero = -8;
        */

        $numero = -8;

        if ($numero > 0 ) {
            echo "positivo";
        } elseif ($numero < 0 ) {
            echo "negativo";
        } elseif ($numero == 0 ) {
            echo "cero";
        } else {
            echo "error";
        }

    ?>
</body>
</html>
