import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'PsypresSharedUI',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        preserveModules: false,
      },
    },
  },
}); 