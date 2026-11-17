<?php
// Insertar una matrícula
require_once "conexion.php";

$dni = "77777777A";
$codigo = 1;
$anio = 2026;
$nota = 7.5;

$sql = "INSERT INTO matriculas (dni, codigo, anio, nota)
        VALUES (?, ?, ?, ?)";

$stmt = $db->prepare($sql);

$stmt->bind_param("siid", $dni, $codigo, $anio, $nota);

$stmt->execute();

echo "Filas insertadas: " . $stmt->affected_rows;

$stmt->close();
$db->close();
