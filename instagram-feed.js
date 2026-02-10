// Script para cargar el feed de Instagram
document.addEventListener('sectionsLoaded', function() {
    const feedContainer = document.getElementById('instagram-feed');
    if (!feedContainer) return;

    // Configuración
    // Reemplaza esto con tu token de acceso de larga duración
    // Puedes generar uno en developers.facebook.com
    const ACCESS_TOKEN = ''; // Dejar vacío para usar datos de ejemplo
    
    // Función para renderizar posts
    function renderPosts(posts) {
        feedContainer.innerHTML = '';
        posts.forEach((post, index) => {
            // Calcular delay para animación AOS
            const delay = (index % 4) * 100;
            
            const slide = document.createElement('div');
            slide.className = 'swiper-slide h-auto'; // Clase necesaria para Swiper

            const card = document.createElement('div');
            // Estilos de tarjeta alineados con el resto del sitio
            card.className = 'relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 bg-white aspect-square h-full mx-2';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', delay);
            
            // Manejar diferentes tipos de media
            let mediaHtml = '';
            if (post.media_type === 'VIDEO') {
                // Si hay thumbnail_url, la usamos. Si no, un icono.
                if (post.thumbnail_url) {
                    mediaHtml = `<img src="${post.thumbnail_url}" alt="${post.caption ? post.caption.slice(0, 50) : 'Instagram Post'}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">
                                 <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-white drop-shadow-lg"><i class="fas fa-play text-2xl"></i></div>`;
                } else {
                    mediaHtml = `<div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400"><i class="fas fa-video text-4xl"></i></div>`;
                }
            } else {
                mediaHtml = `<img src="${post.media_url}" alt="${post.caption ? post.caption.slice(0, 50) : 'Instagram Post'}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">`;
            }

            card.innerHTML = `
                <a href="${post.permalink}" target="_blank" class="block w-full h-full">
                    ${mediaHtml}
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <i class="fab fa-instagram text-white text-3xl"></i>
                    </div>
                </a>
            `;
            
            slide.appendChild(card);
            feedContainer.appendChild(slide);
        });

        // Inicializar Swiper después de renderizar
        initInstagramSwiper();
    }

    function initInstagramSwiper() {
        if (typeof Swiper === 'undefined') return;
        
        new Swiper('.instagram-swiper', {
            slidesPerView: 1,
            spaceBetween: 10,
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
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
            autoplay: {
                delay: 2500, // Un poco más rápido para dar sensación de movimiento
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // Pausar al pasar el ratón para ver el post
            },
        });
    }

    async function fetchInstagramPosts() {
        if (!ACCESS_TOKEN) {
            console.warn('Instagram Access Token no configurado. Mostrando datos de ejemplo.');
            // Datos de ejemplo para demostración basados en las publicaciones proporcionadas
            const mockPosts = [
                { 
                    media_type: 'IMAGE', 
                    // Usamos la foto del equipo local como ejemplo para "Fisioterapia a domicilio"
                    media_url: 'assets/equipo.jpg', 
                    permalink: 'https://www.instagram.com/a2fisioterapia_/', 
                    caption: 'FISIOTERAPIA A DOMICILIO 🚗🏠 Empezamos a cuidarte antes de abrir la clínica. ¡Reserva tu cita desde hoy! 📲 643567201' 
                },
                { 
                    media_type: 'IMAGE', 
                    // Usamos una imagen genérica o home.png para representar la variedad de servicios
                    media_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 
                    permalink: 'https://www.instagram.com/a2fisioterapia_/', 
                    caption: 'NUESTROS SERVICIOS ✨ En A2 Fisioterapia te ayudamos a moverte sin dolor y a recuperar tu calidad de vida. Tratamientos personalizados, Pilates, Tecnología avanzada...' 
                },
                { 
                    media_type: 'IMAGE', 
                    // Reciclamos foto equipo para "Conócenos"
                    media_url: 'assets/equipo.jpg', 
                    permalink: 'https://www.instagram.com/a2fisioterapia_/', 
                    caption: 'CONÓCENOS 👋 Equipo A2 Fisioterapia. ALBA y ANTONIO. Estamos aquí para ayudarte a avanzar y activarte.' 
                },
                { 
                    media_type: 'IMAGE', 
                    // Usamos el logo para "Próxima Apertura"
                    media_url: 'assets/logo.png', 
                    permalink: 'https://www.instagram.com/a2fisioterapia_/', 
                    caption: '¡PRÓXIMA APERTURA! 🚀 Fisioterapia avanzada y pilates terapéutico para cuidar de ti. Síguenos para no perderte nada.' 
                },
                // Repetimos posts de ejemplo para simular más contenido (8 posts en total)
                { 
                    media_type: 'IMAGE', 
                    media_url: 'https://images.unsplash.com/photo-1576091160550-21876ce7234f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 
                    permalink: 'https://www.instagram.com/a2fisioterapia_/', 
                    caption: 'Tratamiento manual y personalizado para el dolor de espalda. 💆‍♂️✨' 
                },
                { 
                    media_type: 'IMAGE', 
                    media_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 
                    permalink: 'https://www.instagram.com/a2fisioterapia_/', 
                    caption: 'Ejercicio terapéutico: clave para una recuperación completa. 🏋️‍♀️' 
                },
                { 
                    media_type: 'IMAGE', 
                    media_url: 'assets/equipo.jpg', 
                    permalink: 'https://www.instagram.com/a2fisioterapia_/', 
                    caption: 'Nuestro compromiso es tu salud. Pregúntanos cualquier duda. 💬' 
                },
                { 
                    media_type: 'IMAGE', 
                    media_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 
                    permalink: 'https://www.instagram.com/a2fisioterapia_/', 
                    caption: 'Estilo de vida saludable y prevención de lesiones. 🍎🧘‍♂️' 
                }
            ];
            renderPosts(mockPosts);
            return;
        }

        try {
            // URL para la API Basic Display de Instagram - LIMITAMOS A 8 POSTS AHORA
            const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${ACCESS_TOKEN}&limit=8`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtener posts de Instagram');
            
            const data = await response.json();
            renderPosts(data.data);
        } catch (error) {
            console.error('Error fetching Instagram posts:', error);
            // Fallback en caso de error
            feedContainer.innerHTML = '<div class="col-span-full text-center p-4 text-gray-500">No se pudieron cargar las publicaciones.</div>';
        }
    }

    // Iniciar carga
    fetchInstagramPosts();
});
