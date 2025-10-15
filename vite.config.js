import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // default, ensures build folder
  },
  server: {
    // For local dev, optional
    historyApiFallback: true,
  },
  preview: {
    // For previewing production build locally
    historyApiFallback: true,
  },
})

