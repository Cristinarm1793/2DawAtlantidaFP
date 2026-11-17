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

$stmt = $db->prepare($sql);

$stmt->bind_param("s", $dni);

$stmt->execute();

$resultado = $stmt->get_result();

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
$stmt->close();
$db->close();
