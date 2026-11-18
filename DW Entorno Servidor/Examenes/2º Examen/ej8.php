<?php 
// 08. Informe por año
/* Crea una consulta preparada que reciba un año y muestre alumno, asignatura y nota de todas las
matrículas de ese año. Utiliza JOIN con alumnos y asignaturas, ordena por nombre del alumno y
asignatura y muestra los resultados en una tabla. Si la nota es NULL, muestra «Pendiente».
$anio = 2026; */

require_once "conexion.php";

try {
    $anio = 2026;

    $sql = "SELECT alumnos.nombre AS alumno,
                   asignaturas.nombre AS asignatura,
                   matriculas.anio,
            FROM alumnos
            LEFT JOIN matriculas ON alumnos.dni = matriculas.dni
            LEFT JOIN asignaturas ON matriculas.codigo = asignaturas.codigo
            WHERE alumnos.dni = ?
            ORDER BY matriculas.anio DESC, asignaturas.nombre";

    $stmt = $db->prepare($sql);

    $stmt->bind_param("s", $dni);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 0) {

        echo "Alumno no encontrado";

    } else {

        while ($fila = $resultado->fetch_assoc()) {

            echo "Alumno: " . htmlspecialchars($fila["alumno"]) . "<br>";

            if ($fila["asignatura"] === null) {

                echo "Sin matrículas<br>";

            } else {

                echo "Asignatura: " . htmlspecialchars($fila["asignatura"]) . "<br>";

                if ($fila["anio"] === null) {

                    echo "Pendiente<br>";

                } else {

                    echo  (int)$fila["anio"] . "<br>";
                }
            }

            echo "<hr>";
        }
    }

    $resultado->free();
    $stmt->close();

} catch (mysqli_sql_exception $e) {

    error_log($e->getMessage());
    echo "Error al realizar el informe";
}

$db->close();