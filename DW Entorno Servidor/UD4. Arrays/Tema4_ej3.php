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

    $mascotas = [
        [
            "nombre" => "Pepe",
            "peso" => 4.5,
            "color" => "Marrón",
            "edad" => 12
        ],
        [
            "nombre" => "Sparky",
            "peso" => 3,
            "color" => "Blanco",
            "edad" => 2
        ],
        [
            "nombre" => "Tobby",
            "peso" => 7.2,
            "color" => "Beige",
            "edad" => 8
        ],
        [
            "nombre" => "Bigotes",
            "peso" => 4,
            "color" => "Negro",
            "edad" => 9
        ],
        [
            "nombre" => "Ricky",
            "peso" => 0.1,
            "color" => "Verde",
            "edad" => 2
        ]
    ];

    echo "<h2>Listado de mascotas</h2>";
    echo "<table>";

    echo "<tr>";
    echo "<th>Código</th>";
    echo "<th>Nombre</th>";
    echo "<th>Peso</th>";
    echo "<th>Color</th>";
    echo "<th>Edad</th>";
    echo "</tr>";

    foreach ($mascotas as $codigo => $mascota) {
        echo "<tr>";
        echo "<td>" . $codigo . "</td>";
        echo "<td>" . $mascota["nombre"] . "</td>";
        echo "<td>" . $mascota["peso"] . "</td>";
        echo "<td>" . $mascota["color"] . "</td>";
        echo "<td>" . $mascota["edad"] . "</td>";
        echo "</tr>";
    }
    echo "</table>";

    echo "<h2>Peso de la mascota con código 3</h2>";
    echo "<p>" . $mascotas[3]["peso"] . " kg</p>";

    foreach ($mascotas as $mascota) {
        if ($mascota["nombre"] == "Sparky") {
            echo "<h2>Color de Sparky</h2>";
            echo "<p>" . $mascota["color"] . "</p>";
        }
    }

    $mascotaMayor = $mascotas[0];

    foreach ($mascotas as $mascota) {
        if ($mascota["edad"] > $mascotaMayor["edad"]) {
            $mascotaMayor = $mascota;
        }
    }

    echo "<h2>Mascota más vieja</h2>";
    echo "<table>";

    echo "<tr>";
    echo "<th>Nombre</th>";
    echo "<th>Peso</th>";
    echo "<th>Color</th>";
    echo "<th>Edad</th>";
    echo "</tr>";

    echo "<tr>";
    echo "<td>" . $mascotaMayor["nombre"] . "</td>";
    echo "<td>" . $mascotaMayor["peso"] . "</td>";
    echo "<td>" . $mascotaMayor["color"] . "</td>";
    echo "<td>" . $mascotaMayor["edad"] . "</td>";
    echo "</tr>";

    echo "</table>";

    ?>   
</body>
</html>