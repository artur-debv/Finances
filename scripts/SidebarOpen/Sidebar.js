const Menu = document.getElementById("icon_menuBar");
const Button_Close = document.getElementById("open_btn");
const Sidebar = document.getElementById("sidebar");

// Abre a sidebar ao clicar no ícone do menu
Menu.addEventListener("click", () => {
    Sidebar.classList.add('open-sidebar');
    Sidebar.style.display = "flex";
    Sidebar.style.minWidth = "15%";
    Sidebar.style.width = "160px";
    console.log(Sidebar)
});

document.addEventListener("click", (event) => {
    if (window.innerWidth <= 900) {
        if (!Sidebar.contains(event.target) && !Menu.contains(event.target)) {
            Sidebar.classList.remove('open-sidebar'); // Fecha o sidebar suavemente
        }
    }
});

