const panel = document.querySelector("#panel");
const interior = document.querySelector("#interior");
panel.addEventListener("click", () => console.log("captura"),
 { capture: true });
interior.addEventListener("click", () => console.log("botón"));
panel.addEventListener("click", () => console.log("burbujeo"));
