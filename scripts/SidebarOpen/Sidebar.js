const Menu = document.getElementById("icon_menuBar");
const Button_Close = document.getElementById("open_btn");
const Sidebar = document.getElementById("sidebar");
const modeIcon = document.getElementById('mode_icon');


Menu.addEventListener("click", () => {
    Sidebar.classList.add('open-sidebar');
    Sidebar.style.display = "flex";
    Sidebar.style.width = "160px";
    console.log(Sidebar)
});

document.addEventListener("click", (event) => {
    // Verifique se a largura da janela é menor ou igual a 900
    if (window.innerWidth <= 900) {
        // Verifique se o clique não foi no sidebar, no menu ou no botão de troca de tema
        if (!Sidebar.contains(event.target) && !Menu.contains(event.target) && !modeIcon.contains(event.target)) {
            Sidebar.classList.remove('open-sidebar'); // Remove a classe
            Sidebar.style.display = "none";
            Sidebar.style.width = "0";
        }
    }
});