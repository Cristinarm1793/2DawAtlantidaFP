<?php 
// 03. Buscar desde una edad
/* Prepara una consulta que muestre nombre y edad de los alumnos cuya edad sea igual o superior al valor
indicado. Ordena por edad y nombre. Si no hay filas, muestra «Sin coincidencias».
$edadMinima = 21;
 */
require_once "conexion.php";

try {
    
    $edadMinima = 21;

    $sql = "SELECT nombre, edad 
    FROM alumnos 
    WHERE edad > ? 
    ORDER BY edad, nombre";

    $consulta = $db->prepare($sql);
    $consulta->bind_param("i", $edadMinima);
    $consulta->execute();
    $resultado = $consulta->get_result();

    while ($fila = $resultado->fetch_assoc()) {
        $n = htmlspecialchars($fila["nombre"]);
        $e = (int)$fila["edad"];

        echo $n . "-" . $e . "<br>";
    } 

    $resultado->free();
    $consulta->close();

} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());
    echo "Error";
}

$db->close();