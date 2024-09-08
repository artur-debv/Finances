document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});


function signOut() {
    google.accounts.id.disableAutoSelect();

    window.location.href = "https://seusite.com/form.html";
}