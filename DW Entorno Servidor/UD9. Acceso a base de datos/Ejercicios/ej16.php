<?php
// Corregir código inseguro
require_once "conexion.php";

$nombre = $_GET["nombre"] ?? "";

$sql = "SELECT dni, nombre
        FROM alumnos
        WHERE nombre = ?";

$consulta = $db->prepare($sql);

$consulta->bind_param("s", $nombre);

$consulta->execute();

$resultado = $consulta->get_result();

while ($fila = $resultado->fetch_assoc()) {

    echo htmlspecialchars($fila["dni"]) . " - ";

    echo htmlspecialchars($fila["nombre"]) . "<br>";
}

$resultado->free();
$consulta->close();
$db->close();
