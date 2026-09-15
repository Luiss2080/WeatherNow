import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Entorno ligero por defecto; los tests que tocan el DOM o localStorage
    // declaran `// @vitest-environment jsdom` en su cabecera.
    environment: 'node',
    globals: true,
    setupFiles: './tests/setup.js',
    include: ['tests/**/*.test.{js,jsx}']
  }
});
