<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
    /* Crear un documento PHP en el que se cree un array asociativo para contener
    los datos de una mascota: nombre de la mascota, familia, raza, color, peso,
    altura y edad. Rellenar dicho array con los valores de una mascota y
    mostrarlo en una tabla. */

    $matriz[0] = "Bandit";
    $matriz[1] =  "Felino";
    $matriz[2] = "Bombay";
    $matriz[3] =  "Negro";
    $matriz[4] =  "4";
    $matriz[5] =  "25";
    $matriz[6] =  "2";
    ?>

    <TABLE BORDER="1" CELLPADDING='2' CELLSPACING="2">
            <TR ALIGN="center" BGCOLOR="yellow">
                <TD></TD>
                <TD>Nombre</TD>
                <TD>Familia</TD>
                <TD>Raza</TD>
                <TD>Color</TD>
                <TD>Peso</TD>
                <TD>Altura</TD>
                <TD>Edad</TD>
            </TR>
        
            <TR ALIGN="center">
                <TD BGCOLOR="yellow">Animal</TD>
                <TD> <?php echo $matriz[0] ?> </TD> 
                <TD> <?php echo $matriz[1] ?> </TD> 
                <TD> <?php echo $matriz[2] ?> </TD> 
                <TD> <?php echo $matriz[3] ?> </TD> 
                <TD> <?php echo $matriz[4] ?> </TD> 
                <TD> <?php echo $matriz[5] ?> </TD> 
                <TD> <?php echo $matriz[6] ?> </TD> 
            </TR>
</body>
</html>