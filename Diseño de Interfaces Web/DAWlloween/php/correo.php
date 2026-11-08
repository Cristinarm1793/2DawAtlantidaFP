<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Location: ../contacto.html'); exit;
}
require_once __DIR__ . '/VarGlobales.php';
exigirPost();
$usuario = usuarioPublico();
if ($usuario === null) responder(401, ['ok' => false, 'error' => 'Inicia sesión antes de escribir a Jack.']);
$asunto = campo('asunto'); $mensaje = campo('mensaje');
$asuntos = ['consulta' => 'Consulta', 'anomalia' => 'Anomalía', 'sugerencia' => 'Sugerencia', 'otro' => 'Pesadilla u otro mensaje'];
if (!isset($asuntos[$asunto]) || $mensaje === '' || strlen($mensaje) > 12000 || preg_match_all('/./us', $mensaje) > 3000) {
    responder(422, ['ok' => false, 'error' => 'Selecciona un asunto y escribe un mensaje de hasta 3000 caracteres.']);
}
// El remitente procede de la sesión, no de un email manipulado en el formulario.
$email = $usuario['email'];
$config = require __DIR__ . '/config-correo.php';
$destino = $config['destinatario'];
$desde = $config['remitente_smtp'] !== '' ? $config['remitente_smtp'] : $email;
foreach ([$destino, $desde, $email] as $direccion) {
    if (!filter_var($direccion, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $direccion)) {
        responder(503, ['ok' => false, 'error' => 'El correo de Jack todavía no está configurado. No se ha enviado el mensaje.']);
    }
}
limitarIntentos('correo', 3);
$cuerpo = "Mensaje para Jack Skellington\r\nVisitante: " . $usuario['nombre'] .
    "\r\nCorreo: " . $email . "\r\n\r\n" . str_replace(["\r\n", "\r"], "\n", $mensaje);
$cuerpo = str_replace("\n", "\r\n", str_replace("\r\n", "\n", $cuerpo));
$titulo = '=?UTF-8?B?' . base64_encode('[Museum 404] ' . $asuntos[$asunto]) . '?=';
$headers = ['From' => $desde, 'Reply-To' => $email,
    'MIME-Version' => '1.0', 'Content-Type' => 'text/plain; charset=UTF-8'];
$enviado = false;
// Convertir warnings de mail en un error controlado, sin romper el JSON.
set_error_handler(function () { return true; });
try {
    if (function_exists('mail')) $enviado = mail($destino, $titulo, $cuerpo, $headers);
} catch (Throwable $error) {
    $enviado = false;
} finally {
    restore_error_handler();
}
if (!$enviado) responder(502, ['ok' => false, 'error' => 'No hemos podido enviar tu mensaje. Conservamos el texto para que puedas intentarlo de nuevo.']);
responder(200, ['ok' => true, 'mensaje' => 'El servidor ha aceptado el envío. Comprueba la bandeja de entrada y spam del destinatario.']);
