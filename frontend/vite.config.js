import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './public/index.html'
      }
    }
  }
})