<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicios T3 PHP 4</title>
     <style>
        body {
            font-family: Arial, sans-serif;
        }

        table {
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th {
            background-color: #333;
            color: white;
            padding: 8px;
            border: 1px solid black;
        }

        td {
            width: 50px;
            height: 35px;
            text-align: center;
            border: 1px solid black;
        }

        h3 {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <?php

    $meses = [
        "Enero" => 31,
        "Febrero" => 28,
        "Marzo" => 31,
        "Abril" => 30,
        "Mayo" => 31,
        "Junio" => 30,
        "Julio" => 31,
        "Agosto" => 31,
        "Septiembre" => 30,
        "Octubre" => 31,
        "Noviembre" => 30,
        "Diciembre" => 31
    ];

    $diasSemana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"
    ];

    $diaInicio = 0;

    foreach ($meses as $mes => $diaMes) {
        echo "<h3>" . $mes . "</h3>";

        echo "<table>";

        echo "<tr>";
        foreach ($diasSemana as $diaSemana) {
            echo "<th>" . $diaSemana . "</th>" ;
        }
        echo "</tr>";

        echo "<tr>";

        for ($posicion = 0; $posicion < $diaInicio; $posicion++) {
            echo "<td></td>";
        }    

        for ($dia = 1; $dia <= $diaMes; $dia++) {
            echo "<td>" . $dia . "</td>";
            $diaInicio++;

            if ($diaInicio == 7) {
                echo "</tr>";

                if ($dia < $diaMes){
                    echo "<tr>";
                }

                $diaInicio = 0;
            }
        }

        if ($diaInicio != 0) {
            for ($posicion = $diaInicio; $posicion < 7; $posicion++) {
                echo "<td></td>";

            }

            echo "</tr>";
        }

        echo "</table>";
    }

    ?>
</body>
</html>