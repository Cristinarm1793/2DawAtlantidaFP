<?php
/* CONFIGURACIÓN MANUAL DEL CORREO DE PRUEBAS.
 * No escribas aquí contraseñas: las credenciales SMTP van en sendmail.ini de XAMPP.
 */
return [
    // Destinatario fijo: el formulario no puede modificar esta dirección.
    'destinatario' => 'g78409890@gmail.com',

    // Opcional: cuenta autenticada en SMTP si el proveedor exige que coincida el From.
    // Vacío = From del usuario identificado, tal como indica el enunciado.
    // Si se configura, el correo del visitante queda en Reply-To y en el cuerpo.
    'remitente_smtp' => '',
];
