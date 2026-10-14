import BasePage from './BasePage.js';

export default class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.getByTestId('title');
    this.itemNames = page.getByTestId('inventory-item-name');
  }

  async proceedToCheckout() {
    await this.clickbutton('Checkout');
  }
}