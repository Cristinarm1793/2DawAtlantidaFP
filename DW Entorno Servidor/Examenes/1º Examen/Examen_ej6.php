<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        /* 06. Ordenar puntuaciones · 1 puntos
        Ordena las puntuaciones de mayor a menor, conservando la relación entre cada nombre y su
        puntuación. Después muestra todos los nombres junto con sus puntos, uno por línea. Puedes
        utilizar las funciones de ordenación estudiadas.
        $puntuaciones = [
        "Ana" => 72,
        "Luis" => 85,
        "Eva" => 64,
        "Pablo" => 91
        ]; */

        $puntuaciones = [
            "Ana" => 72,
            "Luis" => 85,
            "Eva" => 64,
            "Pablo" => 91
        ];

        arsort($puntuaciones);

        foreach ($puntuaciones as $nombre => $puntos) {
            echo $nombre . ": " . $puntos . "<br>";
        }
    ?>
</body>
</html>