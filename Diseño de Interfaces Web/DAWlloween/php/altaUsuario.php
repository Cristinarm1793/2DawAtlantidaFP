<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Location: ../perfil.html#registro'); exit;
}
require_once __DIR__ . '/VarGlobales.php';
exigirPost();
AltaUsuario();
responder(201, ['ok' => true, 'mensaje' => 'Cuenta creada. Bienvenido al museo.', 'csrf' => $_SESSION['csrf']]);
