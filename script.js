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

// Smooth scroll to contact section
document.addEventListener('DOMContentLoaded', () => {
    const contactBtn = document.getElementById('contactBtn');
    const contactTile = document.querySelector('.contact-tile');

    contactBtn.addEventListener('click', () => {
        contactTile.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


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
const setupSmoothScroll = () => {
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
};
const hobbies = [
    { img: "/assets/cooking-food.png", label: "Cooking Food" },
    { img: "/assets/running.png", label: "Early Morning Runs" },
    { img: "/assets/playing-online-games.png", label: "Playing Online Games" },
    { img: "/assets/art.png", label: "Making Art" },
    { img: "/assets/produce-music.png", label: "Producing Music" }
];

let hobbyIndex = 0;
let hobbyInterval = null;
let autoTimer;

const hobbyDisplay = document.getElementById("hobbyDisplay");
const hobbyLabel = document.getElementById("hobbyLabel");
const hobbyImage = document.getElementById('hobbyImage');
const hobbyText = document.getElementById('hobbyText');

const switchHobby = () => {
    if (!hobbyImage || !hobbyLabel) return;

    hobbyImage.style.opacity = 0;

    setTimeout(() => {
        hobbyIndex = (hobbyIndex + 1) % hobbies.length;
        hobbyImage.src = hobbies[hobbyIndex].img;
        hobbyLabel.textContent = hobbies[hobbyIndex].label;
        hobbyImage.style.opacity = 1;
    }, 350);
};


const startHobbyRotation = () => {
    if (prefersReducedMotion) return;
    hobbyInterval = setInterval(switchHobby, 3200);
};

const stopHobbyRotation = () => {
    clearInterval(hobbyInterval);
};

const prevBtn = document.getElementById('prevHobby');
const nextBtn = document.getElementById('nextHobby');

// Function to show a hobby by index
const showHobby = (index) => {
    if (!hobbyImage || !hobbyLabel) return;

    hobbyImage.classList.add('fade-change');

    setTimeout(() => {
        hobbyIndex = (index + hobbies.length) % hobbies.length; // ensures circular
        hobbyImage.src = hobbies[hobbyIndex].img;
        hobbyLabel.textContent = hobbies[hobbyIndex].label;
        hobbyImage.classList.remove('fade-change');
    }, 200);
};

// Click Events
prevBtn.addEventListener('click', () => {
    showHobby(hobbyIndex - 1);

    // Reset auto rotation timer
    clearInterval(hobbyInterval);
    startHobbyRotation();
});

nextBtn.addEventListener('click', () => {
    showHobby(hobbyIndex + 1);

    // Reset auto rotation timer
    clearInterval(hobbyInterval);
    startHobbyRotation();
});

window.addEventListener('scroll', updateScroll);
window.addEventListener('load', () => {
    const initialTheme = html.getAttribute('data-bs-theme') || 'light';
    setTheme(initialTheme);
    updateScroll();
    revealElements();
    setupSkillsSequence();
    startHobbyRotation();
    if (!prefersReducedMotion) {
        applyMagneticHover();
    }
    setupSmoothScroll();
});

window.addEventListener('resize', updateScroll);
