
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",             // For rotens HTML-fil
    "./src/**/*.{js,css,html}",     // Alle JavaScript- og HTML-filer i src-mappen
    "./public/**/*.{js,html}"   // Eventuelle filer i public-mappen, hvis de bruker Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
