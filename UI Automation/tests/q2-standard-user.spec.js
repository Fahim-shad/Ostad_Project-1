
import { test, expect } from '@playwright/test';
import LoginPage from '../Pageobjects/LoginPage.js';
import InventoryPage from '../Pageobjects/InventoryPage.js';
import CartPage from '../Pageobjects/CartPage.js';
import CheckoutPage from '../Pageobjects/CheckoutPage.js';
import { users, password, checkoutInfo, messages, q2Data } from '../testdata/testData.js';

test.describe('Q2 - Standard user purchase journey', () => {
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

  test('standard_user buys 3 items and verifies name, total price and success message', async () => {
   
    await loginPage.login(users.standard, password);
    await expect(inventoryPage.title).toHaveText('Products');

   
    await inventoryPage.resetAppState();

    
    for (const product of q2Data.products) {
      await inventoryPage.addProductToCart(product);
    }
    await expect(inventoryPage.cartBadge).toHaveText('3');

    
    await inventoryPage.openCart();
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.itemNames).toHaveText(q2Data.products);

    
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation(checkoutInfo);
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');

   
    await expect(checkoutPage.itemNames).toHaveText(q2Data.products);
    await expect(checkoutPage.subtotalLabel).toHaveText(q2Data.itemTotal);
    await expect(checkoutPage.totalLabel).toHaveText(q2Data.total);

    
    await checkoutPage.finishOrder();
    await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.headerelement(messages.orderSuccessHeader, 2)).toBeVisible();
    await expect(checkoutPage.completeText).toHaveText(messages.orderSuccessText);

    
    await checkoutPage.resetAppState();
    await checkoutPage.logout();
    await expect(loginPage.buttonelement('Login')).toBeVisible();
  });
});