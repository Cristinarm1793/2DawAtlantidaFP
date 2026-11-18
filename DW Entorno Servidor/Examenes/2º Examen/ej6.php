<?php
// 06. Actualizar una nota
/* Actualiza únicamente la nota de la matrícula identificada por DNI, código y año. Utiliza los cuatro
parámetros y muestra «Nota actualizada» si se modifica una fila o «Sin cambios» si affected_rows vale 0.
$nuevaNota = 7.75;
$dni = '55555555Z';
$codigo = 2;
$anio = 2026;*/

require_once "conexion.php";

try {
    $nuevaNota = 7.75;
    $dni = '55555555Z';
    $codigo = 2;
    $anio = 2026;

    $sql = "UPDATE alumnos SET nota = ?
            WHERE dni = ? AND codigo = ? AND anio = ?";

    $consulta = $db->prepare($sql);

    $consulta->bind_param("dsii", $notaNueva, $dni, $codigo, $anio);
    $consulta->execute();

    if ($consulta->affected_rows === 1) {
        echo "nota actualizada";
    } else {

        echo "Sin cambios";
    }

    $consulta->close();
} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());
    echo "Error al actualizar la nota";
}

$db->close();
