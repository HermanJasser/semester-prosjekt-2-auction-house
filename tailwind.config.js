/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  
    "./**/*.html",
    "./src/**/*.{js,css,html}",
    "./public/**/*.{js,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
