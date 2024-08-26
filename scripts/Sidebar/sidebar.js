document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

 // Função para desconectar o usuário da conta do Google
 function signOut() {
    google.accounts.id.disableAutoSelect();
    // Redirecione para a página de login ou faça outras ações de logout, se necessário
    window.location.href = "https://seusite.com/form.html"; // Altere para o URL correto da página de login
}