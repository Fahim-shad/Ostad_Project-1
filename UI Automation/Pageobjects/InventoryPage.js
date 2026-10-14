import BasePage from './BasePage.js';

export default class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.getByTestId('title');
    this.productNames = page.getByTestId('inventory-item-name');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async addProductToCart(productName) {
    const card = this.page.locator('.inventory_item').filter({ hasText: productName });
    await card.getByRole('button', { name: 'Add to cart' }).click();
  }

  async addFirstProductToCart() {
    await this.buttonelement('Add to cart').first().click();
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  async openCart() {
    await this.cartLink.click();
  }
}