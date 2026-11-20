<?php
// Insertar un alumno
require_once "conexion.php";

$dni = "77777777A";
$nombre = "Ana Martín";
$edad = 20;

$sql = "INSERT INTO alumnos (dni, nombre, edad)
        VALUES (?, ?, ?)";

$consulta = $db->prepare($sql);

$consulta->bind_param("ssi", $dni, $nombre, $edad);

$consulta->execute();

echo "Filas insertadas: " . $consulta->affected_rows;

$consulta->close();
$db->close();
