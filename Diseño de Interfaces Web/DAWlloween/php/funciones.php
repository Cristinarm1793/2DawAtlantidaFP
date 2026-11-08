<?php
/* Funciones compartidas: sesión, JSON, validación y operaciones de cuenta.
 * Las cuentas son compartidas. La identidad conectada pertenece a cada sesión.
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
// Las cuentas antiguas de sesión no se importan automáticamente.
unset($_SESSION['mimatriz']);
$usuarios = null;
$bloqueoUsuarios = null;
$_SESSION['csrf'] = $_SESSION['csrf'] ?? bin2hex(random_bytes(32));

function responder(int $codigo, array $datos): void
{
    cerrarUsuarios();
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// ==================== ALMACENAMIENTO PRIVADO EN JSON ====================
// MUSEUM_DATOS_DIR permite elegir otra carpeta, siempre fuera de DocumentRoot.
function carpetaUsuarios(): string
{
    $publica = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
    if (!$publica) throw new RuntimeException('DocumentRoot no disponible.');
    $carpeta = getenv('MUSEUM_DATOS_DIR') ?: dirname($publica) . '/museum404-datos';
    if (!is_dir($carpeta) && !@mkdir($carpeta, 0700, true) && !is_dir($carpeta)) {
        throw new RuntimeException('No se puede crear la carpeta privada.');
    }
    $real = realpath($carpeta);
    if (!$real) throw new RuntimeException('Carpeta privada no disponible.');
    $normalizar = fn($v) => rtrim(str_replace('\\', '/', $v), '/') . '/';
    $raiz = $normalizar($publica); $destino = $normalizar($real);
    if (PHP_OS_FAMILY === 'Windows') { $raiz = strtolower($raiz); $destino = strtolower($destino); }
    if (strpos($destino, $raiz) === 0) throw new RuntimeException('El JSON debe estar fuera de la carpeta pública.');
    return $real;
}
function abrirUsuarios(): void
{
    global $usuarios, $bloqueoUsuarios;
    if (is_resource($bloqueoUsuarios)) return;
    try {
        $carpeta = carpetaUsuarios();
        $bloqueoUsuarios = @fopen($carpeta . '/usuarios.lock', 'c');
        if (!$bloqueoUsuarios || !@flock($bloqueoUsuarios, LOCK_EX)) {
            throw new RuntimeException('No se pudo bloquear el almacén.');
        }
        $ruta = $carpeta . '/usuarios.json';
        if (!file_exists($ruta)) {
            $usuarios = [];
            guardarUsuarios();
            return;
        }
        $texto = @file_get_contents($ruta);
        if ($texto === false || substr(ltrim($texto), 0, 1) !== '[') throw new RuntimeException('JSON ilegible.');
        $usuarios = json_decode($texto, true, 512, JSON_THROW_ON_ERROR);
        if (!is_array($usuarios) || ($usuarios !== [] && array_keys($usuarios) !== range(0, count($usuarios) - 1))) {
            throw new RuntimeException('Formato de usuarios incorrecto.');
        }
        $ids = []; $correos = []; $nombres = [];
        foreach ($usuarios as $u) {
            foreach (['Id','Usuario','Contraseña','Email','Perfil','Pregunta','Respuesta','Avatar','CreadoEn'] as $clave) {
                if (!isset($u[$clave]) || !is_string($u[$clave])) throw new RuntimeException('Cuenta incompleta.');
            }
            if (!isset($u['Version']) || !is_int($u['Version']) || $u['Version'] < 1 ||
                !filter_var($u['Email'], FILTER_VALIDATE_EMAIL) || !in_array($u['Avatar'], avatares(), true) ||
                isset($ids[$u['Id']]) || isset($correos[strtolower($u['Email'])]) || isset($nombres[strtolower($u['Usuario'])])) {
                throw new RuntimeException('Cuenta inválida o duplicada.');
            }
            $ids[$u['Id']] = true; $correos[strtolower($u['Email'])] = true; $nombres[strtolower($u['Usuario'])] = true;
        }
    } catch (Throwable $e) {
        error_log('Museum usuarios: ' . $e->getMessage());
        responder(503, ['ok' => false, 'error' => 'No se puede leer el archivo de usuarios. No se ha modificado.']);
    }
}
function guardarUsuarios(): void
{
    global $usuarios, $bloqueoUsuarios;
    $temporal = false;
    try {
        if (!is_resource($bloqueoUsuarios)) throw new RuntimeException('Falta el bloqueo de escritura.');
        $carpeta = carpetaUsuarios();
        $texto = json_encode($usuarios, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        $temporal = @tempnam($carpeta, '.usuarios-');
        if (!$temporal || @file_put_contents($temporal, $texto . "\n") !== strlen($texto) + 1 ||
            !@rename($temporal, $carpeta . '/usuarios.json')) {
            throw new RuntimeException('No se pudo guardar el JSON.');
        }
    } catch (Throwable $e) {
        if ($temporal && is_file($temporal)) @unlink($temporal);
        error_log('Museum usuarios: ' . $e->getMessage());
        responder(503, ['ok' => false, 'error' => 'No se pudieron guardar los cambios. Inténtalo de nuevo.']);
    }
}
function cerrarUsuarios(): void
{
    global $bloqueoUsuarios;
    if (is_resource($bloqueoUsuarios)) {
        flock($bloqueoUsuarios, LOCK_UN);
        fclose($bloqueoUsuarios);
    }
    $bloqueoUsuarios = null;
}
register_shutdown_function('cerrarUsuarios');

// ==================== VALIDACIÓN Y FORMULARIOS ====================

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
    global $usuarios;
    abrirUsuarios();
    foreach ($usuarios as $indice => $usuario) {
        if (strcasecmp($usuario['Usuario'], $nombre) === 0) return $indice;
    }
    return null;
}
function buscarEmail(string $email): ?int
{
    global $usuarios;
    abrirUsuarios();
    foreach ($usuarios as $indice => $usuario) {
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
// ==================== IDENTIDAD DE LA SESIÓN ====================
function currentUser(?int $indice): void
{
    global $usuarios;
    if ($indice === null) {
        unset($_SESSION['usuario_id'], $_SESSION['usuario_version']);
    } else {
        $_SESSION['usuario_id'] = $usuarios[$indice]['Id'];
        $_SESSION['usuario_version'] = $usuarios[$indice]['Version'];
    }
    session_regenerate_id(true);
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
}
function indiceActual(): ?int
{
    global $usuarios;
    abrirUsuarios();
    foreach ($usuarios as $i => $u) {
        if ($u['Id'] === ($_SESSION['usuario_id'] ?? null) &&
            $u['Version'] === ($_SESSION['usuario_version'] ?? null)) return $i;
    }
    return null;
}
function usuarioPublico(): ?array
{
    global $usuarios;
    $i = indiceActual();
    $u = $i === null ? null : $usuarios[$i];
    cerrarUsuarios();
    // Nunca se devuelven hashes ni respuestas de seguridad al navegador.
    return $u === null ? null : ['nombre' => $u['Usuario'], 'email' => $u['Email'],
        'perfil' => $u['Perfil'], 'avatar' => $u['Avatar'], 'creado_en' => $u['CreadoEn']];
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
// ==================== ALTA DE USUARIO ====================
function AltaUsuario(): void
{
    global $usuarios;
    abrirUsuarios();
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
    foreach ($usuarios as $u) {
        if (strcasecmp($u['Usuario'], $nombre) === 0 || strcasecmp($u['Email'], $email) === 0) {
            responder(409, ['ok' => false, 'error' => 'El usuario o correo ya está registrado.']);
        }
    }
    $usuarios[] = [
        'Usuario' => $nombre, 'Contraseña' => password_hash($clave, PASSWORD_DEFAULT),
        'Email' => $email, 'Perfil' => 'user', 'Pregunta' => $pregunta,
        'Respuesta' => password_hash($respuesta, PASSWORD_DEFAULT),
        'Id' => bin2hex(random_bytes(16)), 'Version' => 1,
        'Avatar' => $avatar, 'CreadoEn' => date('Y-m-d H:i:s')
    ];
    guardarUsuarios();
    currentUser(count($usuarios) - 1);
}
// ==================== CAMBIO DE CONTRASEÑA ====================
function CambioContraseña(): void
{
    global $usuarios;
    abrirUsuarios();
    limitarIntentos('recuperacion');
    $indice = buscarUsuario(campo('usuario'));
    $clave = secreto('nueva'); validarClave($clave);
    if ($clave !== secreto('confirmar')) responder(422, ['ok' => false, 'error' => 'Las contraseñas nuevas no coinciden.']);
    $respuesta = campo('respuesta');
    if ($indice === null || strlen($respuesta) > 72 ||
        $usuarios[$indice]['Pregunta'] !== campo('pregunta') ||
        !password_verify($respuesta, $usuarios[$indice]['Respuesta'])) {
        responder(401, ['ok' => false, 'error' => 'Usuario, pregunta o respuesta incorrectos.']);
    }
    $usuarios[$indice]['Contraseña'] = password_hash($clave, PASSWORD_DEFAULT);
    $usuarios[$indice]['Version']++; // Invalida los accesos con la contraseña anterior.
    guardarUsuarios();
    unset($_SESSION['intentos']['recuperacion']);
    // Tras cambiarla se vuelve a pedir el acceso con la nueva contraseña.
    currentUser(null);
}
