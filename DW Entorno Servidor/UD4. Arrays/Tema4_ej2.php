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
    $alumnos = [
        "Antonio" => [
            "Matemáticas" => 10,
            "Lengua" => 9,
            "Ciencias Naturales" => 7,
            "Geografía" => 8
        ],
        "Sergio" => [
            "Matemáticas" => 7,
            "Lengua" => 6,
            "Ciencias Naturales" => 7,
            "Geografía" => 6.80
        ],
        "Carla" => [
            "Matemáticas" => 5,
            "Lengua" => 8,
            "Ciencias Naturales" => 7,
            "Geografía" => 6
        ],
        "Lara" => [
            "Matemáticas" => 3,
            "Lengua" => 7.30,
            "Ciencias Naturales" => 6,
            "Geografía" => 5
        ],
        "Juan" => [
            "Matemáticas" => 4.5,
            "Lengua" => 8,
            "Ciencias Naturales" => 6,
            "Geografía" => 6
        ]
    ];

    echo "<h2>Nota alumnado</h2>";
    echo "<table>";
    echo "<tr>";
    echo "<th>Alumno</th>";
    echo "<th>Matemáticas</th>";
    echo "<th>Lengua</th>";
    echo "<th>Ciencias Naturales</th>";
    echo "<th>Geografía</th>";
    echo "<th>Media</th>";
    echo "</tr>";

    foreach ($alumnos as $nombre => $notas) {
        $media = round((
            $notas["Matemáticas"] + 
            $notas["Lengua"] +
            $notas["Ciencias Naturales"] +
            $notas["Geografía"] 
        ) / 4, 2);
        
        echo "<tr>";
        echo "<td>" . $nombre . "</td>";
        echo "<td>" . $notas["Matemáticas"] . "</td>";
        echo "<td>" . $notas["Lengua"] . "</td>";
        echo "<td>" . $notas["Ciencias Naturales"] . "</td>";
        echo "<td>" . $notas["Geografía"] . "</td>";
        echo "<td>" . $media . "</td>";
        echo "</tr>";
    }

    echo "</table>";

    $alumnoBuscado = "Antonio";
    echo "<h2>Nota de " .$alumnoBuscado . "</h2>";
    echo "<table>";
    echo "<tr>";
    echo "<th>Matemáticas</th>";
    echo "<th>Lengua</th>";
    echo "<th>Ciencias Naturales</th>";
    echo "<th>Geografía</th>";
    echo "</tr>";

    echo "<tr>";
    echo "<td>" . $alumnos[$alumnoBuscado]["Matemáticas"] . "</td>";
    echo "<td>" . $alumnos[$alumnoBuscado]["Lengua"] . "</td>";
    echo "<td>" . $alumnos[$alumnoBuscado]["Ciencias Naturales"] . "</td>";
    echo "<td>" . $alumnos[$alumnoBuscado]["Geografía"] . "</td>";
    echo "</tr>";

    echo "</table>";

    ?>
    
</body>
</html>