import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'PsypresReact',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom', '@psypres/shared-ui'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@psypres/shared-ui': 'PsypresSharedUI'
        },
        preserveModules: false,
      },
    },
  },
});
