import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],

  // =====================================================
  // BUILD OPTIMIZATIONS — target 90+ PageSpeed
  // =====================================================
  build: {
    // Target modern browsers — smaller output, no legacy polyfills
    target: 'es2020',
    // Raise the chunk warning threshold (3D assets are intentionally large)
    chunkSizeWarningLimit: 1000,
    // Inline small assets directly into CSS/JS (saves HTTP requests)
    assetsInlineLimit: 4096,
    // Enable CSS code splitting (loads only the CSS needed per route)
    cssCodeSplit: true,
    // Minify with esbuild (fastest, nearly as good as terser)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Manual chunk splitting — separates vendor libs from app code
        // Each chunk loads in parallel and is independently cacheable
        manualChunks(id) {
          // Vue core + router — always needed, cache long-term
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue') || id.includes('node_modules/vue-router')) {
            return 'vue-core'
          }
          // GSAP animation library — needed on most pages
          if (id.includes('node_modules/gsap')) {
            return 'gsap'
          }
          // Three.js — only needed for Omniscience page, isolate it
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'three'
          }
          // i18n + translation payloads
          if (id.includes('node_modules/vue-i18n') || id.includes('/locales/')) {
            return 'i18n'
          }
          // Lucide icons — tree-shaken but still sizeable
          if (id.includes('node_modules/lucide')) {
            return 'icons'
          }
          // All other node_modules grouped as vendor
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // Consistent hashed filenames for long-term caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    }
  },

  // =====================================================
  // DEV SERVER
  // =====================================================
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
