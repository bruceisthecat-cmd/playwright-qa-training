import { test, expect } from '@playwright/test';
import { LoginPage } from './Pages/login.page';
import { InventoryPage } from './Pages/inventory.page';

test.describe('SauceDemo Login Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
  });

  test('Successful login navigates to inventory page', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    // Corrected to expect www subdomain and inventory.html endpoint
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // Restored heading assertion: Proves user sees storefront catalog UI
    await expect(inventoryPage.titleHeader).toBeVisible();
    await expect(inventoryPage.titleHeader).toHaveText('Products');
  });

  test('Login fails with invalid password and error can be dismissed', async ({ page }) => {
    await loginPage.login('standard_user', 'wrong_password');

    // Asserts user is rejected and stays on the landing domain
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorContainer).toBeVisible();
    await expect(loginPage.errorContainer).toContainText(
      'Username and password do not match any user in this service'
    );

    await loginPage.dismissError();

    await expect(loginPage.errorContainer).toBeHidden();
  });
});