"use strict";
const btnCadastro = document.getElementById("btn-cadastro");
async function toggleMenu(event) {
    console.log(event);
}
btnCadastro?.addEventListener("pointerdown", toggleMenu);
