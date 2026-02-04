const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const navbar = document.querySelector('.navbar');
const progressBar = document.querySelector('.scroll-progress');
const skillsTile = document.querySelector('.skills-tile');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setTheme = (theme) => {
    html.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.innerHTML = theme === 'light'
        ? '<i class="bi bi-moon-stars"></i>'
        : '<i class="bi bi-sun"></i>';
};

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    themeToggle.animate([
        { transform: 'scale(0.95)' },
        { transform: 'scale(1)' }
    ], { duration: 220, easing: 'cubic-bezier(0.2, 0.6, 0.2, 1)' });
});

const revealElements = () => {
    const reveals = document.querySelectorAll('[data-reveal="true"]');
    reveals.forEach((el, index) => {
        el.style.transitionDelay = `${index * 90}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    reveals.forEach(el => observer.observe(el));
};

const updateScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    if (navbar) {
        navbar.classList.toggle('scrolled', scrollTop > 10);
    }

    document.documentElement.style.setProperty('--scroll', scrollTop);
};

const setupSkillsSequence = () => {
    if (!skillsTile) return;
    const tags = skillsTile.querySelectorAll('.skill-tag');
    if (!tags.length) return;
    skillsTile.classList.add('skills-ready');
    tags.forEach(tag => {
        const delay = tag.getAttribute('data-delay') || 0;
        tag.style.transitionDelay = `${delay}ms`;
    });
};

const applyMagneticHover = () => {
    const tiles = document.querySelectorAll('.bento-item');
    const canHover = window.matchMedia('(hover: hover)').matches;
    if (!canHover) return;
    tiles.forEach(tile => {
        let rafId = null;
        const strength = tile.classList.contains('project-tile') ? 16 : 10;

        const handleMove = (event) => {
            const rect = tile.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            const rotateX = (-y / rect.height) * 6;
            const rotateY = (x / rect.width) * 6;

            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                tile.style.transform = `translate3d(${x / strength}px, ${y / strength}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        };

        const handleLeave = () => {
            if (rafId) cancelAnimationFrame(rafId);
            tile.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
        };

        tile.addEventListener('mousemove', handleMove);
        tile.addEventListener('mouseleave', handleLeave);
    });
};

const setupSmoothScroll = () => {
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
};

window.addEventListener('scroll', updateScroll);
window.addEventListener('load', () => {
    const initialTheme = html.getAttribute('data-bs-theme') || 'light';
    setTheme(initialTheme);
    updateScroll();
    revealElements();
    setupSkillsSequence();
    if (!prefersReducedMotion) {
        applyMagneticHover();
    }
    setupSmoothScroll();
});

window.addEventListener('resize', updateScroll);
