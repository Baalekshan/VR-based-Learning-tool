import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: 'webp',
        quality: '80',
        w: '800',
        as: 'picture'
      })
    })
  ],
  build: {
    outDir: path.resolve(__dirname, 'src/backend/dist/client'), // Place frontend in backend dist folder
    emptyOutDir: true, // Clears old files before building
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'images': ['./src/assets']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  base: '/', // Ensure the base URL is set correctly
})
