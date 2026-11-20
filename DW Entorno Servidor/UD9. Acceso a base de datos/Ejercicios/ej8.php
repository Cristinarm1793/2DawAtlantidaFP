<?php
// Consultar matrículas por año
require_once "conexion.php";

$anio = 2026;

$sql = "SELECT a.nombre AS alumno,
               asi.nombre AS asignatura,
               m.nota
        FROM matriculas m
        INNER JOIN alumnos a ON m.dni = a.dni
        INNER JOIN asignaturas asi ON m.codigo = asi.codigo
        WHERE m.anio = ?";

$consulta = $db->prepare($sql);

$consulta->bind_param("i", $anio);

$consulta->execute();

$resultado = $consulta->get_result();

while ($fila = $resultado->fetch_assoc()) {
    echo htmlspecialchars($fila["alumno"]) . " - ";
    echo htmlspecialchars($fila["asignatura"]) . " - ";

    if ($fila["nota"] === null) {
        echo "Pendiente";
    } else {
        echo $fila["nota"];
    }

    echo "<br>";
}

$resultado->free();
$consulta->close();
$db->close();
