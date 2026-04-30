// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple Scroll Reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section, .feature-card, .hero-content, .instructor-image, .instructor-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Fade in Hero content faster
setTimeout(() => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
}, 100);

// Modal Logic
const modalOverlay = document.getElementById('modalOverlay');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButton = document.querySelector('.close-modal');

const toggleModal = (show) => {
    if (show) {
        modalOverlay.style.display = 'flex';
        setTimeout(() => modalOverlay.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    } else {
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
};

openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => toggleModal(true));
});

closeModalButton.addEventListener('click', () => toggleModal(false));

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) toggleModal(false);
});

// Generic Form Handler
const handleFormSubmission = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const whatsapp = form.querySelector('input[type="tel"]').value.trim();
        
        // Validation
        if (!nome || !email || !whatsapp) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Brazilian WhatsApp Regex (simple version: (XX) XXXXX-XXXX or XX XXXXX-XXXX or XXXXXXXXXXX)
        const whatsappRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
        if (!whatsappRegex.test(whatsapp.replace(/\s/g, ''))) {
             // If not matching strict, check if at least it has 10-11 digits
             const digits = whatsapp.replace(/\D/g, '');
             if (digits.length < 10 || digits.length > 11) {
                alert('Por favor, insira um WhatsApp válido com DDD.');
                return;
             }
        }

        const submitBtn = form.querySelector('button');
        const originalBtnText = submitBtn.innerText;
        
        submitBtn.disabled = true;
        submitBtn.innerText = 'ENVIANDO...';

        const formData = {
            nome: nome,
            email: email,
            whatsapp: whatsapp
        };

        // Redirect to checkout immediately
        window.location.href = 'https://pay.voompcreators.com.br/14529';
    });
};

handleFormSubmission('registrationForm');
handleFormSubmission('modalRegistrationForm');

// Sticky CTA Visibility
const stickyCta = document.getElementById('stickyCta');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (heroSection && stickyCta) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom < 0) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    }
});
