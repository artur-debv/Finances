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
    const Sidebar = document.querySelector('.sidebar'); // Seletor para o sidebar
    const Menu = document.querySelector('.menu'); // Seletor para o botão/menu que abre o sidebar

    // Verifica se a largura da tela é menor ou igual a 900px (configuração para mobile)
    if (window.innerWidth <= 900) {
        // Verifica se o clique ocorreu fora do Sidebar e do Menu (botão que abre o sidebar)
        if (!Sidebar.contains(event.target) && !Menu.contains(event.target)) {
            Sidebar.classList.remove('open-sidebar'); // Fecha o sidebar removendo a classe
        }
    }
});