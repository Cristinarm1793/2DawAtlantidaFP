<?php
require_once __DIR__ . '/config.php';

exigirPost();

$db = baseDatos();
$usuario = usuarioActual($db);

if (!$usuario) {
    responder(401, [
        'ok' => false,
        'error' => 'Debes iniciar sesión.'
    ]);
}

$actual = campo('actual');
$nueva = campo('nueva');
$confirmar = campo('confirmar');

if (strlen($nueva) < 8 || strlen($nueva) > 200) {
    responder(422, [
        'ok' => false,
        'error' => 'La nueva contraseña debe tener entre 8 y 200 caracteres.'
    ]);
}

if ($nueva !== $confirmar) {
    responder(422, [
        'ok' => false,
        'error' => 'Las contraseñas nuevas no coinciden.'
    ]);
}

$consulta = $db->prepare(
    'SELECT password_hash FROM usuarios WHERE id = ?'
);

$consulta->execute([$usuario['id']]);

$hash = $consulta->fetchColumn();

if (!$hash || !password_verify($actual, $hash)) {
    responder(401, [
        'ok' => false,
        'error' => 'La contraseña actual no es correcta.'
    ]);
}

$consulta = $db->prepare(
    'UPDATE usuarios SET password_hash = ? WHERE id = ?'
);

$consulta->execute([
    password_hash($nueva, PASSWORD_DEFAULT),
    $usuario['id']
]);

session_regenerate_id(true);

responder(200, [
    'ok' => true,
    'mensaje' => 'Contraseña actualizada.'
]);