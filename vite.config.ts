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
    // Minify with terser — better dead-code elimination than esbuild
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // Strip all console.log/warn/error in prod
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.error'],
        passes: 2             // Two passes for max compression
      },
      format: {
        comments: false       // Strip all comments
      }
    },
    rollupOptions: {
      output: {
        // Manual chunk splitting — separates vendor libs from app code
        // Each chunk loads in parallel and is independently cacheable
        manualChunks(id) {
          // Vue core — tiny, always needed, cache forever
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue') || id.includes('node_modules/vue-router') || id.includes('node_modules/vue-i18n')) {
            return 'vue-core'
          }
          // GSAP — 113KB, shared across nearly all pages
          if (id.includes('node_modules/gsap')) {
            return 'gsap'
          }
          // Three.js — 532KB, ONLY loaded on Omniscience route
          if (id.includes('node_modules/three')) {
            return 'three'
          }
          // All other node_modules → single vendor chunk
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
