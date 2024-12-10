/*import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Angir roten til prosjektet ditt (kan justeres hvis nødvendig)
  build: {
    target: 'esnext',
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
});*/


import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // Rotmappen til prosjektet
  build: {
    target: 'esnext',
    outDir: 'dist', // Output-mappen for bygging
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  publicDir: 'public', // Sørger for at `_redirects` blir inkludert
});
