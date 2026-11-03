<?php
require_once __DIR__ . '/config.php';

exigirPost();

$nombre = campo('nombre');
$email = strtolower(campo('email'));
$password = campo('password');
$confirmar = campo('confirmar');

if ($nombre === '' || mb_strlen($nombre) > 100) {
    responder(422, [
        'ok' => false,
        'error' => 'El nombre debe tener entre 1 y 100 caracteres.'
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    responder(422, [
        'ok' => false,
        'error' => 'Introduce un correo válido.'
    ]);
}

if (strlen($password) < 8 || strlen($password) > 200) {
    responder(422, [
        'ok' => false,
        'error' => 'La contraseña debe tener entre 8 y 200 caracteres.'
    ]);
}

if ($password !== $confirmar) {
    responder(422, [
        'ok' => false,
        'error' => 'Las contraseñas no coinciden.'
    ]);
}

$db = baseDatos();

try {
    $consulta = $db->prepare(
        'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)'
    );

    $consulta->execute([
        $nombre,
        $email,
        password_hash($password, PASSWORD_DEFAULT)
    ]);

} catch (PDOException $e) {
    if (str_contains($e->getMessage(), 'UNIQUE')) {
        responder(409, [
            'ok' => false,
            'error' => 'Ese correo ya está registrado.'
        ]);
    }

    responder(500, [
        'ok' => false,
        'error' => 'No se pudo completar el registro.'
    ]);
}

session_regenerate_id(true);

$_SESSION['usuario_id'] = (int)$db->lastInsertId();

responder(201, [
    'ok' => true,
    'mensaje' => 'Registro completado.'
]);