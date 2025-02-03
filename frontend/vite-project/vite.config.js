import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://book-backend-git-main-soumya-aryas-projects.vercel.app/', // Proxy requests to the backend
    },
  },
  
})
