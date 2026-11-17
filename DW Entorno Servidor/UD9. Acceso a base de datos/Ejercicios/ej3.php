<?php
// Ordenar y limitar
require_once "conexion.php";

$sql = "SELECT nombre, edad
        FROM alumnos
        ORDER BY edad DESC
        LIMIT 2";

$resultado = $db->query($sql);

while ($fila = $resultado->fetch_assoc()) {

    echo htmlspecialchars($fila["nombre"]);
    echo " - " . $fila["edad"] . " años<br>";
}

$resultado->free();
$db->close();
