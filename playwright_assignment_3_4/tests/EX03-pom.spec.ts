import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import validInput from "../test-data/valid_input.json";
import { AppointmentPage } from "../page-objects/appointmentPage";

test("Verify make appointment success", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.USERNAME, process.env.PASSWORD);

  await expect(
    page.getByRole("heading", { name: "Make Appointment" }),
  ).toBeVisible();

  const appointmentPage = new AppointmentPage(page);
  await appointmentPage.makeAppointment(validInput);

  await expect(
    page.getByRole("heading", { name: "Appointment Confirmation" }),
  ).toBeVisible();
});
