<?php
// Listar alumnos
require_once "conexion.php";

$sql = "SELECT nombre, edad FROM alumnos ORDER BY nombre ASC";

$resultado = $db->query($sql);

echo "Total de alumnos: " . $resultado->num_rows;

echo "<table border='1'>";
echo "<tr><th>Nombre</th><th>Edad</th></tr>";

while ($fila = $resultado->fetch_assoc()) {

    echo "<tr>";

    echo "<td>" . htmlspecialchars($fila["nombre"]) . "</td>";

    echo "<td>" . (int)$fila["edad"] . "</td>";

    echo "</tr>";
}

echo "</table>";

$resultado->free();
$db->close();
