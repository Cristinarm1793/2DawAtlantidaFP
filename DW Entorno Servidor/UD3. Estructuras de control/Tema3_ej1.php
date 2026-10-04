<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicios T3 PHP 1</title>

    <style>
        table {
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        td {
            border: 1px solid red;
            padding: 5px 20px;
            text-align: center;
            background-color: #f2cccc;
        }

        td:first-child {
            font-weight: bold;
        }

        tr:nth-child(even) td {
            background-color: #d9aaaa;
        }
    </style>

</head>
<body>
    <?php 

    for ($tabla = 1; $tabla <= 10; $tabla++) {
        echo "<table>";

        for ($numero = 1; $numero <= 10; $numero++){
            $resultado = $tabla * $numero;

            echo "<tr>";
            echo "<td>" . $tabla . "x" . $numero . "</td>";
            echo "<td>" . $resultado . "</td>";
            echo "</tr>";
        }

        echo "</table>";
    }

    ?>
</body>
</html>