<?php
// Buscar parte de un nombre
require_once "conexion.php";

$texto = "lo";

$patron = "%" . $texto . "%";

$sql = "SELECT nombre
        FROM alumnos
        WHERE nombre LIKE ?";

$consulta = $db->prepare($sql);

$consulta->bind_param("s", $patron);

$consulta->execute();

$resultado = $consulta->get_result();

if ($resultado->num_rows === 0) {
    echo "No hay coincidencias";
} else {
    while ($fila = $resultado->fetch_assoc()) {
        echo htmlspecialchars($fila["nombre"]) . "<br>";
    }
}

$resultado->free();
$consulta->close();
$db->close();
