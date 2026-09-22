<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio 2</title>
</head>
<body>
    <?php
    /*Escribir una página en PHP que permita pasar de grados Fahrenheit a
    grados Celsius. La página tendrá una variable con los grados Fahrenheit que
    se quieren traducir y mostrará por pantalla un mensaje parecido a este:
    75 grados ºF corresponden a 23.8888889 ºC
    Nota: La fórmula para pasar de Fahrenheit a Celsius es: C=5*(F - 32)/9 */

    $Fahrenheit = 75;
    $Celsius = 5*($Fahrenheit - 32)/9;

    echo $Fahrenheit . " grados ºF corresponden a " . $Celsius . " ºC";
    ?>
</body>
</html>