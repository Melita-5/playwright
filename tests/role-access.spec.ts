import { test, expect, chromium } from '@playwright/test';

const BASE = 'https://practicesoftwaretesting.com';

test.describe('Role-Based Access Tests', () => {

  test('Regular user sees customer area and is blocked from admin', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ storageState: 'user.json' });
    const page = await context.newPage();

    // logged in as Jane Doe, without re-authentication in this test
    await page.goto(BASE);
    await expect(page.locator('nav').first()).toContainText('Jane Doe');

    // we are on our page
    await page.goto(`${BASE}/account`);
    await expect(page).toHaveURL(/\/account/);

    // we are not allowed to access the admin area
    await page.goto(`${BASE}/admin/dashboard`);
    await expect(page).toHaveURL(/\/auth\/login/);

    await browser.close();
  });

  test('Admin sees dashboard and is blocked from customer area', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ storageState: 'admin.json' });
    const page = await context.newPage();

    await page.goto(BASE);
    await expect(page.locator('nav').first()).toContainText('John Doe');

    await page.goto(`${BASE}/admin/dashboard`);
    await expect(page).toHaveURL(/\/admin\/dashboard/);

    await page.goto(`${BASE}/account`);
    await expect(page).toHaveURL(/\/auth\/login/);

    await browser.close();
  });

});