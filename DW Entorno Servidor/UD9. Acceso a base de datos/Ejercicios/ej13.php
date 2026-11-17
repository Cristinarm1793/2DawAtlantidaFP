<?php
// Eliminar una matrícula
require_once "conexion.php";

$dni = "77777777A";
$codigo = 1;
$anio = 2026;

$sql = "DELETE FROM matriculas
        WHERE dni = ?
          AND codigo = ?
          AND anio = ?";

$stmt = $db->prepare($sql);

$stmt->bind_param("sii", $dni, $codigo, $anio);

$stmt->execute();

if ($stmt->affected_rows === 1) {
    echo "Matrícula eliminada";
} else {
    echo "No encontrada";
}

$stmt->close();
$db->close();
