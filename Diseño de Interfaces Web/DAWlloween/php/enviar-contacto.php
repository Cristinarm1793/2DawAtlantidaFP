<?php
require_once __DIR__ . '/config.php';

exigirPost();

$nombre = campo('nombre');
$email = campo('email');
$asunto = campo('asunto');
$mensaje = campo('mensaje');

if ($nombre === '' || mb_strlen($nombre) > 100) {
    responder(422, [
        'ok' => false,
        'error' => 'Introduce un nombre válido (máximo 100 caracteres).'
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    responder(422, [
        'ok' => false,
        'error' => 'Introduce un correo válido.'
    ]);
}

if (!in_array($asunto, ['consulta', 'anomalia', 'sugerencia', 'otro'], true)) {
    responder(422, [
        'ok' => false,
        'error' => 'Selecciona un asunto válido.'
    ]);
}

if ($mensaje === '' || mb_strlen($mensaje) > 3000) {
    responder(422, [
        'ok' => false,
        'error' => 'El mensaje debe tener entre 1 y 3000 caracteres.'
    ]);
}

$db = baseDatos();

$consulta = $db->prepare(
    'INSERT INTO mensajes (nombre, email, asunto, mensaje)
     VALUES (?, ?, ?, ?)'
);

$consulta->execute([
    $nombre,
    $email,
    $asunto,
    $mensaje
]);

responder(200, [
    'ok' => true,
    'mensaje' => 'Comunicación registrada correctamente. No se ha enviado ningún correo.'
]);