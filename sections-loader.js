/* ============================================
   CARGADOR DE SECCIONES MODULARES
   ============================================
   
   Este archivo maneja la carga dinámica de secciones HTML
   separadas para mejor organización y mantenibilidad.
============================================ */

/**
 * Configuración de secciones a cargar
 * Cada sección tiene un id y la ruta al archivo HTML
 */
const SECTIONS = [
    { id: 'header-placeholder', file: 'sections/header.html' },
    { id: 'hero-placeholder', file: 'sections/hero.html' },
    { id: 'services-placeholder', file: 'sections/services.html' },
    { id: 'about-placeholder', file: 'sections/about.html' },
    { id: 'convenios-placeholder', file: 'sections/convenios.html' },
    { id: 'contact-placeholder', file: 'sections/contact.html' },
    { id: 'footer-placeholder', file: 'sections/footer.html' },
    { id: 'modal-placeholder', file: 'sections/modal.html' }
];

/**
 * Carga una sección HTML desde un archivo externo
 * @param {string} elementId - ID del elemento donde cargar la sección
 * @param {string} filePath - Ruta al archivo HTML
 * @returns {Promise} - Promise que se resuelve cuando la sección se carga
 */
async function loadSection(elementId, filePath) {
    try {
        // Usar XMLHttpRequest en lugar de fetch para evitar problemas con Live Server
        const html = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', filePath + '?t=' + Date.now(), true);
            xhr.responseType = 'text';
            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error(`HTTP error! status: ${xhr.status}`));
                }
            };
            xhr.onerror = function() {
                reject(new Error('Network error'));
            };
            xhr.send();
        });
        
        const element = document.getElementById(elementId);
        
        if (element) {
            element.innerHTML = html;
            
            // Forzar reflow para asegurar que el navegador procese el HTML
            element.offsetHeight;
        }
        
    } catch (error) {
        console.error(`✗ Error cargando ${filePath}:`, error);
        
        // Mostrar mensaje de error al usuario
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p><strong>Error:</strong> No se pudo cargar la sección ${filePath}</p>
                </div>
            `;
        }
    }
}

/**
 * Carga todas las secciones configuradas
 * @returns {Promise} - Promise que se resuelve cuando todas las secciones están cargadas
 */
async function loadAllSections() {
    // Cargar todas las secciones en paralelo para mejor rendimiento
    const promises = SECTIONS.map(section => 
        loadSection(section.id, section.file)
    );
    
    await Promise.all(promises);
    
    // Usar requestAnimationFrame para asegurar que el DOM esté completamente actualizado
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Disparar evento personalizado cuando todas las secciones estén cargadas
            document.dispatchEvent(new Event('sectionsLoaded'));
        });
    });
}

/**
 * Inicializar la carga de secciones cuando el DOM esté listo
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllSections);
} else {
    // DOMContentLoaded ya se disparó
    loadAllSections();
}

// Exportar funciones para uso en otros scripts si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadSection, loadAllSections };
}
