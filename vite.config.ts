import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],

  // =====================================================
  // SSG CONFIGURATION (Vite-SSG)
  // =====================================================
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    async includedRoutes(paths, routes) {
      // Base static routes (no parameters)
      const staticPaths = paths.filter(path => !path.includes(':') && !path.includes('*'))
      
      let dynamicPaths: string[] = []
      try {
        // Fetch products to generate /product/:handle pages statically
        const res = await fetch('http://localhost:3000/api/products')
        if (res.ok) {
          const products = await res.json()
          if (Array.isArray(products)) {
            const productRoutes = products.map((p: any) => `/product/${p.handle}`)
            dynamicPaths.push(...productRoutes)
          }
        }
      } catch (e) {
        console.warn('Warning: Could not fetch products for SSG. Ensure API is running on localhost:3000 if you want pre-rendered product pages.')
      }
      
      return Array.from(new Set([...staticPaths, ...dynamicPaths]))
    }
  },

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
    // Consistent hashed filenames for long-term caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
             if (id.includes('vue') || id.includes('pinia')) return 'vendor';
             if (id.includes('gsap')) return 'gsap';
             if (id.includes('lenis')) return 'lenis';
             if (id.includes('three')) return 'three';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
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
