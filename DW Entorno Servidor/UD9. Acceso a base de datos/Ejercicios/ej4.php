<?php
// Buscar por edad máxima
require_once "conexion.php";

$limite = 22;

$sql = "SELECT nombre, edad
        FROM alumnos
        WHERE edad < ?
        ORDER BY edad, nombre";

$consulta = $db->prepare($sql);

$consulta->bind_param("i", $limite);

$consulta->execute();

$resultado = $consulta->get_result();

while ($fila = $resultado->fetch_assoc()) {

    echo htmlspecialchars($fila["nombre"]);
    echo " - " . $fila["edad"] . " años<br>";
}

$resultado->free();
$consulta->close();
$db->close();
