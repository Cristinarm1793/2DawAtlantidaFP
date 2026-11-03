<?php
require_once __DIR__ . '/config.php';

exigirPost();

$email = strtolower(campo('email'));
$password = campo('password');

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
    responder(422, [
        'ok' => false,
        'error' => 'Introduce correo y contraseña válidos.'
    ]);
}

$db = baseDatos();

$consulta = $db->prepare(
    'SELECT id, password_hash FROM usuarios WHERE email = ?'
);

$consulta->execute([$email]);

$usuario = $consulta->fetch(PDO::FETCH_ASSOC);

if (!$usuario || !password_verify($password, $usuario['password_hash'])) {
    responder(401, [
        'ok' => false,
        'error' => 'Correo o contraseña incorrectos.'
    ]);
}

session_regenerate_id(true);

$_SESSION['usuario_id'] = (int)$usuario['id'];

responder(200, [
    'ok' => true,
    'mensaje' => 'Sesión iniciada.'
]);