<?php
// Actualizar una edad
require_once "conexion.php";

$dni = "77777777A";
$nuevaEdad = 21;

$sql = "UPDATE alumnos
        SET edad = ?
        WHERE dni = ?";

$consulta = $db->prepare($sql);

$consulta->bind_param("is", $nuevaEdad, $dni);

$consulta->execute();

if ($consulta->affected_rows === 1) {
    echo "Edad actualizada";
} else {
    echo "No se ha modificado ninguna fila";
}

$consulta->close();
$db->close();
