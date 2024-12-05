import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Carpeta donde se generará el build
    sourcemap: false, // Desactiva los sourcemaps para producción
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // URL del backend
        changeOrigin: true, // Cambia el origen del host
        secure: false, // Desactiva la verificación SSL en desarrollo
      },
    },
  },
})
