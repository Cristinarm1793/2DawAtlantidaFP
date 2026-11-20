<?php
// Buscar por dos edades
require_once "conexion.php";

$edad1 = 21;
$edad2 = 24;

$sql = "SELECT nombre, edad
        FROM alumnos
        WHERE edad = ? OR edad = ?";

$consulta = $db->prepare($sql);

$consulta->bind_param("ii", $edad1, $edad2);

$consulta->execute();

$resultado = $consulta->get_result();

while ($fila = $resultado->fetch_assoc()) {
    echo htmlspecialchars($fila["nombre"]);
    echo " - " . $fila["edad"] . " años<br>";
}

$resultado->free();
$consulta->close();
$db->close();
