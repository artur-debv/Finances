function disconnectUser() {
    localStorage.removeItem('jwtToken');
    // Verifica se a biblioteca está carregada
    if (typeof google.accounts !== 'undefined' && google.accounts.id) {
        try {

            google.accounts.id.revoke();

            // Redireciona para a página desejada após a desconexão (opcional)
            window.location.href = "https://dev-finance-seven-inky.vercel.app/Form.html";
        } catch (error) {
            console.error('Erro ao revogar o token de autenticação:', error);
            // Trate o erro aqui, se necessário
        }
    } else {
        console.error('Biblioteca google.accounts não carregada corretamente.');
    }

}