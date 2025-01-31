import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL!);
  await page.getByRole('link', { name: 'People' }).click();
});


test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/People/);
});


test('list of people is not empty', async ({ page }) => {
  const table = page.getByRole('table');
  const rows = table.locator('tbody tr');
  await expect(rows).not.toHaveCount(0);
});


test('select a person to view their details', async ({ page }) => {
  const table = page.getByRole('table');
  const rows = table.locator('tbody tr');
  await expect(rows).not.toHaveCount(0);

  const person = rows.nth(0);
  const personName = await person.locator('td').nth(0).textContent() + ' ' + await person.locator('td').nth(1).textContent();

  await person.getByRole('link').click();
  await expect(page).toHaveTitle(`Details for ${personName}`);
  await page.waitForTimeout(2000);
  page.getByRole('link', { name: 'Back' }).click();
  await expect(page).toHaveTitle(/People/);
});
