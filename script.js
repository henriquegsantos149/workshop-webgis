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

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
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

// Modal Logic
const modal = document.getElementById('registrationModal');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModal = document.querySelector('.close-modal');

if (modal) {
    openModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Form Submission Logic
function setupForm(formId, successId) {
    const form = document.getElementById(formId);
    const successMessage = document.getElementById(successId);

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const whatsapp = form.querySelector('input[type="tel"]').value;

            if (!name || !email || !whatsapp) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Simple Email Regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }

            // Redirect to Checkout
            window.location.href = "https://pay.voompcreators.com.br/14529";
        });
    }
}

setupForm('registrationForm', 'successMessage');
setupForm('modalRegistrationForm', 'modalSuccessMessage');

// Sticky CTA Visibility
const stickyCta = document.querySelector('.sticky-cta');
if (stickyCta) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            stickyCta.classList.add('active');
        } else {
            stickyCta.classList.remove('active');
        }
    });
}
