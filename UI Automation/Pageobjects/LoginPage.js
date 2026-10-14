import BasePage from './BasePage.js';

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.enterTextinfield('Username', username);
    await this.enterTextinfield('Password', password);
    await this.clickbutton('Login');
  }
}