export class LoginPage {
  constructor(page) {
    this.page = page
		this.url = process.env.URL || ''
  }

  async login(username, password) {
    await this.page.goto(this.url);
    await this.page.getByRole("link", { name: "Make Appointment" }).click();
    await this.page.getByLabel("Username").click();
    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").click();
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }
}
