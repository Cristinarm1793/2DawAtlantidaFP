<?php
/* Configuración compartida. SQLite requiere pdo_sqlite habilitado en PHP. */
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

function responder(int $codigo, array $datos): void
{
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

function exigirPost(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        responder(405, ['ok' => false, 'error' => 'Método no permitido.']);
    }

    $origen = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($origen !== '') {
        $host = parse_url($origen, PHP_URL_HOST);
        $puerto = parse_url($origen, PHP_URL_PORT);
        $hostActual = $_SERVER['HTTP_HOST'] ?? '';
        $hostOrigen = $host . ($puerto ? ':' . $puerto : '');

        if (!hash_equals($hostActual, $hostOrigen)) {
            responder(403, ['ok' => false, 'error' => 'Origen no autorizado.']);
        }
    }

    if (
        !hash_equals($_SESSION['csrf'] ?? '', (string)($_POST['csrf'] ?? ''))
        || empty($_SESSION['csrf'])
    ) {
        responder(403, [
            'ok' => false,
            'error' => 'Sesión de formulario caducada. Recarga la página.'
        ]);
    }
}

function campo(string $nombre): string
{
    $valor = $_POST[$nombre] ?? '';
    return is_string($valor) ? trim($valor) : '';
}

function baseDatos(): PDO
{
    try {
        $directorio = dirname(__DIR__) . '/datos_privados';

        if (
            !is_dir($directorio)
            && !mkdir($directorio, 0700, true)
            && !is_dir($directorio)
        ) {
            throw new RuntimeException('No se puede crear el directorio de datos.');
        }

        $db = new PDO('sqlite:' . $directorio . '/museum404.sqlite');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->exec('PRAGMA busy_timeout=5000');

        $db->exec(
            'CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )'
        );

        $db->exec(
            'CREATE TABLE IF NOT EXISTS mensajes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT NOT NULL,
                asunto TEXT NOT NULL,
                mensaje TEXT NOT NULL,
                creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )'
        );

        return $db;
    } catch (Throwable $e) {
        responder(500, [
            'ok' => false,
            'error' => 'No se pudo abrir la base de datos. Comprueba PDO_SQLITE y los permisos.'
        ]);
    }
}

function usuarioActual(PDO $db): ?array
{
    if (empty($_SESSION['usuario_id'])) {
        return null;
    }

    $consulta = $db->prepare(
        'SELECT id, nombre, email, creado_en FROM usuarios WHERE id = ?'
    );

    $consulta->execute([$_SESSION['usuario_id']]);

    return $consulta->fetch(PDO::FETCH_ASSOC) ?: null;
}