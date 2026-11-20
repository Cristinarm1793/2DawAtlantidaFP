<?php

require_once "preguntas.php";
require_once "funciones.php";

$enviado = isset($_POST["corregir"]);

if ($enviado) {

    $respuestas = [];

    if (isset($_POST["respuesta"])) {
        $respuestas = $_POST["respuesta"];
    }

    $aciertos = corregirTest($preguntas, $respuestas);

    $total = count($preguntas);

    $nota = ($aciertos / $total) * 10;
}

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¿Cuánto sabes de cine?</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="contenedor">

        <header>
            <h1>¿CUÁNTO SABES DE CINE?</h1>

            <p class="subtitulo">
                Adivina la película a partir de su argumento.
            </p>

            <p>
                Responde a todas las preguntas y descubre tu resultado.
            </p>
        </header>

        <?php if (!$enviado) { ?>

            <form method="POST" action="">

                <?php mostrarPreguntas($preguntas); ?>

                <button type="submit" name="corregir">
                    Corregir test
                </button>

            </form>

        <?php } else { ?>

            <div class="resultado">

                <h2>Resultado final</h2>

                <p>
                    Has acertado
                    <?php echo $aciertos; ?>
                    de
                    <?php echo $total; ?>
                    preguntas.
                </p>

                <p class="nota">
                    <?php echo $nota; ?> / 10
                </p>

                <?php
                if ($nota >= 5) {
                    echo "<p>¡Enhorabuena! Eres un auténtico cinéfilo.</p>";
                } else {
                    echo "<p>¡Necesitas unas cuantas sesiones más de cine!</p>";
                }
                ?>

            </div>

            <h2>Corrección de las preguntas</h2>

            <?php mostrarCorreccion($preguntas, $respuestas); ?>

            <a href="index.php" class="boton">
                Volver a intentarlo
            </a>

        <?php } ?>

        <footer>
            Mini-proyecto DWES - Aplicación tipo Test
        </footer>

    </div>

</body>

</html>