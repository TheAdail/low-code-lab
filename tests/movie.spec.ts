import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL!);
});


test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Movies/);
});


test('list of movies is not empty', async ({ page }) => {
  const table = page.getByRole('table');
  const rows = table.locator('tbody tr');
  await expect(rows).not.toHaveCount(0);
});


test('select a movie to view its details', async ({ page }) => {
  const table = page.getByRole('table');
  const rows = table.locator('tbody tr');
  await expect(rows).not.toHaveCount(0);

  const movie = rows.nth(0);
  const movieTitle = await movie.locator('td').nth(0).textContent();

  await movie.getByRole('link').click();
  await expect(page).toHaveTitle(`Details for ${movieTitle}`);
  await page.waitForTimeout(3000);
  page.getByRole('link', { name: 'Back' }).click();
  await expect(page).toHaveTitle(/Movies/);
});
