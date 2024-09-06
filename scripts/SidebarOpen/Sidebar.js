const Menu = document.getElementById("icon_menuBar");
const Button_Close = document.getElementById("open_btn");
const Sidebar = document.getElementById("sidebar");

// Abre a sidebar ao clicar no ícone do menu
Menu.addEventListener("click", () => {
    Sidebar.classList.add('open-sidebar');
    Sidebar.style.display = "flex";
    Sidebar.style.width = "160px";
    console.log(Sidebar)
});

document.addEventListener("click", (event) => {
   
    // Verifique se a largura da tela é menor ou igual a 900px
    if (window.innerWidth <= 900) {
        // Verifique se o clique foi fora do Sidebar e do Menu
        if (!Sidebar.contains(event.target)) {
            Sidebar.classList.remove('open-sidebar'); // Fecha o sidebar
        }
    }
});
