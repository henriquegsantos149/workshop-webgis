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

// Google Apps Script Integration
// IMPORTANTE: Substitua pela URL gerada ao implantar o script na sua planilha
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyjfp5lN2POiyCTQgYP52STQO1gKkJmRy9L2JiJ48hZF8DnLYyhlylTfIde_NCt0SCb/exec';

const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = registrationForm.querySelector('button');
        const originalBtnText = submitBtn.innerText;
        
        submitBtn.disabled = true;
        submitBtn.innerText = 'ENVIANDO...';

        const formData = {
            nome: registrationForm.querySelector('input[type="text"]').value,
            email: registrationForm.querySelector('input[type="email"]').value,
            whatsapp: registrationForm.querySelector('input[type="tel"]').value
        };

        // Envio para o Google Apps Script
        fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', 
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(() => {
            alert('Obrigado por se inscrever! Seus dados foram salvos na planilha com sucesso.');
            registrationForm.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao salvar os dados. Verifique a conexão ou a URL do script.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        });
    });
}

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
