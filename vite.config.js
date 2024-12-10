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
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  base: '/', // Sørg for korrekt base-URL for distribusjon
  publicDir: 'public', // Mappen for offentlige filer
  build: {
    target: 'esnext', // Støtter moderne JavaScript-funksjoner
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Forenkler imports
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      svgo: {},
    }),
  ],
});

