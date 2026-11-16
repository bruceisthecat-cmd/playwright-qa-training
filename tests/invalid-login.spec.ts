import { test, expect } from '@playwright/test';

test('Login should fail with invalid password and error can be dismissed', async ({ page }) => {
  // 1. Navigate to the login page
  await page.goto('https://www.saucedemo.com');

  // 2. Fill in login credentials
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('wrong_password');
  
  // 3. Click the login button
  await page.locator('[data-test="login-button"]').click();

  // --- Initial Assertions ---
  await expect(page).toHaveURL('https://www.saucedemo.com');
  const errorContainer = page.locator('[data-test="error"]');
  await expect(errorContainer).toBeVisible();
  await expect(errorContainer).toContainText('Username and password do not match any user in this service');

  // 4. Dismiss the error message
  await page.locator('[data-test="error-button"]').click();

  // --- New Assertion ---
  // Verifies the error banner is completely removed or hidden from the UI after dismissal
  await expect(errorContainer).toBeHidden();
});
