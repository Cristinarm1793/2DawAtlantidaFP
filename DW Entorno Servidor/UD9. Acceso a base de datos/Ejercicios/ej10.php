<?php
// Actualizar una edad
require_once "conexion.php";

$dni = "77777777A";
$nuevaEdad = 21;

$sql = "UPDATE alumnos
        SET edad = ?
        WHERE dni = ?";

$stmt = $db->prepare($sql);

$stmt->bind_param("is", $nuevaEdad, $dni);

$stmt->execute();

if ($stmt->affected_rows === 1) {
    echo "Edad actualizada";
} else {
    echo "No se ha modificado ninguna fila";
}

$stmt->close();
$db->close();
