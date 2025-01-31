import { test, expect, Page } from '@playwright/test';
import { APP_NAME, performLogin, users } from './common';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL!);
});


test('has app name header', async ({ page }) => {
  await expect(page.getByText(APP_NAME)).toBeVisible();
});


test('has page links', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Movie'})).toBeVisible();
  await expect(page.getByRole('link', { name: 'People'})).toBeVisible();
});


test('anonymous user can access the home page', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});


test('valid user can login', async ({ page }) => {
  await performLogin(page, users[0].email, users[0].password);
  await expect(page.getByTitle('Logout')).not.toHaveCount(0);
  await expect(page.getByText(users[0].name)).not.toHaveCount(0);
});


test('invalid credentials are not allowed', async ({ page }) => {
  await performLogin(page, users[0].email, 'invalid');
  await expect(page.getByText('Invalid username or password')).toBeVisible();
});

