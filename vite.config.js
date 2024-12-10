import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000, // Endre port hvis nødvendig
  },
  build: {
    outDir: 'dist', // Endrer output mappe
  },
});
