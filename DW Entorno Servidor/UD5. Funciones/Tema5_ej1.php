<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tema 5 Ejercicio 1</title>
</head>
<body>
    <?php 
    function verBoletin(string $nombre, array $calificaciones): string {
        $boletin = "<h2>Boletín de notas</h2>";
        $boletin .= "<p>Alumno: " . $nombre . "</p>";
        $boletin .= "<p>Matemáticas: " . $calificaciones["Matemáticas"] . "</p>";
        $boletin .= "<p>Lengua: " . $calificaciones["Lengua"] . "</p>";
        $boletin .= "<p>Historia: " . $calificaciones["Historia"] . "</p>";
        $boletin .= "<p>Dibujo: " . $calificaciones["Dibujo"] . "</p>";

        return $boletin;
    }

    $nombreCompleto = "Juan Ramírez";
    $calificaciones = [
        "Matemáticas" => "Sobresaliente",
        "Lengua" => "Notable",
        "Historia" => "Notable",
        "Dibujo" => "Insuficiente"
    ];

    echo verBoletin($nombreCompleto, $calificaciones);

    ?>
</body>
</html>