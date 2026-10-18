import { defineConfig, devices } from '@playwright/test';
import { DUMMY_API_KEY } from './e2e/support';

const PORT = 3100;

export default defineConfig({
  testDir: './e2e',
  // One baseline per project, not per OS-suffix. Baselines were captured on Windows/Chromium.
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  fullyParallel: true,
  workers: 2,
  retries: 0,
  timeout: 60_000,
  reporter: [['list']],
  expect: {
    // Data, images and the clock are fixed, so a diff is a real change. The 50 pixels only absorb Chromium raster
    // noise (a few to a few dozen stray pixels on gradients); a real change touches hundreds. threshold 0 as well, because the
    // default 0.2 colour distance hides a change from one green to a slightly darker one.
    toHaveScreenshot: { maxDiffPixels: 50, threshold: 0, animations: 'disabled', caret: 'hide' },
  },
  use: {
    baseURL: `http://localhost:${PORT}`,
    locale: 'en-GB',
    timezoneId: 'UTC',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-1440', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-375', use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 } } },
  ],
  webServer: {
    // Serves the production build (what Netlify ships), so the baseline checks the real output.
    // `vite build` inlines REACT_APP_API_KEY, hence the dummy key goes to the whole command.
    command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 240_000,
    env: {
      // Dummy value: every TMDB call is mocked, the specs assert this key is what the app sends.
      REACT_APP_API_KEY: DUMMY_API_KEY,
    },
  },
});
