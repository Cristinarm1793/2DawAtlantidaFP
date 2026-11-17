<?php
// Insertar un alumno
require_once "conexion.php";

$dni = "77777777A";
$nombre = "Ana Martín";
$edad = 20;

$sql = "INSERT INTO alumnos (dni, nombre, edad)
        VALUES (?, ?, ?)";

$stmt = $db->prepare($sql);

$stmt->bind_param("ssi", $dni, $nombre, $edad);

$stmt->execute();

echo "Filas insertadas: " . $stmt->affected_rows;

$stmt->close();
$db->close();
