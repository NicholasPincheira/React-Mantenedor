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
})
