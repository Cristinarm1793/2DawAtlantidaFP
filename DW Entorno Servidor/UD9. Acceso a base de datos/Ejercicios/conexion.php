<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {

    $db = new mysqli(
        "localhost",
        "root",
        "",
        "centro"
    );

    $db->set_charset("utf8mb4");
} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());

    exit("Error al conectar con la base de datos");
}
