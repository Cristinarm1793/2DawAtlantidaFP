<?php
// 05. Insertar un alumno
/* Inserta el alumno mediante una sentencia preparada. Muestra «Alumno insertado» únicamente si
affected_rows vale 1. No concatenes los valores en el SQL.
$dni = '88888888B';
$nombre = 'Lucía Vega';
$edad = 22;*/

require_once "conexion.php";

try {
    $dni = '88888888B';
    $nombre = 'Lucía Vega';
    $edad = 22;

    $sql = "INSERT INTO alumnos (dni, nombre, edad)
            VALUES (?, ?, ?)";

    $consulta = $db->prepare($sql);

    $consulta->bind_param("ssi", $dni, $nombre, $edad);

    $consulta->execute();

    echo "Filas insertadas: " . $consulta->affected_rows;

    $consulta->close();
} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());
    echo "Error al insertar el alumno";
}

$db->close();
