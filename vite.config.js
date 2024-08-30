import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://localhost:1337', // Your backend URL
    //       changeOrigin: true,
    //       secure: false, // Set to true if your backend uses HTTPS
    //       rewrite: (path) => path.replace(/^\/api/, ''),

    //     }
    //   }
    // }
  };
});