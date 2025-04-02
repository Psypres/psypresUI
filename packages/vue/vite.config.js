import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'PsypresVue',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['vue', '@psypres/shared-ui'],
      output: {
        globals: {
          vue: 'Vue',
          '@psypres/shared-ui': 'PsypresSharedUI',
        },
        preserveModules: false,
      },
    },
  },
}); 