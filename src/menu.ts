const btnCadastro = document.getElementById("btn-cadastro");

async function toggleMenu(event: PointerEvent) {
  console.log(event);
}
btnCadastro?.addEventListener("pointerdown", toggleMenu);
