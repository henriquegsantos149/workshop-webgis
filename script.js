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
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTpG15UVZRXt1VzdPRbcgIsOh8S6h21COLXC3SyBrJ_OBY9yKzcgaTvO-j8wYXN8YW/exec";

    function setupForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            log('Configurando form: ' + formId);
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                log('Iniciando submissão rápida: ' + formId);
                
                const formData = new FormData(form);
                const data = {
                    nome: formData.get('nome'),
                    email: formData.get('email'),
                    whatsapp: formData.get('whatsapp')
                };

                // Validação básica
                if (!data.nome || !data.email || !data.whatsapp) {
                    alert('Por favor, preencha todos os campos.');
                    return;
                }

                // Captura todos os parâmetros UTM da URL
                const urlParams = new URLSearchParams(window.location.search);
                const utms = {};
                urlParams.forEach((value, key) => {
                    if (key.toLowerCase().startsWith('utm_')) {
                        utms[key] = value;
                    }
                });

                // Envio usando URLSearchParams (form-urlencoded)
                const params = new URLSearchParams();
                params.append('nome', data.nome);
                params.append('email', data.email);
                params.append('whatsapp', data.whatsapp);
                
                // Adiciona as UTMs capturadas ao envio
                Object.keys(utms).forEach(key => {
                    params.append(key, utms[key]);
                });

                fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    keepalive: true,
                    body: params
                }).catch(err => console.error('Erro no fetch:', err));

                // Adiciona as UTMs à URL de checkout
                const finalCheckoutUrl = new URL(CHECKOUT_URL);
                Object.keys(utms).forEach(key => {
                    finalCheckoutUrl.searchParams.append(key, utms[key]);
                });

                // Pequeno delay (300ms) para garantir o disparo
                setTimeout(() => {
                    window.location.href = finalCheckoutUrl.toString();
                }, 300);
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
