import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2500,
  },
  server: {
    host: '0.0.0.0',  // 👈 This exposes it to the network
    port: 5173        // 👈 Optional: avoid random port change
  },
});
