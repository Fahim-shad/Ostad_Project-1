
import { test, expect } from '@playwright/test';
import LoginPage from '../Pageobjects/LoginPage.js';
import { users, password, messages } from '../testdata/testData.js';

test.describe('Q1 - Locked out user login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('locked_out_user should see the locked out error message', async ({ page }) => {
    await loginPage.login(users.locked, password);

    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(messages.lockedOutError);

    
    await expect(page).not.toHaveURL(/inventory/);
    await expect(loginPage.buttonelement('Login')).toBeVisible();
  });
});