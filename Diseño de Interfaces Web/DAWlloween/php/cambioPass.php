<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Location: ../perfil.html#recuperar'); exit;
}
require_once __DIR__ . '/VarGlobales.php';
exigirPost();
CambioContraseña();
responder(200, ['ok' => true, 'mensaje' => 'Contraseña cambiada. Inicia sesión con la nueva.', 'csrf' => $_SESSION['csrf']]);
