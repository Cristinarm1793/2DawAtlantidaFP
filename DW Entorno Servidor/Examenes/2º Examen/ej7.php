<?php
// 07. Eliminar una matrícula
/* Elimina mediante una sentencia preparada la matrícula indicada por su clave completa. Muestra
«Matrícula eliminada» si se borra una fila y «No encontrada» si no se borra ninguna.
$dni = '22222222B';
$codigo = 1;
$anio = 2025; */

require_once "conexion.php";

try {

    $dni = '22222222B';
    $codigo = 1;
    $anio = 2025;

    $sql = "DELETE FROM matriculas
            WHERE dni = ? AND codigo = ? AND anio = ?";

    $consulta = $db->prepare($sql);

    $consulta->bind_param("dsii", $nuevaNota, $dni, $codigo, $anio);

    $consulta->execute();

    if ($consulta->affected_rows === 1) {

        echo "Matrícula eliminada";
    } else {

        echo "No encontrada";
    }

    $consulta->close();
} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());
    echo "Error al eliminar la matrícula";
}

$db->close();
