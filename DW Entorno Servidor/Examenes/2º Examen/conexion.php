<?php
// 01. Crear la conexión
/* Escribe conexion.php: activa MYSQLI_REPORT_ERROR y MYSQLI_REPORT_STRICT, conecta con la base
centro utilizando las variables indicadas y configura utf8mb4. No muestres la contraseña ni el texto
interno de una excepción.
$host = 'localhost';
$usuario = 'dwes_app';
$clave = 'CLAVE';
$base = 'centro';
 */

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {

    $db = new mysqli(
        "localhost",
        "dwes_app",
        "CLAVE",
        "centro"
    );

    $db->set_charset("utf8mb4");
} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());

    exit("Error al conectar con la base de datos");
}
