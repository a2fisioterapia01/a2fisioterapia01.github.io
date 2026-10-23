/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./sections/**/*.html",
    "./script.js",
    "./google-reviews.js",
    "./instagram-feed.js",
  ],
  theme: {
    extend: {
      colors: {
        "primary-teal": "#6a3a88",
        "primary-teal-light": "#8e5ab3",
        "primary-teal-dark": "#4a2563",
        "accent-orange": "#6a3a88",
        "bg-light": "#F8FBFB",
        "text-dark": "#686868",
      },
    },
  },
  plugins: [],
};
