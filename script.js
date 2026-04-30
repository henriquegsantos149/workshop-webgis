// Script WebGIS v1.4 - Super Robust Version
console.log('Script WebGIS v1.4 carregado');

// Funcao de log segura
function log(msg) {
    console.log('[Workshop]: ' + msg);
}

document.addEventListener('DOMContentLoaded', () => {
    log('DOM carregado, iniciando scripts...');

    // 1. Delegacao de Eventos para Botoes (Mais Robusto)
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.open-modal');
        if (target) {
            e.preventDefault();
            const modal = document.getElementById('registrationModal');
            if (modal) {
                log('Abrindo modal via delegacao');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            return;
        }

        // Close modal button
        if (e.target.closest('.close-modal')) {
            const modal = document.getElementById('registrationModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            return;
        }

        // Smooth scroll delegation
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            const href = anchor.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });

    // 2. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 3. Modal Click Outside
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 4. Form Submission Logic
    const CHECKOUT_URL = "https://pay.voompcreators.com.br/14529";

    function setupForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            log('Configurando form: ' + formId);
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                log('Form enviado: ' + formId);
                
                const nameInput = form.querySelector('input[type="text"]');
                const emailInput = form.querySelector('input[type="email"]');
                const telInput = form.querySelector('input[type="tel"]');

                if (!nameInput.value || !emailInput.value || !telInput.value) {
                    alert('Por favor, preencha todos os campos.');
                    return;
                }

                // Redirect
                log('Redirecionando para: ' + CHECKOUT_URL);
                window.location.href = CHECKOUT_URL;
            });
        }
    }

    setupForm('registrationForm');
    setupForm('modalRegistrationForm');

    // 5. Sticky CTA Visibility
    const stickyCta = document.querySelector('.sticky-cta');
    if (stickyCta) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });
    }
});

// Global Error Handler para diagnostico
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Erro detectado:', message, 'em', source, 'linha:', lineno);
    return false;
};
