// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-bs-theme', newTheme);
    
    // Switch Icon
    themeToggle.innerHTML = newTheme === 'light' 
        ? '<i class="bi bi-moon-stars"></i>' 
        : '<i class="bi bi-sun"></i>';
});

// Scroll Reveal Logic
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);
// Run once on load
reveal();