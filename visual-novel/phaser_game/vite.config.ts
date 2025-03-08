import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  server: {
    port: 5173,
    host: true, // Listen on all addresses
    hmr: true,  // Enable HMR
    watch: {
      usePolling: true,     // Use polling for better compatibility in WSL and VMs
      interval: 100,        // How often to check for changes in milliseconds
    }
  },
}); 