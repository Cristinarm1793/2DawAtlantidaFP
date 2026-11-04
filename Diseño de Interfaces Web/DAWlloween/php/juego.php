<?php

session_start();

// Crear una partida si todavía no existe
if (!isset($_SESSION['partida'])) {

    $_SESSION['partida'] = [
        'escena' => 'inicio',
        'inventario' => [],
        'terminado' => false
    ];
}

// Consultar qué acción solicita JavaScript
$accion = $_POST['accion'] ?? '';

// GUARDAR PARTIDA
if ($accion === 'guardar') {

    $escena = $_POST['escena'] ?? 'inicio';
    $inventario = $_POST['inventario'] ?? [];

    if (is_string($escena) && is_array($inventario)) {

        $_SESSION['partida']['escena'] = $escena;
        $_SESSION['partida']['inventario'] = $inventario;

        echo "Partida guardada";

    } else {
        http_response_code(400);
        echo "Datos de partida incorrectos";
    }

// CARGAR PARTIDA
} elseif ($accion === 'cargar') {

    header('Content-Type: application/json; charset=utf-8');

    echo json_encode($_SESSION['partida']);

// REINICIAR PARTIDA
} elseif ($accion === 'reiniciar') {

    $_SESSION['partida'] = [
        'escena' => 'inicio',
        'inventario' => [],
        'terminado' => false
    ];

    echo "Partida reiniciada";

} else {

    http_response_code(400);
    echo "Acción no válida";
}