<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tema 5 Ejercicio 2</title>
</head>
<body>
    <?php 
    function crearTabla(string $color1, string $color2, string $color3): string {
        $tabla = "<table>";

        $tabla .= "<tr style='background-color: " . $color1 . ";'>";
        $tabla .= "<td>Color 1</td>";
        $tabla .= "</tr>";

        $tabla .= "<tr style='background-color: " . $color2 . ";'>";
        $tabla .= "<td>Color 2</td>";
        $tabla .= "</tr>";

        $tabla .= "<tr style='background-color: " . $color3 . ";'>";
        $tabla .= "<td>Color 3</td>";
        $tabla .= "</tr>";

        $tabla .= "</table>";

        return $tabla;
    }

    echo crearTabla("#75F94D", "#FFFD55", "#ED1C24");

    ?>

</body>
</html>