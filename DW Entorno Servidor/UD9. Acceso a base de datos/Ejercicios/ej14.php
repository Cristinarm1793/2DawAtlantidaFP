<?php
// Informe de un alumno
require_once "conexion.php";

$dni = "22222222B";

$sql = "SELECT a.nombre AS alumno,
               asi.nombre AS asignatura,
               m.anio,
               m.nota
        FROM alumnos a
        LEFT JOIN matriculas m ON a.dni = m.dni
        LEFT JOIN asignaturas asi ON m.codigo = asi.codigo
        WHERE a.dni = ?
        ORDER BY m.anio DESC, asi.nombre";

$consulta = $db->prepare($sql);

$consulta->bind_param("s", $dni);

$consulta->execute();

$resultado = $consulta->get_result();

if ($resultado->num_rows === 0) {
    echo "Alumno no encontrado";
} else {
    while ($fila = $resultado->fetch_assoc()) {
        echo htmlspecialchars($fila["alumno"]) . " - ";

        if ($fila["asignatura"] === null) {
            echo "Sin matrículas";
        } else {
            echo htmlspecialchars($fila["asignatura"]);
            echo " - " . $fila["anio"];
            echo " - " . ($fila["nota"] === null ? "Pendiente" : $fila["nota"]);
        }

        echo "<br>";
    }
}

$resultado->free();
$consulta->close();
$db->close();
