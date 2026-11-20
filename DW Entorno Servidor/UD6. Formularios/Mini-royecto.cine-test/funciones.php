
<?php

function mostrarPreguntas($preguntas)
{
    foreach ($preguntas as $indice => $pregunta) {

        echo '<div class="pregunta">';

        echo '<h3>' . ($indice + 1) . '. ' .
            htmlspecialchars($pregunta["pregunta"]) . '</h3>';

        foreach ($pregunta["respuestas"] as $numero => $respuesta) {

            echo '<label class="respuesta">';

            echo '<input type="radio"
                         name="respuesta[' . $indice . ']"
                         value="' . $numero . '"
                         required>';

            echo '<span>' . htmlspecialchars($respuesta) . '</span>';

            echo '</label>';
        }

        echo '</div>';
    }
}

function corregirTest($preguntas, $respuestas)
{
    $aciertos = 0;

    foreach ($preguntas as $indice => $pregunta) {

        if (isset($respuestas[$indice])) {

            if ($respuestas[$indice] == $pregunta["correcta"]) {
                $aciertos++;
            }
        }
    }

    return $aciertos;
}

function mostrarCorreccion($preguntas, $respuestas)
{
    foreach ($preguntas as $indice => $pregunta) {

        echo '<div class="pregunta">';

        echo '<h3>' . ($indice + 1) . '. ' .
            htmlspecialchars($pregunta["pregunta"]) . '</h3>';

        if (
            isset($respuestas[$indice]) &&
            $respuestas[$indice] == $pregunta["correcta"]
        ) {
            echo '<p class="acierto">Respuesta correcta</p>';
        } else {
            echo '<p class="fallo">Respuesta incorrecta</p>';
        }

        $correcta = $pregunta["correcta"];

        echo '<p>Solución: ' .
            htmlspecialchars($pregunta["respuestas"][$correcta]) .
            '</p>';

        echo '</div>';
    }
}
