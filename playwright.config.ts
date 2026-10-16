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
    // Zero tolerance: all data, images and the clock are fixed, so any pixel diff is a real change.
    toHaveScreenshot: { maxDiffPixels: 0, animations: 'disabled', caret: 'hide' },
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
    // Phase 0 only: CRA 3.4 (webpack 4) needs the legacy OpenSSL provider on Node 17+.
    // Replace this command when the toolchain moves to Vite in Phase 1.
    command: 'npm start',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 240_000,
    env: {
      NODE_OPTIONS: '--openssl-legacy-provider',
      BROWSER: 'none',
      PORT: String(PORT),
      // Dummy value: every TMDB call is mocked, the specs assert this key is what the app sends.
      REACT_APP_API_KEY: DUMMY_API_KEY,
    },
  },
});
