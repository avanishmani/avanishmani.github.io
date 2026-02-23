/* ===========================
   Particle Background Canvas
   =========================== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: undefined, y: undefined };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interaction
        if (mouse.x !== undefined) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                this.x -= dx * 0.01;
                this.y -= dy * 0.01;
            }
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const opacity = (1 - dist / 150) * 0.12;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===========================
   Scroll Reveal (multiple types)
   =========================== */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right').forEach((el) => {
    revealObserver.observe(el);
});

/* ===========================
   Typing Animation
   =========================== */
const typedTextEl = document.getElementById('typedText');
const cursorEl = document.getElementById('cursor');
const phrases = [
    'Software Developer',
    'Backend Engineer',
    'API Architect',
    'IRCTC Platform Builder',
    'Java Specialist',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // pause before next word
    }

    setTimeout(type, typingSpeed);
}
setTimeout(type, 1000);

/* ===========================
   Animated Counters
   =========================== */
function animateCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach((el) => {
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current + '+';
        }, 50);
    });

    document.querySelectorAll('.stat-number[data-text]').forEach((el) => {
        const text = el.getAttribute('data-text');
        let i = 0;
        const timer = setInterval(() => {
            i++;
            if (i > text.length) {
                clearInterval(timer);
                return;
            }
            el.textContent = text.substring(0, i);
        }, 80);
    });
}

// Trigger counters when hero is visible
const heroObserver = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    },
    { threshold: 0.5 }
);
heroObserver.observe(document.querySelector('.hero-stats'));

/* ===========================
   3D Tilt Effect on Image
   =========================== */
function initTiltEffect(element, intensity = 15) {
    if (!element) return;
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -intensity;
        const rotateY = ((x - centerX) / centerX) * intensity;
        const target = element.querySelector('.hero-image-frame') || element.querySelector('.mosaic-main');
        if (target) target.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    element.addEventListener('mouseleave', () => {
        const target = element.querySelector('.hero-image-frame') || element.querySelector('.mosaic-main');
        if (target) target.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
}

initTiltEffect(document.getElementById('heroImageWrapper'), 12);
initTiltEffect(document.querySelector('.about-image-mosaic'), 8);

/* ===========================
   Animated Skill Bars
   =========================== */
const skillBarObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                    bar.classList.add('animated');
                });
                skillBarObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

document.querySelectorAll('.skills-categories').forEach((el) => {
    skillBarObserver.observe(el);
});

/* ===========================
   Experience Tabs
   =========================== */
document.querySelectorAll('.exp-nav-item').forEach((item) => {
    item.addEventListener('click', () => {
        // Remove active from all
        document.querySelectorAll('.exp-nav-item').forEach((n) => n.classList.remove('active'));
        document.querySelectorAll('.exp-panel').forEach((p) => p.classList.remove('active'));

        // Set active
        item.classList.add('active');
        const panelId = item.getAttribute('data-exp');
        document.getElementById(panelId).classList.add('active');
    });
});

/* ===========================
   Navbar — Scroll & Active Link
   =========================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ===========================
   Mobile Nav Toggle
   =========================== */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinksEl.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

/* ===========================
   Theme Toggle
   =========================== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

function applyTheme() {
    if (localStorage.getItem('portfolio-theme') === 'light') {
        document.body.classList.add('light');
        themeIcon.className = 'bx bx-sun';
    } else {
        document.body.classList.remove('light');
        themeIcon.className = 'bx bx-moon';
    }
}
applyTheme();

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    themeIcon.className = isLight ? 'bx bx-sun' : 'bx bx-moon';
});

/* ===========================
   GitHub Calendar
   =========================== */
if (typeof GitHubCalendar === 'function') {
    // Using a verified working proxy to handle GitHub's layout and fix stats parsing
    GitHubCalendar('.calendar', 'Avanishipsator', {
        responsive: true,
        tooltips: true,
        proxy: (username) => {
            return fetch(`https://api.bloggify.net/gh-calendar/?username=${username}`)
                .then(r => r.text());
        }
    });
}

/* ===========================
   Contact Form Submission
   =========================== */
$('#email_form').submit((e) => {
    e.preventDefault();
    $('#submit').prop('disabled', true);

    let data = {
        name: $('#name').val(),
        email: $('#email').val(),
        message: $('#message').val(),
        _captcha: false,
        _next: '',
    };
    if ($('#subject').val()) data.subject = $('#subject').val();

    $.ajax({
        method: 'POST',
        url: 'https://formsubmit.co/avanishmanitripathi@gmail.com',
        accepts: 'application/json',
        data: data,
    })
        .done(() => {
            showModal('Thank you for reaching out! I will get back to you as soon as possible.');
            $('#email_form').trigger('reset');
        })
        .fail(() => {
            showModal('Something went wrong. Please try again or email me directly.');
        })
        .always(() => {
            $('#submit').prop('disabled', false);
        });
});

function showModal(msg) {
    document.getElementById('popup-message').textContent = msg;
    document.getElementById('popupModal').classList.add('show');
}

/* ===========================
   Smooth Scroll
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ===========================
   Parallax on Scroll (subtle)
   =========================== */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.mesh-gradient').forEach((el, i) => {
        const speed = 0.03 + i * 0.02;
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });
});
