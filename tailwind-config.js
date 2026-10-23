/* Ya no se carga en la web. Los colores viven en tailwind.config.js
   y el CSS que sirve la página es tailwind.css (npm run build:css). */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-teal': '#6a3a88',
                'primary-teal-light': '#8e5ab3',
                'primary-teal-dark': '#4a2563',
                'accent-orange': '#6a3a88',
                'bg-light': '#F8FBFB',
                'text-dark': '#686868',
            },
        }
    }
};
