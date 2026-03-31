import babel from '@rolldown/plugin-babel';
import terser from '@rollup/plugin-terser';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/esperanza-matematica-loterias/',
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      '~components': path.resolve(__dirname, './src/components'),
      '~contexts': path.resolve(__dirname, './src/contexts'),
      '~hooks': path.resolve(__dirname, './src/hooks'),
      '~models': path.resolve(__dirname, './src/models'),
      '~store': path.resolve(__dirname, './src/store'),
      '~utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    minify: 'terser',
    rollupOptions: {
      plugins: [
        terser({
          format: {
            comments: false,
          },
          mangle: {
            keep_classnames: false,
            reserved: [],
          },
        }),
      ],
    },
  },
});
