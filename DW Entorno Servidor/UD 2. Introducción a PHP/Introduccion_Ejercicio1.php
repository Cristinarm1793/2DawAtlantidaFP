<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicios PHP 1</title>
</head>
<body>
    <?php 
    /* Escribir una página en PHP que almacene dos valores que representen los
    kilómetros que ha recorrido un vehículo y el combustible que consumió el
    vehículo en ese recorrido. La página deberá mostrar ambos datos, así como
    el consumo medio por kilómetro */
    
    $kilometros = 500;
    $combustible = 40;
    $consumo_medio = $combustible / $kilometros;

    echo "kilometros recorridos: " . $kilometros . "<br>";
    echo "combustible consumido: " . $combustible . "<br>";
    echo "consumo medio: " . $consumo_medio . "<br>";
    ?>
</body>
</html>