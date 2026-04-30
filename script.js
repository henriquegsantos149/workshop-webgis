console.log('Script WebGIS v1.2 carregado');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM totalmente carregado');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href.startsWith('#')) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('FAQ itens encontrados:', faqItems.length);
    
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

    // Modal Logic
    const modal = document.getElementById('registrationModal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModal = document.querySelector('.close-modal');

    console.log('Botões de modal encontrados:', openModalButtons.length);

    if (modal) {
        openModalButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Abrindo modal');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Form Submission Logic
    function setupForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            console.log('Configurando formulário:', formId);
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = form.querySelector('input[type="text"]').value;
                const email = form.querySelector('input[type="email"]').value;
                const whatsapp = form.querySelector('input[type="tel"]').value;

                if (!name || !email || !whatsapp) {
                    alert('Por favor, preencha todos os campos.');
                    return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Por favor, insira um e-mail válido.');
                    return;
                }

                console.log('Redirecionando para checkout...');
                window.location.href = "https://pay.voompcreators.com.br/14529";
            });
        }
    }

    setupForm('registrationForm');
    setupForm('modalRegistrationForm');

    // Sticky CTA Visibility
    const stickyCta = document.querySelector('.sticky-cta');
    if (stickyCta) {
        console.log('Sticky CTA configurado');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });
    }

    // Intersection Observer (com fail-safe)
    const sections = document.querySelectorAll('section, .feature-card, .hero-content');
    if ('IntersectionObserver' in window) {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback para navegadores sem suporte
        sections.forEach(el => el.classList.add('revealed'));
    }
});
