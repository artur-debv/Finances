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
    if (window.innerWidth <= 900) {  // Verifica se a largura da tela é menor ou igual a 768px
        // Verifica se o clique foi fora do sidebar e do menu
        if (!Sidebar.contains(event.target) && !Menu.contains(event.target)) {
            Sidebar.classList.remove('open-sidebar'); // Remove a classe

            // Reseta os estilos
            Sidebar.style.display = "none";
            Sidebar.style.width = "0";
        }
    }
});