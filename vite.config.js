import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // This base must match your Client Extension friendly URL
  base: '/o/time-management-ui',
  build: {
    outDir: './vite-build',
    rollupOptions: {
      output: {
        // Keeps filenames predictable so the YAML can find them
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ]
})