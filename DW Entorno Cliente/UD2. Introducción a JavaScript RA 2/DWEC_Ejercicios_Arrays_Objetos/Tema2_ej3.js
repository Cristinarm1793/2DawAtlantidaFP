// 03 / Ficha de una persona
/*Propiedades, métodos y cadenas de plantilla
Crea un objeto persona con nombre «Laura», edad 24 y profesión «desarrolladora».
1. Muestra cada propiedad por separado en consola.
2. Añade el método describir(), que devuelva una cadena con los tres datos.
3. Llama al método y muestra lo que devuelve.
4. Cambia la edad a 25 y vuelve a llamarlo. No escribas los datos fijos dentro del método.

Comprueba tu resultado
Primera descripción: «Laura tiene 24 años y trabaja como desarrolladora».
Tras el cambio, la descripción debe indicar 25 años.*/

const persona = {nombre: "Laura", edad: 24, profesion: "desarolladora", describir() {return `${this.nombre} tiene ${this.edad} años y trabaja como ${this.profesion}`}};

console.log(persona.nombre);
console.log(persona.edad);
console.log(persona.profesion);
console.log(persona.describir());

persona.edad = 25;
console.log(persona.describir());