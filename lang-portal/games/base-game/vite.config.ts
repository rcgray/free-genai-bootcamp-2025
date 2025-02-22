import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Extract game name from directory name
  const gameName = __dirname.split(/[\\/]/).pop() || 'unknown-game';

  const config = {
    plugins: [react()],
    resolve: {
      alias: {
        '@lang-portal/shared': resolve(__dirname, '../../shared'),
      },
    },
    define: {
      __GAME_NAME__: JSON.stringify(gameName),
    },
  };

  if (command === 'build') {
    // Build configuration for production
    return {
      ...config,
      build: {
        outDir: 'dist',
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
          },
        },
      },
    };
  }

  // Development configuration
  return {
    ...config,
    server: {
      port: 5173,
      open: true,
    },
  };
}); 