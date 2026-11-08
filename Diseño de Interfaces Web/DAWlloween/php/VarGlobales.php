<?php
/* Práctica DAWlloween: usuarios en una matriz de sesión, sin base de datos.
 * Cerrar sesión conserva las cuentas de ESTA sesión y la partida del juego.
 * Una sesión nueva (otro navegador o sesión caducada) tiene otra matriz.
 */
ini_set('session.use_strict_mode', '1');
ini_set('session.use_only_cookies', '1');
ini_set('session.cookie_httponly', '1');
ini_set('session.cookie_samesite', 'Lax');
if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
    ini_set('session.cookie_secure', '1');
}
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
$_SESSION['mimatriz'] = $_SESSION['mimatriz'] ?? [];
$_SESSION['csrf'] = $_SESSION['csrf'] ?? bin2hex(random_bytes(32));

function responder(int $codigo, array $datos): void
{
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function campo(string $nombre): string
{
    $valor = $_POST[$nombre] ?? '';
    return is_string($valor) ? trim($valor) : '';
}
function secreto(string $nombre): string
{
    $valor = $_POST[$nombre] ?? '';
    return is_string($valor) ? $valor : '';
}
function exigirPost(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        responder(405, ['ok' => false, 'error' => 'Utiliza POST.']);
    }
    $token = $_POST['csrf'] ?? null;
    if (!is_string($token) || !hash_equals($_SESSION['csrf'], $token)) {
        responder(403, ['ok' => false, 'error' => 'Recarga la página: la sesión del formulario ha caducado.']);
    }
}
function buscarUsuario(string $nombre): ?int
{
    foreach ($_SESSION['mimatriz'] as $indice => $usuario) {
        if (strcasecmp($usuario['Usuario'], $nombre) === 0) return $indice;
    }
    return null;
}
function buscarEmail(string $email): ?int
{
    foreach ($_SESSION['mimatriz'] as $indice => $usuario) {
        if (strcasecmp($usuario['Email'], $email) === 0) return $indice;
    }
    return null;
}
function preguntas(): array
{
    return ['personaje' => '¿Cuál es tu personaje de ficción favorito?',
            'palabra' => '¿Qué palabra secreta elegiste para el museo?',
            'lugar' => '¿Qué lugar imaginario te gustaría visitar?'];
}
function avatares(): array
{
    return ['esqueleto-hombre', 'momia-hombre', 'zombi-hombre', 'vampiro-hombre', 'hombre-lobo',
            'esqueleto-mujer', 'momia-mujer', 'zombi-mujer', 'vampiro-mujer', 'mujer-lobo'];
}
function validarClave(string $clave): void
{
    // Bcrypt admite hasta 72 bytes; no truncamos contraseñas silenciosamente.
    if (strlen($clave) < 8 || strlen($clave) > 72 || strpos($clave, "\0") !== false) {
        responder(422, ['ok' => false, 'error' => 'La contraseña debe tener entre 8 y 72 bytes y no contener caracteres nulos.']);
    }
}
function currentUser(?int $indice): void
{
    foreach ($_SESSION['mimatriz'] as $posicion => &$usuario) {
        $usuario['UsuarioActual'] = $indice !== null && $indice === $posicion;
    }
    unset($usuario);
    session_regenerate_id(true);
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
}
function indiceActual(): ?int
{
    foreach ($_SESSION['mimatriz'] as $indice => $usuario) {
        if ($usuario['UsuarioActual']) return $indice;
    }
    return null;
}
function usuarioPublico(): ?array
{
    $indice = indiceActual();
    if ($indice === null) return null;
    $u = $_SESSION['mimatriz'][$indice];
    // Nunca se devuelven hashes de contraseñas ni respuestas de seguridad.
    return ['nombre' => $u['Usuario'], 'email' => $u['Email'], 'perfil' => $u['Perfil'],
            'avatar' => $u['Avatar'], 'creado_en' => $u['CreadoEn']];
}
function limitarIntentos(string $tipo, int $maximo = 8): void
{
    $ahora = time();
    $intentos = $_SESSION['intentos'][$tipo] ?? [];
    $intentos = array_values(array_filter($intentos, fn($t) => $t > $ahora - 300));
    if (count($intentos) >= $maximo) {
        responder(429, ['ok' => false, 'error' => 'Demasiados intentos. Espera cinco minutos.']);
    }
    $intentos[] = $ahora;
    $_SESSION['intentos'][$tipo] = $intentos;
}
function AltaUsuario(): void
{
    $nombre = campo('usuario'); $email = strtolower(campo('email'));
    $clave = secreto('password'); $respuesta = campo('respuesta');
    $pregunta = campo('pregunta'); $avatar = campo('avatar');
    if (!preg_match('/^[\p{L}\p{N}_ .-]{3,40}$/u', $nombre)) {
        responder(422, ['ok' => false, 'error' => 'Usuario: entre 3 y 40 letras, números, espacios, puntos, guiones o guiones bajos.']);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
        responder(422, ['ok' => false, 'error' => 'Introduce un correo válido.']);
    }
    validarClave($clave);
    if ($clave !== secreto('confirmar')) responder(422, ['ok' => false, 'error' => 'Las contraseñas no coinciden.']);
    if (!array_key_exists($pregunta, preguntas()) || strlen($respuesta) < 2 || strlen($respuesta) > 72 || strpos($respuesta, "\0") !== false) {
        responder(422, ['ok' => false, 'error' => 'Elige una pregunta y una respuesta de entre 2 y 72 bytes.']);
    }
    if (!in_array($avatar, avatares(), true)) responder(422, ['ok' => false, 'error' => 'Elige un avatar de la lista.']);
    foreach ($_SESSION['mimatriz'] as $u) {
        if (strcasecmp($u['Usuario'], $nombre) === 0 || strcasecmp($u['Email'], $email) === 0) {
            responder(409, ['ok' => false, 'error' => 'El usuario o correo ya está registrado en esta sesión.']);
        }
    }
    $_SESSION['mimatriz'][] = [
        'Usuario' => $nombre, 'Contraseña' => password_hash($clave, PASSWORD_DEFAULT),
        'Email' => $email, 'Perfil' => 'user', 'Pregunta' => $pregunta,
        'Respuesta' => password_hash($respuesta, PASSWORD_DEFAULT), 'UsuarioActual' => false,
        'Avatar' => $avatar, 'CreadoEn' => date('Y-m-d H:i:s')
    ];
    currentUser(count($_SESSION['mimatriz']) - 1);
}
function CambioContraseña(): void
{
    limitarIntentos('recuperacion');
    $indice = buscarUsuario(campo('usuario'));
    $clave = secreto('nueva'); validarClave($clave);
    if ($clave !== secreto('confirmar')) responder(422, ['ok' => false, 'error' => 'Las contraseñas nuevas no coinciden.']);
    $respuesta = campo('respuesta');
    if ($indice === null || strlen($respuesta) > 72 ||
        $_SESSION['mimatriz'][$indice]['Pregunta'] !== campo('pregunta') ||
        !password_verify($respuesta, $_SESSION['mimatriz'][$indice]['Respuesta'])) {
        responder(401, ['ok' => false, 'error' => 'Usuario, pregunta o respuesta incorrectos.']);
    }
    $_SESSION['mimatriz'][$indice]['Contraseña'] = password_hash($clave, PASSWORD_DEFAULT);
    unset($_SESSION['intentos']['recuperacion']);
    // Tras cambiarla se vuelve a pedir el acceso con la nueva contraseña.
    currentUser(null);
}
