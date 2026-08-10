import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('@emailjs')) return 'emailjs'
          // Do not split @lottiefiles/dotlottie-react — let Vite chunk automatically.
        },
      },
    },
  },
})
