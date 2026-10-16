import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Netlify publishes `build/` (CRA's output dir), so keep it.
  build: { outDir: 'build' },
  // The deployed env var is REACT_APP_API_KEY; keep that name so no Netlify setting changes.
  envPrefix: ['VITE_', 'REACT_APP_'],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    css: false,
  },
});