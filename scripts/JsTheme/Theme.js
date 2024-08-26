document.addEventListener('DOMContentLoaded', () => {
    const mode = document.getElementById('mode_icon');
    const form = document.querySelector('.darkmode');
    const form2 = document.querySelector('.mode');

    function setTheme(theme) {
        if (theme === 'dark') {
            mode.classList.remove('fa-moon');
            mode.classList.add('fa-sun');
            form.classList.add('dark');
            form2.classList.add('select');
        } else {
            mode.classList.remove('fa-sun');
            mode.classList.add('fa-moon');
            form.classList.remove('dark');
            form2.classList.remove('select');
        }
    }

    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }

    function setThemeFromPreference() {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const systemPreference = prefersDarkScheme.matches ? 'dark' : 'light';
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', systemPreference);
        }
        setTheme(localStorage.getItem('theme'));
    }

    setThemeFromPreference();

    mode.addEventListener('click', () => {
        toggleTheme();
    });
});
