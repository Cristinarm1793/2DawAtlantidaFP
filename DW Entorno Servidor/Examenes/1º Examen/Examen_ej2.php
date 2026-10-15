<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        /* 02. Aplicar un descuento · 0,75 puntos
        Si el importe alcanza los 100 euros, aplica un descuento del 10 %. En caso contrario, no apliques
        descuento. Calcula y muestra el importe final. El importe inicial será no negativo.
        $importe = 120; */

        $importe = 120;
        $descuento = 10;

        if ($importe >= 100){
            $importeD = $importe * 10 / 100;
            $importeF = $importe - $importeD;
        } elseif ($importe < 100) {
            $importeF = $importe;
        } else {
            echo "error";
        };

        echo "Importe final: " . $importeF;

    ?>
</body>
</html>
