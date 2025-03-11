function disconnectUser() {
    localStorage.removeItem('jwtToken');
    if (typeof google.accounts !== 'undefined' && google.accounts.id) {
        try {
            google.accounts.id.revoke();
            window.location.href = "https://finances-three-rose.vercel.app/Form.html";
        } catch (error) {
            console.error('Erro ao revogar o token de autenticação:', error);
        }
    } else {
        console.error('Biblioteca google.accounts não carregada corretamente.');
    }

}