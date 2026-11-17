<?php
// Buscar parte de un nombre
require_once "conexion.php";

$texto = "lo";

$patron = "%" . $texto . "%";

$sql = "SELECT nombre
        FROM alumnos
        WHERE nombre LIKE ?";

$stmt = $db->prepare($sql);

$stmt->bind_param("s", $patron);

$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    echo "No hay coincidencias";
} else {
    while ($fila = $resultado->fetch_assoc()) {
        echo htmlspecialchars($fila["nombre"]) . "<br>";
    }
}

$resultado->free();
$stmt->close();
$db->close();
