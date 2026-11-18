<?php
// Buscar por nombre
/* Prepara una consulta que busque alumnos cuyo nombre contenga el texto indicado. Construye el patrón
con % en PHP, ejecuta la consulta y muestra el DNI y el nombre de cada coincidencia.
$texto = 'a'; */

require_once "conexion.php";

try {

    $texto = 'a';
    $patron = "%" . $texto . "%";

    $sql = "SELECT nombre, dni
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
            echo htmlspecialchars($fila["nombre"]);
            echo  " - " . $fila["dni"] . "<br>";
        }
    }

    $resultado->free();
    $consulta->close();

} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());
    echo "Error al realizar la consulta";
}

$db->close();