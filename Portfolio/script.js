// =========================================
// Initialize Lucide Icons
// =========================================
lucide.createIcons();

// =========================================
// Mobile Menu Toggle
// =========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// =========================================
// Active Nav Link Highlight on Scroll
// =========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// =========================================
// Typing Effect
// =========================================
const typingText = document.querySelector('.typing-text');
const words = ['Aspiring PhD Researcher', 'AI/ML Enthusiast', 'Computer Vision Researcher', 'Data Analyst'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(type, typeSpeed);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', type);

// =========================================
// Canvas Dot-Matrix Animation with Mouse Parallax
// =========================================
const canvas = document.getElementById('dot-grid');
const ctx = canvas.getContext('2d');

let width, height;
let dots = [];
const dotSpacing = 40;
const mouse = { x: null, y: null, radius: 150 };

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initDots();
}

function initDots() {
    dots = [];
    const cols = Math.ceil(width / dotSpacing);
    const rows = Math.ceil(height / dotSpacing);
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            dots.push({
                x: i * dotSpacing,
                y: j * dotSpacing,
                baseX: i * dotSpacing,
                baseY: j * dotSpacing,
                size: 1.5
            });
        }
    }
}

function animateDots() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    
    dots.forEach(dot => {
        let dx = mouse.x - dot.x;
        let dy = mouse.y - dot.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * 15;
            const directionY = forceDirectionY * force * 15;
            
            dot.x = dot.baseX - directionX;
            dot.y = dot.baseY - directionY;
        } else {
            dot.x = dot.baseX;
            dot.y = dot.baseY;
        }
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    requestAnimationFrame(animateDots);
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', resizeCanvas);

// Initialize canvas
resizeCanvas();
animateDots();

// =========================================
// Scroll-Triggered Fade-In Animations
// =========================================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// =========================================
// Contact Form Handling
// =========================================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        formSuccess.classList.add('show');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }, 1500);
    
    // Note: For actual backend integration, replace setTimeout with:
    // fetch('YOUR_FORMSPREE_ENDPOINT', {
    //     method: 'POST',
    //     body: new FormData(contactForm)
    // })
});

// =========================================
// Back to Top Button
// =========================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});