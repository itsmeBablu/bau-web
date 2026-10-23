import { defineConfig, devices } from '@playwright/test';

const executablePath = process.env.CHROMIUM_PATH;

export default defineConfig({
  testDir: './e2e',
  outputDir: 'test-results',
  reporter: process.env.CI
    ? [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]
    : 'list',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: 'http://localhost:3100',
    ...devices['Desktop Chrome'],
    launchOptions: executablePath ? { executablePath } : undefined,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: executablePath ? { executablePath } : undefined,
      },
    },
  ],
  webServer:
    process.env.WEBSITE_EXTERNAL_SERVER === '1'
      ? undefined
      : {
          command: process.env.CI ? 'npm run start' : 'npm run dev',
          url: 'http://localhost:3100',
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
});
