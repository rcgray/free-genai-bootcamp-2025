import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    resolve: {
      alias: {
        '@lang-portal/shared': resolve(__dirname, '../../shared'),
      },
    },
  };

  if (command === 'build') {
    // Library build configuration
    return {
      ...config,
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.tsx'),
          name: 'base-game',
          fileName: 'base-game',
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