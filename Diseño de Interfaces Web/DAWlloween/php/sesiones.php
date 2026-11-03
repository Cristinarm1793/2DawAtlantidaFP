<?php
require_once __DIR__ . '/config.php';

if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $usuario = empty($_SESSION['usuario_id'])
        ? null
        : usuarioActual(baseDatos());

    responder(200, [
        'ok' => true,
        'csrf' => $_SESSION['csrf'],
        'usuario' => $usuario
    ]);
}

exigirPost();

if (campo('accion') !== 'salir') {
    responder(422, [
        'ok' => false,
        'error' => 'Acción desconocida.'
    ]);
}

$_SESSION = [];

session_regenerate_id(true);

$_SESSION['csrf'] = bin2hex(random_bytes(32));

responder(200, [
    'ok' => true,
    'mensaje' => 'Sesión cerrada.'
]);