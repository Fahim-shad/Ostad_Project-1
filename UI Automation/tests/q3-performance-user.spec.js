
import { test, expect } from '@playwright/test';
import LoginPage from '../Pageobjects/LoginPage.js';
import InventoryPage from '../Pageobjects/InventoryPage.js';
import CartPage from '../Pageobjects/CartPage.js';
import CheckoutPage from '../Pageobjects/CheckoutPage.js';
import { users, password, checkoutInfo, messages, q3Data } from '../testdata/testData.js';

test.describe('Q3 - Performance glitch user purchase journey', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
  });

  test('performance_glitch_user sorts Z to A, buys first product and verifies order', async () => {
    
    await loginPage.login(users.performance, password);
    await expect(inventoryPage.title).toHaveText('Products');

    
    await inventoryPage.resetAppState();

    
    await inventoryPage.sortBy('za');
    await expect(inventoryPage.productNames.first()).toHaveText(q3Data.firstProduct);

    
    await inventoryPage.addFirstProductToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    
    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveText([q3Data.firstProduct]);
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation(checkoutInfo);
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');

    
    await expect(checkoutPage.itemNames).toHaveText([q3Data.firstProduct]);
    await expect(checkoutPage.subtotalLabel).toHaveText(q3Data.itemTotal);
    await expect(checkoutPage.totalLabel).toHaveText(q3Data.total);

    
    await checkoutPage.finishOrder();
    await expect(checkoutPage.headerelement(messages.orderSuccessHeader, 2)).toBeVisible();
    await expect(checkoutPage.completeText).toHaveText(messages.orderSuccessText);

    
    await checkoutPage.resetAppState();
    await checkoutPage.logout();
    await expect(loginPage.buttonelement('Login')).toBeVisible();
  });
});