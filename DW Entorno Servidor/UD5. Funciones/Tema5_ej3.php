<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tema 5 Ejercicio 3</title>
    <style>
        .verde {
            background-color: #75F94D;
        }
        .amarillo {
            background-color: #FFFD55;
        }
        .rojo {
            background-color: #ED1C24;
        }
    </style>
</head>
<body>
    <?php 
    function crearTabla(string $color1, string $color2, string $color3): string {
        $tabla = "<table>";

        $tabla .= "<tr class='" . $color1 . "'>";
        $tabla .= "<td>Clase 1</td>";
        $tabla .= "</tr>";

        $tabla .= "<tr class='" . $color2 . "'>";
        $tabla .= "<td>Clase 2</td>";
        $tabla .= "</tr>";

        $tabla .= "<tr class='" . $color3 . "'>";
        $tabla .= "<td>Clase 3</td>";
        $tabla .= "</tr>";

        $tabla .= "</table>";

        return $tabla;
    }

    echo crearTabla("verde", "amarillo", "rojo");

    ?>

</body>
</html>