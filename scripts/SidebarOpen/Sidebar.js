const Menu = document.getElementById("icon_menuBar");
const Button_Close = document.getElementById("open_btn");
const Sidebar = document.getElementById("sidebar");

// Abre a sidebar ao clicar no ícone do menu
Menu.addEventListener("click", () => {
    Sidebar.classList.add('open-sidebar');
    Sidebar.style.display = "flex";
    Sidebar.style.minWidth = "15%";
    console.log(Sidebar)
});

// Fecha a sidebar ao clicar no botão de fechar
Button_Close.addEventListener("click", () => {
    Sidebar.classList.remove('open-sidebar');
    Sidebar.style.display = "none";
});