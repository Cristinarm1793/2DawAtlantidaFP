<?php
// Comprobar la conexión
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {

    $db = new mysqli("localhost", "root", "", "centro");

    $db->set_charset("utf8mb4");

    echo "Conexión correcta";

    $db->close();
} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());

    echo "Error al conectar";
}
