import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html'),
        alchemy: resolve(__dirname, 'alchemy.html'),
        manuscripts: resolve(__dirname, 'manuscripts.html'),
        attire: resolve(__dirname, 'attire.html'),
        sanctuary: resolve(__dirname, 'sanctuary.html'),
        product: resolve(__dirname, 'product.html'),
        collection: resolve(__dirname, 'collection.html'),
        void: resolve(__dirname, 'void.html')
      }
    }
  }
});
