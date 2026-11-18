<?php 
// 02. Listado básico
/* Usando conexion.php, ejecuta una consulta fija que recupere nombre y edad de los alumnos ordenados
por edad descendente y después por nombre. Muestra una tabla HTML y el número total de alumnos.
Libera el resultado. */ 

require_once "conexion.php";

try {

    $sql = "SELECT nombre, edad 
        FROM alumnos 
        ORDER BY nombre ASC";

    $resultado = $db->query($sql);

    echo "Total de alumnos: " . $resultado->num_rows . "<br>";

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

} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());
    echo "Error al realizar la consulta";
}

$db->close();

