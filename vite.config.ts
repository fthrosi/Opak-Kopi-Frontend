import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      // REST API
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false
      },
      '/socket.io': {
        target: process.env.VITE_API_URL,
        ws: true,
        changeOrigin: true,
        secure: false
      }
    }
  }
})
