<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Location: ../perfil.html#login'); exit;
}
require_once __DIR__ . '/VarGlobales.php';
exigirPost();
limitarIntentos('login');
$indice = buscarEmail(campo('email'));
$clave = secreto('password');
if ($indice === null || strlen($clave) > 72 || !password_verify($clave, $_SESSION['mimatriz'][$indice]['Contraseña'])) {
    responder(401, ['ok' => false, 'error' => 'Correo o contraseña incorrectos.']);
}
unset($_SESSION['intentos']['login']);
currentUser($indice);
responder(200, ['ok' => true, 'mensaje' => 'Sesión iniciada.', 'csrf' => $_SESSION['csrf']]);
