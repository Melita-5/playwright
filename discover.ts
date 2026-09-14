// discover.ts
import { chromium } from '@playwright/test';

const BASE = 'https://practicesoftwaretesting.com';

async function look(stateFile: string, label: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: stateFile });
  const page = await context.newPage();

  console.log('\n========== ' + label + ' ==========');

  await page.goto(BASE);
  await page.waitForTimeout(2000);
  console.log('Menu:');
  console.log(await page.locator('nav').first().innerText());

  await page.goto(BASE + '/account');
  await page.waitForTimeout(2000);
  console.log('\n/account  ->  ' + page.url());

  await page.goto(BASE + '/admin/dashboard');
  await page.waitForTimeout(2000);
  console.log('/admin/dashboard  ->  ' + page.url());

  await browser.close();
}

(async () => {
  await look('user.json', 'CUSTOMER');
  await look('admin.json', 'ADMIN');
})();