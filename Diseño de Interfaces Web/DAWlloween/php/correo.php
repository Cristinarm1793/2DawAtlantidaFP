<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Location: ../contacto.html');
    exit;
}
require_once __DIR__ . '/funciones.php';
exigirPost();
$usuario = usuarioPublico();
if ($usuario === null) responder(401, ['ok' => false, 'error' => 'Inicia sesión antes de escribir a Jack.']);
$asunto = campo('asunto');
$mensaje = campo('mensaje');
$asuntos = ['consulta' => 'Consulta', 'anomalia' => 'Anomalía', 'sugerencia' => 'Sugerencia', 'otro' => 'Pesadilla u otro mensaje'];
if (!isset($asuntos[$asunto]) || $mensaje === '' || strlen($mensaje) > 12000 || preg_match_all('/./us', $mensaje) > 3000) {
    responder(422, ['ok' => false, 'error' => 'Selecciona un asunto y escribe un mensaje de hasta 3000 caracteres.']);
}
// El remitente procede de la sesión, no de un email manipulado en el formulario.
$email = $usuario['email'];
$config = require __DIR__ . '/config-correo.local.php';
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
$headers = [
    'From' => $desde,
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8'
];
try {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_usuario'];
    $mail->Password = $config['smtp_password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = (int) $config['smtp_port'];

    $mail->CharSet = 'UTF-8';

    $mail->setFrom($config['remitente_smtp'], 'Museum 404');
    $mail->addAddress($destino);
    $mail->addReplyTo($email, $usuario['nombre']);

    $mail->Subject = '[Museum 404] ' . $asuntos[$asunto];
    $mail->Body = $cuerpo;
    $mail->isHTML(false);

    $mail->send();

    responder(200, [
        'ok' => true,
        'mensaje' => 'Mensaje enviado'
    ]);
} catch (Exception $error) {
    error_log('Museum 404 - Error SMTP: ' . $error->getMessage());

    responder(502, [
        'ok' => false,
        'error' => 'No hemos podido enviar tu mensaje. Inténtalo de nuevo.'
    ]);
}
