<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tema 5 Ejercicio 4</title>
</head>
<body>
    <?php 
    function crearBoletin(array $alumno): string {
        $media = (
            $alumno["nota1"] +
            $alumno["nota2"] +
            $alumno["nota3"] 
        ) / 3;

        $boletin = "<h2>Boletín de notas</h2>";
        $boletin .= "<p>Nombre: " . $alumno["nombre"] . "</p>";
        $boletin .= "<p>Apellidos: " . $alumno["apellidos"] . "</p>";
        $boletin .= "<p>Nota 1: " . $alumno["nota1"] . "</p>";
        $boletin .= "<p>Nota 2: " . $alumno["nota2"] . "</p>";
        $boletin .= "<p>Nota 3: " . $alumno["nota3"] . "</p>";
        $boletin .= "<p>Nota final: " . round($media, 2) . "</p>";

        return $boletin;
    }

    $alumno = [
        "nombre" => "Mario",
        "apellidos" => "Alonso Gallardo",
        "nota1" => "7",
        "nota2" => "6",
        "nota3" => "7",
    ];

    echo crearBoletin($alumno);

    ?>
</body>
</html>