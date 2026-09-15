import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { pluginApi } from './api/pluginVite.js';

export default defineConfig(({ mode }) => {
  const entorno = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), pluginApi(entorno)],
    server: {
      port: 5173
    }
  };
});
