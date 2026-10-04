<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicios T3 PHP 2</title>
    <style>
        table {
            border-collapse: collapse;
        }

        th {
            background-color: black;
            color: white;
            padding: 10px;
        }

        td {
            padding: 10px;
            color: white;
        }

        tr:nth-child(even) {
            background-color: #7f9e3b;
        }

        tr:nth-child(odd) {
            background-color: #a0c45b;
        }
    </style>
</head>
<body>
    <?php 
    $numeros = [3, 8, 7, -6];
    echo "<table>";
    echo "<tr>";
    echo "<th>Numero</th>";
    echo "<th>Cuadrado</th>";
    echo "<th>Cubo</th>";
    echo "</tr>";

    for ($posicion = 0; $posicion < count($numeros); $posicion++) {
        $cuadrado = $numeros[$posicion] * $numeros[$posicion];
        $cubo = $numeros[$posicion] * $numeros[$posicion] * $numeros[$posicion];

        echo "<tr>";
        echo "<td>" . $numeros[$posicion] . "</td>";
        echo "<td>" . $cuadrado . "</td>";
        echo "<td>" . $cubo . "</td>";
        echo "</tr>";
    }

    ?>
</body>
</html>