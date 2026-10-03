import { defineConfig } from 'vite';

export default defineConfig({
  base: '/echoshift/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
