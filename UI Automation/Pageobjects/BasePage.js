export default class BasePage {
  constructor(page) {
    this.page = page;

    
    this.menuOpenButton = page.locator('#react-burger-menu-btn');
    this.menuCloseButton = page.locator('#react-burger-cross-btn');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  
  getelementbyrole(element) {
    return this.page.getByRole('link', { name: element });
  }

  
  inputfield(str) {
    return this.page.getByPlaceholder(str);
  }

  buttonelement(str) {
    return this.page.getByRole('button', { name: str });
  }

  headerelement(header, level) {
    return this.page.getByRole('heading', { name: header, level: level });
  }

  
  async clickElementbyrole(element) {
    await this.getelementbyrole(element).click();
  }

  async enterTextinfield(str, text) {
    await this.inputfield(str).fill(text);
  }

  async clickbutton(str) {
    await this.buttonelement(str).click();
  }

  async waitforheader(header, level) {
    await this.headerelement(header, level).waitFor({ state: 'visible' });
  }

  
  async openMenu() {
    await this.menuOpenButton.click();
    await this.logoutLink.waitFor({ state: 'visible' });
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
    await this.menuCloseButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }
}