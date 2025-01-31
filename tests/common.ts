import { expect, Page } from "@playwright/test";

export const APP_NAME = 'OSMDb'

export const users = [
  {
    // Manager
    name: 'Andrea McCarthy',
    email: 'andrea.mccarthy@example.com',
    password: 'outsystems',
  },
  {
    // Employee
    name: 'Ann Olivarria',
    email: 'ann.olivarria@example.com',
    password: 'outsystems',
  },
]


export async function performLogin(page: Page, email: string, password: string) {
  const loginLink = page.getByRole('link', { name: 'Login' });
  await expect(loginLink).toBeVisible();
  await loginLink.click();
  await expect(page).toHaveTitle(/Login/);
  await page.getByRole('textbox', { name: 'Email Address' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
}
