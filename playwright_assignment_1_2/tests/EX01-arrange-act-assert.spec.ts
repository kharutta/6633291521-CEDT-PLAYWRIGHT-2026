import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import validUserData from "../test-data /users/valid-user.json";
import invalidUserData from "../test-data /users/invalid-user.json";
import messages from "../test-data /fixtures/messages.json";

test("Verify login pass with valid user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(validUserData[0]);
  await expect(
    page.getByRole("heading", { name: "Make Appointment" }),
  ).toBeVisible();
});

test("Verify login fail with invalid username", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(invalidUserData[0]);
  await expect(page.getByText(messages.loginFailed)).toBeVisible();
});

test("Verify login fail with invalid password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(invalidUserData[1]);
  await expect(page.getByText(messages.loginFailed)).toBeVisible();
});
