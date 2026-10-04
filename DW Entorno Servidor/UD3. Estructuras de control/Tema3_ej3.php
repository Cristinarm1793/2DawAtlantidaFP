<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicios T3 PHP 3</title>
    <style>
        table {
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: center;
        }

        th {
            background-color: black;
            color: white;
        }
    </style>
</head>
<body>
    <?php
    $alumnos = [
        "Ana" => 3,
        "Carlos" => 5,
        "Pedro" => 6,
        "Carmen" => 7,
        "David" => 8,
        "Sergio" => 9,
        "Antonio" => 10
    ];

    echo "<table>";
    echo "<tr>";
    echo "<th>Alumno</th>";
    echo "<th>Nota</th>";
    echo "<th>Calificación</th>";
    echo "</tr>";

    foreach ($alumnos as $nombre => $nota) {
        if ($nota <= 4) {
            $calificacion = "Suspenso";
        } elseif ($nota == 5) {
            $calificacion = "Aprobado";
        } elseif ($nota == 6) {
            $calificacion = "Bien";
        } elseif ($nota <= 8 ) {
            $calificacion = "Notable";
        } elseif ($nota == 9) {
            $calificacion = "Sobresaliente";
        } else {
            $calificacion = "Matrícula de honor";
        }

        echo "<tr>";
        echo "<td>" . $nombre . "</td>";
        echo "<td>" . $nota . "</td>";
        echo "<td>" . $calificacion . "</td>";
        echo "</tr>";
    }

    echo "</table>";


    ?>


</body>
</html>