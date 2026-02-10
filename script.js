/* ============================================
   FISIO Clinic - JavaScript Principal
   ============================================ */

const WHATSAPP_NUMBER = '34643567201';
const WHATSAPP_MESSAGE = 'Hola, quisiera más información sobre sus servicios.';

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar inmediatamente ya que el header es estático
    initializeAll();
});

/**
 * Inicializa todas las funcionalidades
 */
function initializeAll() {
    console.log('🚀 Inicializando funcionalidades...');
    initializeContactForm();
    initializeModal();
    initializeSmoothScroll();
    updateWhatsAppLinks();
}

/**
 * Actualiza todos los enlaces de WhatsApp con el número y mensaje configurados
 */
function updateWhatsAppLinks() {
    const links = document.querySelectorAll('a[data-whatsapp-link]');
    const message = encodeURIComponent(WHATSAPP_MESSAGE);
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    links.forEach(link => {
        link.href = href;
    });
}

// Escuchar evento de carga de secciones para actualizar enlaces en el footer y otras secciones
document.addEventListener('sectionsLoaded', function() {
    updateWhatsAppLinks();
    
    // Inicializar menú móvil después de que el header se haya cargado
    initializeMobileMenu();
    
    // Inicializar Swipers
    initSwipers();

    // Inicializar AOS con configuración global
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Manejar scroll a sección si hay hash en la URL
    handleHashNavigation();
});

function initSwipers() {
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper no está cargado');
        return;
    }

    // Inicializar carrusel de testimonios
    if (document.querySelector('.testimonials-swiper')) {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true, // Loop infinito
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
        });
    }
}



/* ============================================
   MENÚ MÓVIL
   ============================================ */

/**
 * Inicializa la funcionalidad del menú móvil
 * Permite abrir/cerrar el menú en dispositivos móviles
 */
function initializeMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuButton || !mobileMenu) {
        console.warn('⚠ Elementos del menú móvil no encontrados');
        return;
    }

    console.log('✓ Menú móvil encontrado, inicializando...');
    setupMobileMenu(menuButton, mobileMenu);
}

/**
 * Configura los event listeners del menú móvil
 */
function setupMobileMenu(menuButton, mobileMenu) {
    // Limpiar eventos anteriores
    const newMenuButton = menuButton.cloneNode(true);
    menuButton.parentNode.replaceChild(newMenuButton, menuButton);

    // Toggle menú móvil al hacer clic en el botón
    newMenuButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu(mobileMenu);
    });

    // Ocultar el menú móvil al hacer clic en cualquier enlace
    const menuLinks = mobileMenu.querySelectorAll('a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu(mobileMenu);
        });
    });
    
    console.log('✓ Menú móvil configurado correctamente');
}

/**
 * Alterna la visibilidad del menú móvil
 * @param {HTMLElement} menu - Elemento del menú móvil
 */
function toggleMobileMenu(menu) {
    const isHidden = menu.classList.contains('hidden');
    
    if (isHidden) {
        menu.classList.remove('hidden');
        menu.classList.add('block');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('block');
    }
}

/**
 * Cierra el menú móvil
 * @param {HTMLElement} menu - Elemento del menú móvil
 */
function closeMobileMenu(menu) {
    menu.classList.add('hidden');
    menu.classList.remove('block');
}

/* ============================================
   FORMULARIO DE CONTACTO
   ============================================ */

/**
 * Inicializa la funcionalidad del formulario de contacto
 * Previene el envío por defecto y muestra modal de confirmación
 */
function initializeContactForm() {
    const form = document.querySelector('#contacto form');

    if (!form) {
        console.warn('Formulario de contacto no encontrado');
        return;
    }

    form.addEventListener('submit', handleFormSubmit);
}

/**
 * Maneja el envío del formulario de contacto
 * @param {Event} event - Evento de envío del formulario
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Obtener datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value.trim(),
        servicio: document.getElementById('servicio').value,
        motivo: document.getElementById('motivo').value.trim()
    };

    // Validar datos
    if (!validateFormData(formData)) {
        return;
    }

    // Estados visuales de carga
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando WhatsApp...';
    
    // Pequeño delay para mejorar la experiencia de usuario
    await new Promise(resolve => setTimeout(resolve, 800));

    // Construir mensaje de WhatsApp
    const mensaje = `Hola!\n` +
                    `Soy ${formData.nombre}.\n` +
                    `Estaba interesado/a en: *${formData.servicio}*.\n` +
                    `*Consulta:* ${formData.motivo}\n` +
                    `Gracias.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir WhatsApp
    window.open(url, '_blank');

    // Confirmación visual
    submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Listo!';
    submitBtn.classList.remove('bg-primary-teal', 'hover:bg-primary-teal-dark');
    submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
    
    // Mostrar modal y limpiar
    showConfirmation();
    form.reset();

    // Restaurar botón después de unos segundos
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        submitBtn.classList.add('bg-primary-teal', 'hover:bg-primary-teal-dark');
    }, 4000);
}

/**
 * Valida los datos del formulario
 * @param {Object} data - Datos del formulario
 * @returns {boolean} - true si los datos son válidos
 */
function validateFormData(data) {
    if (!data.nombre || !data.servicio || !data.motivo) {
        return false;
    }
    return true;
}

/* ============================================
   MODAL DE CONFIRMACIÓN
   ============================================ */

/**
 * Inicializa la funcionalidad del modal
 * Permite cerrar el modal al hacer clic fuera de él
 */
function initializeModal() {
    const modal = document.getElementById('confirmation-modal');

    if (!modal) {
        console.warn('Modal de confirmación no encontrado');
        return;
    }

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'confirmation-modal') {
            closeModal(modal);
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal(modal);
        }
    });
}

/**
 * Muestra el modal de confirmación
 */
function showConfirmation() {
    const modal = document.getElementById('confirmation-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        // Prevenir scroll del body cuando el modal está abierto
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Cierra el modal de confirmación
 * @param {HTMLElement} modal - Elemento del modal
 */
function closeModal(modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    // Restaurar scroll del body
    document.body.style.overflow = '';
}

/**
 * Función global para cerrar modal desde el HTML
 */
window.closeConfirmationModal = function() {
    const modal = document.getElementById('confirmation-modal');
    if (modal) {
        closeModal(modal);
    }
}

/* ============================================
   SMOOTH SCROLL (alternativa JavaScript)
   ============================================ */

/**
 * Inicializa scroll suave para enlaces internos
 * Alternativa para navegadores que no soportan scroll-behavior: smooth
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Si es solo "#", no hacer nada
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Maneja la navegación cuando hay un hash en la URL
 * Se ejecuta después de que las secciones se cargan
 */
function handleHashNavigation() {
    if (window.location.hash) {
        // Pequeño delay para asegurar que todas las secciones estén renderizadas
        setTimeout(() => {
            const targetId = window.location.hash;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300);
    }
}

/* ============================================
   UTILIDADES ADICIONALES
   ============================================ */

/**
 * Detecta si el usuario ha llegado a una sección (para animaciones)
 */
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar secciones para animaciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Resalta el enlace de navegación activo según la sección visible
 */
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary-teal');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary-teal');
            }
        });
    });
}

// Descomentar estas líneas si quieres activar funcionalidades adicionales
// initializeScrollAnimations();
// initializeActiveNavigation();
