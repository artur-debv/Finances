const Menu = document.getElementById("icon_menuBar")
const Button_Close = document.getElementById("open_btn")
const Sidebar = document.getElementById("sidebar")

Menu.addEventListener("click",()=>{
    Sidebar.classList.add('open-sidebar');
})

Button_Close.addEventListener("click",()=>{
    Sidebar.classList.remove('open-sidebar');
})