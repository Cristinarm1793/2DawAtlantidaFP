<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio 3</title>
</head>
<body>
    <?php
        /*Codificar una página en PHP que cree un array posicional el cual llevará los
        siguientes valores:
        Posición 0: X
        Posición 1: Y
        Posición 2: Z
        Posición 3: X+Y
        Posición 4: Y*Z
        Posición 5: X/Z
        Posición 6: X+Y+Z
        Posición 7: (Y+Z) / X 
        Tenemos que declarar y dar valor a las variables X,Y,Z Todos los valores
        deben estar almacenados en las posiciones del array.
        Una vez creado, mostrarlo en una tabla igual a la mostrada, respetando tanto
        contenido como formato.
        Podéis añadir más operaciones si queréis.*/

        $X = 3;
        $Y = 4;
        $Z = 5;

        $matriz[0] = $X;
        $matriz[1] = $Y;
        $matriz[2] = $Z;
        $matriz[3] = $X+$Y;
        $matriz[4] = $Y*$Z;
        $matriz[5] = $X/$Z;
        $matriz[6] = $X+$Y+$Z;
        $matriz[7] = ($Y+$Z)/$X;
    ?>

        <TABLE BORDER="1" CELLPADDING='2' CELLSPACING="2">
            <TR ALIGN="center" BGCOLOR="yellow">
                <TD></TD>
                <TD>Posicion 0</TD>
                <TD>Posicion 1</TD>
                <TD>Posicion 2</TD>
                <TD>Posicion 3</TD>
                <TD>Posicion 4</TD>
                <TD>Posicion 5</TD>
                <TD>Posicion 6</TD>
                <TD>Posicion 7</TD>
            </TR>
        
            <TR ALIGN="center">
                <TD BGCOLOR="yellow">Matriz</TD>
                <TD> <?php echo $matriz[0] ?> </TD> 
                <TD> <?php echo $matriz[1] ?> </TD> 
                <TD> <?php echo $matriz[2] ?> </TD> 
                <TD> <?php echo $matriz[3] ?> </TD> 
                <TD> <?php echo $matriz[4] ?> </TD> 
                <TD> <?php echo $matriz[5] ?> </TD> 
                <TD> <?php echo $matriz[6] ?> </TD> 
                <TD> <?php echo $matriz[7] ?> </TD> 
            </TR>
</body>
</html>