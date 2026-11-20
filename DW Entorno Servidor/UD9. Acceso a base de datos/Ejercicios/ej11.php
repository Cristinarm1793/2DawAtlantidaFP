<?php
// Insertar una matrícula
require_once "conexion.php";

$dni = "77777777A";
$codigo = 1;
$anio = 2026;
$nota = 7.5;

$sql = "INSERT INTO matriculas (dni, codigo, anio, nota)
        VALUES (?, ?, ?, ?)";

$consulta = $db->prepare($sql);

$consulta->bind_param("siid", $dni, $codigo, $anio, $nota);

$consulta->execute();

echo "Filas insertadas: " . $consulta->affected_rows;

$consulta->close();
$db->close();
