/**
 * google-reviews.js (OPTIMIZADO)
 * Carga reseñas de Google Places API solo si está configurado
 */

const GOOGLE_PLACE_ID = 'TU_PLACE_ID_AQUI';

function initGoogleReviews() {
    // No ejecutar si no está configurado
    if (GOOGLE_PLACE_ID === 'TU_PLACE_ID_AQUI') return;
    
    // Verificar API de Google Maps
    if (!window.google?.maps?.places) return;

    const container = document.getElementById('google-reviews-container');
    if (!container) return;

    // Crear servicio de lugares
    // Se requiere un elemento dummy para inicializar el servicio aunque no usemos mapa
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const request = {
        placeId: GOOGLE_PLACE_ID,
        fields: ['reviews', 'rating', 'user_ratings_total'] // Solicitamos reseñas y rating general
    };

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            
            // Si hay reseñas, limpiar el contenedor (borrar los ejemplos)
            container.innerHTML = '';

            // Actualizar si es necesario el resumen general (opcional)
            // updateOverallRating(place.rating, place.user_ratings_total);

            // Limitar a las 6 reseñas más recientes o relevantes para el carrusel
            const reviewsToShow = place.reviews.slice(0, 6); 

            reviewsToShow.forEach((review, index) => {
                const slide = createReviewSlide(review, index); // Function renamed/updated
                container.appendChild(slide);
            });
            
            // Refrescar AOS (animaciones) y Swiper
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 500); 
            }
            initTestimoniosSwiper();

        } else {
            console.error('Error obteniendo reseñas de Google:', status);
        }
    });
}

function initTestimoniosSwiper() {
    if (typeof Swiper === 'undefined') return;
    
    // Destruir instancia previa si existe
    const swiperContainer = document.querySelector('.testimonials-swiper');
    if (swiperContainer && swiperContainer.swiper) {
        swiperContainer.swiper.destroy(true, true);
    }

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

function createReviewSlide(review, index) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide h-auto'; // Clase necesaria para swiper

    const card = document.createElement('div');
    
    // Mismas clases que el diseño original + h-full + mx-2
    card.className = "bg-white p-6 rounded-2xl shadow-md border border-gray-100 relative hover:shadow-xl transition-all duration-300 h-full mx-2";
    
    // Atributos AOS
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());

    // Generar estrellas HTML
    let starsHtml = '';
    const rating = Math.round(review.rating);
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>'; // Estrella vacía si fuera necesario
        }
    }

    // Obtener inicial o usar foto
    const initial = review.author_name.charAt(0).toUpperCase();

    const avatarHtml = review.profile_photo_url 
        ? `<img src="${review.profile_photo_url}" alt="${review.author_name}" class="w-10 h-10 rounded-full mr-3 object-cover">`
        : `<div class="w-10 h-10 rounded-full bg-primary-teal text-white flex items-center justify-center font-bold mr-3 text-sm">${initial}</div>`;
        

    card.innerHTML = `
        <div class="flex items-center mb-4">
            ${avatarHtml}
            <div>
                <h4 class="font-bold text-gray-800 text-sm">${review.author_name}</h4>
                <div class="flex text-yellow-400 text-xs mt-0.5">
                    ${starsHtml}
                    <span class="text-gray-400 ml-2 font-normal">${review.relative_time_description || ''}</span>
                </div>
            </div>
            <!-- Icono Google corregido -->
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" class="absolute top-6 right-6 w-5 h-5">
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">
            "${review.text.length > 150 ? review.text.substring(0, 150) + '...' : review.text}"
        </p>
    `;

    slide.appendChild(card);
    return slide;
}