import { test, expect } from '@playwright/test';

const BASE = 'https://practicesoftwaretesting.com';

test.describe('Visual checks', () => {

// Green tests are commented out because they are not working in the current version of Playwright. They will be fixed in a future version.
  test('login page looks unchanged', async ({ page }) => {
    await page.goto(`${BASE}/auth/login`);
    await expect(page).toHaveScreenshot('login-baseline.png', {
      animations: 'disabled',
    });
  });

  test('home page header looks unchanged', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('nav').first()).toHaveScreenshot('header-baseline.png', {
      animations: 'disabled',
    });
  });

// Change image so the test will fail. This is to demonstrate how visual testing works.
// test('login page looks unchanged', async ({ page }) => {
//   await page.goto(`${BASE}/auth/login`);
//   await page.addStyleTag({ content: '.btnSubmit { margin-top: 50px; }' });   // ← added
//   await expect(page).toHaveScreenshot('login-baseline.png', {
//     animations: 'disabled',
//   });
// });

// test('home page header looks unchanged', async ({ page }) => {
//   await page.goto(`${BASE}/`);
//   await page.addStyleTag({ content: '.nav-link { font-size: 22px; }' });     // ← added
//   await expect(page.locator('nav').first()).toHaveScreenshot('header-baseline.png', {
//     animations: 'disabled',
//   });
// });
});