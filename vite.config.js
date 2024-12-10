import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Angir roten til prosjektet ditt (kan justeres hvis nødvendig)
  build: {
    outDir: 'dist', // Output-mappen for produksjonsbygget
    emptyOutDir: true, // Tømmer output-mappen før bygging
  },
  server: {
    port: 3000, // Endre port hvis ønskelig
    open: true, // Åpner nettleseren automatisk
  },
  resolve: {
    alias: {
      '@': '/src', // Forenkler imports fra "src"-mappen
    },
  },
  publicDir: 'public', // Mappen for offentlige filer som ikke må bygges
});