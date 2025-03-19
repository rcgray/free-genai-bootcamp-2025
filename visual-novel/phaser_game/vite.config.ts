import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    host: true, // Listen on all addresses
    hmr: true,  // Enable HMR
    watch: {
      usePolling: true,     // Use polling for better compatibility in WSL and VMs
      interval: 100,        // How often to check for changes in milliseconds
    }
  },
  define: {
    // Make environment variables available in the client
    // Only include specific environment variables that we need
    '__ENV__': {
      LLM_API_KEY: process.env.LLM_API_KEY || '',
      LLM_API_BASE_URL: process.env.LLM_API_BASE_URL || 'https://api.openai.com/v1',
      LLM_MODEL: process.env.LLM_MODEL || 'gpt-4',
    }
  },
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
}); 