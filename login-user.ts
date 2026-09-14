import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  try {
    await page.waitForSelector('[data-test="email"]', { timeout: 60000 });
  } catch (e) {
    // polja ni – poglejmo, kaj je stran sploh pokazala
    console.log('URL:', page.url());
    console.log('TITLE:', await page.title());
    console.log('BODY:', (await page.locator('body').innerText()).slice(0, 800));
    await page.screenshot({ path: 'debug-login.png', fullPage: true });
    await browser.close();
    throw e;
  }

  await page.fill('[data-test="email"]', 'customer@practicesoftwaretesting.com');
  await page.fill('[data-test="password"]', 'welcome01');
  await page.click('[data-test="login-submit"]');
  await page.waitForURL(url => !url.pathname.includes('/auth/login'));

  await context.storageState({ path: 'user.json' });
  await browser.close();
})();