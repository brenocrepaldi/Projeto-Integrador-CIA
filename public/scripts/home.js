export function menuSuspenso(submenu) {
  subMenu.addEventListener("click", () => {
    subMenu.classList.toggle("active");
  });
  alert("Arquivo de função carregado com sucesso!");
}
module.exports({
  menuSuspenso,
});
