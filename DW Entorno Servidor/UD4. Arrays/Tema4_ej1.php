<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estiloTabla.css">
    <title>Document</title>
</head>
<body>
    <?php 
    $ciudades = [
        "Granada" => 150000,
        "Madrid" => 3000000,
        "Barcelona" => 2879200,
        "Málaga" => 240000,
        "Sevilla" => 500000,
        "Valencia" => 1584600,
        "Tarragona" => 485210
    ];

    echo "<h2>Ciudades y población</h2>";
    echo "<table>";
    echo "<tr>";
    echo "<th>Ciudad</th>";
    echo "<th>Población</th>";
    echo "</tr>";

    foreach ($ciudades as $ciudad => $poblacion) {
        echo "<tr>";
        echo "<td>" . $ciudad . "</td>";
        echo "<td>" . $poblacion . "</td>";
        echo "</tr>";
    }

    echo "</table>";


    ksort($ciudades);

    echo "<h2>Orden alfabético</h2>";
    echo "<table>";
    echo "<tr>";
    echo "<th>Ciudad</th>";
    echo "<th>Población</th>";
    echo "</tr>";

    foreach ($ciudades as $ciudad => $poblacion) {
        echo "<tr>";
        echo "<td>" . $ciudad . "</td>";
        echo "<td>" . $poblacion . "</td>";
        echo "</tr>";
    }
    
    echo "</table>";

    arsort($ciudades, SORT_NUMERIC);

    echo "<h2>Orden población</h2>";
    echo "<table>";
    echo "<tr>";
    echo "<th>Ciudad</th>";
    echo "<th>Población</th>";
    echo "</tr>";

    foreach ($ciudades as $ciudad => $poblacion) {
        echo "<tr>";
        echo "<td>" . $ciudad . "</td>";
        echo "<td>" . $poblacion . "</td>";
        echo "</tr>";
    }
    
    echo "</table>";

    $menorPoblacion = min($ciudades);
    $mayorPoblacion = max($ciudades);

    $ciudadMenor = array_search( $menorPoblacion, $ciudades);
    $ciudadMayor = array_search( $mayorPoblacion, $ciudades);

    echo "<p>Ciudad con menos población: " . $ciudadMenor . " (" . $menorPoblacion . ")<p>";
    echo "<p>Ciudad con más población: " . $ciudadMayor . " (" . $mayorPoblacion . ")<p>";

    ?>
</body>
</html>