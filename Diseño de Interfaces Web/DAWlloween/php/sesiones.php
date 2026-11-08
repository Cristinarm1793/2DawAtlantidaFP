<?php
require_once __DIR__ . '/VarGlobales.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    responder(200, ['ok' => true, 'csrf' => $_SESSION['csrf'], 'usuario' => usuarioPublico()]);
}
exigirPost();
if (campo('accion') === 'salir') {
    // No borrar mimatriz ni casa_velasco: permite volver a entrar y conservar la partida.
    currentUser(null);
    responder(200, ['ok' => true, 'mensaje' => 'Sesión cerrada.', 'csrf' => $_SESSION['csrf']]);
}
if (campo('accion') === 'avatar') {
    $indice = indiceActual();
    if ($indice === null) responder(401, ['ok' => false, 'error' => 'Inicia sesión para cambiar el avatar.']);
    $avatar = campo('avatar');
    if (!in_array($avatar, avatares(), true)) responder(422, ['ok' => false, 'error' => 'Avatar no válido.']);
    $_SESSION['mimatriz'][$indice]['Avatar'] = $avatar;
    responder(200, ['ok' => true, 'mensaje' => 'Avatar actualizado.']);
}
responder(422, ['ok' => false, 'error' => 'Acción desconocida.']);
