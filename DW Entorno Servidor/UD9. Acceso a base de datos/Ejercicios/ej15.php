<?php
// Alta segura completa
require_once "conexion.php";

$dni = "88888888B";
$nombre = "Pedro García";
$edad = 22;

$codigo = 2;
$anio = 2026;
$nota = 7.5;

try {

    $sql1 = "INSERT INTO alumnos (dni, nombre, edad)
             VALUES (?, ?, ?)";

    $consulta1 = $db->prepare($sql1);
    $consulta1->bind_param("ssi", $dni, $nombre, $edad);
    $consulta1->execute();
    $consulta1->close();

    $sql2 = "INSERT INTO matriculas (dni, codigo, anio, nota)
             VALUES (?, ?, ?, ?)";

    $consulta2 = $db->prepare($sql2);
    $consulta2->bind_param("siid", $dni, $codigo, $anio, $nota);
    $consulta2->execute();
    $consulta2->close();

    echo "Alumno y matrícula insertados correctamente";
} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());

    echo "Error al realizar el alta";
}

$db->close();
