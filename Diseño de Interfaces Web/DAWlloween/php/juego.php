<?php

session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function responder($datos, $codigo = 200)
{
    http_response_code($codigo);

    echo json_encode(
        $datos,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(['error' => 'Utiliza una petición POST.'], 405);
}

$accion = $_POST['accion'] ?? '';

switch ($accion) {
    case 'guardar':
        $texto = $_POST['estado'] ?? '';

        if (!is_string($texto)) {
            responder(['error' => 'La partida recibida no es válida.'], 400);
        }

        $partida = json_decode($texto, true);

        if (
            !is_array($partida) ||
            !isset(
                $partida['lugar'],
                $partida['inventario'],
                $partida['encontrados'],
                $partida['vidas'],
                $partida['pasoAsesino']
            ) ||
            !is_string($partida['lugar']) ||
            !is_array($partida['inventario']) ||
            !is_array($partida['encontrados']) ||
            !is_int($partida['vidas']) ||
            $partida['vidas'] < 0 ||
            $partida['vidas'] > 2 ||
            !is_int($partida['pasoAsesino'])
        ) {
            responder(['error' => 'Faltan datos de la partida.'], 400);
        }

        // Conservamos todo: objetos, habitación, vidas,
        // posición del enemigo, reparaciones y documentos.
        $_SESSION['casa_velasco'] = $partida;

        responder(['ok' => true]);

    case 'cargar':
        responder($_SESSION['casa_velasco'] ?? null);

    case 'reiniciar':
        unset($_SESSION['casa_velasco']);

        responder(['ok' => true]);

    default:
        responder(['error' => 'Acción desconocida.'], 400);
}