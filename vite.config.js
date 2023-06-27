/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import stylelint from 'stylelint';

// https://vitejs.dev/config/
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
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true,
  },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
  // env variables
  root: './src/pages',
  envPrefix: ['VITE_', 'TAURI_'],
  publicDir: '../../public',
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    // Tauri supports es2021
    target: ['es2021', 'chrome100', 'safari13'],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        preview: resolve(__dirname, 'src/pages/preview/index.html'),
        oauth: resolve(__dirname, 'src/pages/oauth/index.html'),
      },
    },
  },
});
