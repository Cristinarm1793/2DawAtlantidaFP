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

$consulta = $db->prepare($sql);

$consulta->bind_param("sii", $dni, $codigo, $anio);

$consulta->execute();

if ($consulta->affected_rows === 1) {
    echo "Matrícula eliminada";
} else {
    echo "No encontrada";
}

$consulta->close();
$db->close();
