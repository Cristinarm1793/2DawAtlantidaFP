<?php
// Filtrar matrículas por nota
require_once "conexion.php";

$notaMinima = 5;

$sql = "SELECT a.nombre AS alumno,
               asi.nombre AS asignatura,
               m.anio,
               m.nota
        FROM matriculas m
        INNER JOIN alumnos a ON m.dni = a.dni
        INNER JOIN asignaturas asi ON m.codigo = asi.codigo
        WHERE m.nota >= ?
        ORDER BY m.nota DESC";

$consulta = $db->prepare($sql);

$consulta->bind_param("d", $notaMinima);

$consulta->execute();

$resultado = $consulta->get_result();

while ($fila = $resultado->fetch_assoc()) {
    echo htmlspecialchars($fila["alumno"]) . " - ";
    echo htmlspecialchars($fila["asignatura"]) . " - ";
    echo $fila["anio"] . " - ";
    echo $fila["nota"] . "<br>";
}

$resultado->free();
$consulta->close();
$db->close();
