import BasePage from './BasePage.js';

export default class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.getByTestId('title');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.totalLabel = page.getByTestId('total-label');
    this.completeText = page.getByTestId('complete-text');
  }

  async fillInformation({ firstName, lastName, postalCode }) {
    await this.enterTextinfield('First Name', firstName);
    await this.enterTextinfield('Last Name', lastName);
    await this.enterTextinfield('Zip/Postal Code', postalCode);
    await this.clickbutton('Continue');
  }

  async finishOrder() {
    await this.clickbutton('Finish');
  }
}