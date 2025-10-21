import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// FORCE REBUILD - Disable all caching
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: 'public',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // KEEP console logs for debugging
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'seo-vendor': ['react-helmet-async'],
        },
        // FORCE NEW HASH EVERY BUILD
        entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        assetFileNames: `assets/[name]-[hash]-${Date.now()}[extname]`
      },
    },
    chunkSizeWarningLimit: 1000,
    copyPublicDir: true,
  },
  server: {
    port: 5173,
    strictPort: false,
  },
  preview: {
    port: 4173,
    strictPort: false,
  },
  // DISABLE ALL CACHING
  cacheDir: '.vite-temp',
});
