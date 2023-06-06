/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stylelint from 'stylelint';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        stylelint(),
      ],
    },
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  clearScreen: false,
  server: {
    open: '/',
    strictPort: true,
    port: 3003,
  },
  define: {
    'process.env': {},
  },
  build: {
    target: ['es2021', 'chrome100', 'safari13'],
    outDir: './public/share',
    lib: {
      name: 'initSharePage',
      entry: './src/share/main.jsx',
      formats: ['iife'],
      fileName: 'bundle',
    },
  },
});
