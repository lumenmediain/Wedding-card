import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "*.spec.ts",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:3000",
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? {
          executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH,
          args: [
            "--no-sandbox",
            "--no-zygote",
            "--disable-gpu",
            "--disable-software-rasterizer",
            "--use-gl=disabled",
            "--disable-dev-shm-usage",
          ],
        }
      : {},
  },
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
