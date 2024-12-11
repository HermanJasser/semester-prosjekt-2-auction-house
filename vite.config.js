import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/', 
  publicDir: 'public',
  build: {
    target: 'esnext', 
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, '/login/index.html'),
        register: resolve(__dirname, '/register/index.html'),
        myPage: resolve(__dirname, '/minside/index.html'),
        newPost: resolve(__dirname, '/minside/nyannonse/index.html'),
        editProfile: resolve(__dirname, '/minside/redigerprofil/index.html'),
        editListing: resolve(__dirname, '/minside/redigerannonse/index.html'),
        myWins: resolve(__dirname, '/minside/minekjop/index.html'),
        myBids: resolve(__dirname, '/minside/minebud/index.html'),
        singleListing: resolve(__dirname, '/enkelpost/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

