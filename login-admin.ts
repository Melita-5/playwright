// login-admin.ts
import { chromium } from '@playwright/test';

(async () => {
  // launch a new browser instance
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.fill('[data-test="email"]', 'admin@practicesoftwaretesting.com');
  await page.fill('[data-test="password"]', 'welcome01');
  await page.click('[data-test="login-submit"]');

  // wait till it really ends - a must
  await page.waitForURL(url => !url.pathname.includes('/auth/login'));

  // save the storage state to a file for later use
  await context.storageState({ path: 'admin.json' });
  await browser.close();
})();