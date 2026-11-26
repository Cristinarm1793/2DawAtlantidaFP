// 09 · Código con alternativas
/* // Implementa esta función:
function codigoValido(texto) {
 // ...
}
Devuelve true solo para un código completo formado por VIN o CD, un
guion, tres dígitos ASCII y, opcionalmente, una letra ASCII mayúscula
final. Ejemplos válidos: VIN-123 y CD-007A. No elimines espacios. Usa
regex y test(). Añade cuatro pruebas propias: dos válidas y dos
inválidas, indicando el resultado. */

function codigoValido(texto) {
  const patronCodigo = /^(VIN|CD)-[0-9]{3}[A-Z]?$/;
  return patronCodigo.test(texto);
}

console.log("VIN-482 →", codigoValido("VIN-482")); // true
console.log("CD-005Z →", codigoValido("CD-005Z")); // true
console.log("CD-45B →", codigoValido("CD-45B")); // false: faltaría un dígito
console.log("VIN-999  →", codigoValido("VIN-999 ")); // false: sobra un espacio
