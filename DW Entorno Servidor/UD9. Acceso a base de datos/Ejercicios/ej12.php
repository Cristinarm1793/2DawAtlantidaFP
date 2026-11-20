<?php
// Actualizar una nota
require_once "conexion.php";

$dni = "77777777A";
$codigo = 1;
$anio = 2026;
$nuevaNota = 8.25;

$sql = "UPDATE matriculas
        SET nota = ?
        WHERE dni = ?
          AND codigo = ?
          AND anio = ?";

$consulta = $db->prepare($sql);

$consulta->bind_param("dsii", $nuevaNota, $dni, $codigo, $anio);

$consulta->execute();

echo "Filas modificadas: " . $consulta->affected_rows;

$consulta->close();
$db->close();
