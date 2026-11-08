<?php
/* API única de perfil. GET consulta sesión; POST selecciona una acción.
 * Todas las escrituras exigen el token CSRF de la sesión.
 */
require_once __DIR__ . '/funciones.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    responder(200, ['ok' => true, 'csrf' => $_SESSION['csrf'], 'usuario' => usuarioPublico()]);
}
exigirPost();
$accion = campo('accion');
if ($accion === 'salir') {
    // Conserva la partida del juego y las cuentas persistentes.
    currentUser(null);
    responder(200, ['ok' => true, 'mensaje' => 'Sesión cerrada.', 'csrf' => $_SESSION['csrf']]);
}
if (!in_array($accion, ['registro', 'login', 'password', 'avatar'], true)) {
    responder(422, ['ok' => false, 'error' => 'Acción desconocida.']);
}
abrirUsuarios();
switch ($accion) {
    // -------------------- CREAR CUENTA --------------------
    case 'registro':
        limitarIntentos('registro');
        AltaUsuario();
        responder(201, ['ok' => true, 'mensaje' => 'Cuenta creada.', 'csrf' => $_SESSION['csrf']]);
    // -------------------- INICIAR SESIÓN --------------------
    case 'login':
        limitarIntentos('login');
        $indice = buscarEmail(campo('email'));
        $clave = secreto('password');
        if ($indice === null || strlen($clave) > 72 || !password_verify($clave, $usuarios[$indice]['Contraseña'])) {
            responder(401, ['ok' => false, 'error' => 'Correo o contraseña incorrectos.']);
        }
        unset($_SESSION['intentos']['login']);
        currentUser($indice);
        responder(200, ['ok' => true, 'mensaje' => 'Sesión iniciada.', 'csrf' => $_SESSION['csrf']]);
    // -------------------- RECUPERAR CONTRASEÑA --------------------
    case 'password':
        CambioContraseña();
        responder(200, ['ok' => true, 'mensaje' => 'Contraseña cambiada.', 'csrf' => $_SESSION['csrf']]);
    // -------------------- GUARDAR AVATAR --------------------
    case 'avatar':
        $indice = indiceActual();
        if ($indice === null) responder(401, ['ok' => false, 'error' => 'Inicia sesión para cambiar el avatar.']);
        $avatar = campo('avatar');
        if (!in_array($avatar, avatares(), true)) responder(422, ['ok' => false, 'error' => 'Avatar no válido.']);
        $usuarios[$indice]['Avatar'] = $avatar;
        guardarUsuarios();
        responder(200, ['ok' => true, 'mensaje' => 'Avatar actualizado.']);
}
