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
    // Library build configuration
    return {
      ...config,
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.tsx'),
          name: gameName,
          fileName: gameName,
          formats: ['es'],
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
            format: 'es',
          },
        },
      },
    };
  }

  // Development configuration
  return {
    ...config,
    // Add development-specific settings
    server: {
      port: 5173,
      open: true,
    },
  };
}); 