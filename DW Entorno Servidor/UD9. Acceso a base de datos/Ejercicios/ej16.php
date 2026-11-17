<?php
// Corregir código inseguro
require_once "conexion.php";

$nombre = $_GET["nombre"] ?? "";

$sql = "SELECT dni, nombre
        FROM alumnos
        WHERE nombre = ?";

$stmt = $db->prepare($sql);

$stmt->bind_param("s", $nombre);

$stmt->execute();

$resultado = $stmt->get_result();

while ($fila = $resultado->fetch_assoc()) {

    echo htmlspecialchars($fila["dni"]) . " - ";

    echo htmlspecialchars($fila["nombre"]) . "<br>";
}

$resultado->free();
$stmt->close();
$db->close();
