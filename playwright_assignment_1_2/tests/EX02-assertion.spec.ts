import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import validUserData from "../test-data /users/valid-user.json";
import facilities from "../test-data /fixtures/facilities.json";
import programs from "../test-data /fixtures/programs.json";
import comments from "../test-data /fixtures/comments.json";

type User = {
  username: string;
  password: string;
};

const test = base.extend<{ validUser: User }>({
  validUser: async ({}, use) => {
    await use(validUserData[0]);
  },
});

const formatDate = (date: Date): string => {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${month}/${day}/${date.getFullYear()}`;
};

test.describe("Make appointment form", () => {
  test.beforeEach(async ({ page, validUser }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(validUser);
  });

  test('Verify that make appointment page display "Make Appointment" in h2.', async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Make Appointment" }),
    ).toBeVisible();
  });

  test("Verify that can select all facility combo boxes", async ({ page }) => {
    const facility = page.getByLabel("Facility");
    const facilitiesList = facilities;
    for (const option of facilitiesList) {
      await facility.selectOption(option);
      await expect(facility).toHaveValue(option);
    }
  });

  test("Verify that can select apply for hospital readmission checkbox", async ({
    page,
  }) => {
    const readmissionCheckbox = page.getByLabel(
      "Apply for hospital readmission",
    );
    await readmissionCheckbox.check();
    await expect(readmissionCheckbox).toBeChecked();
  });

  test("Verify that can select health care program radio button", async ({
    page,
  }) => {
    const programsList = programs;
    for (const program of programsList) {
      const radio = page.getByLabel(program);
      await radio.check();
      await expect(radio).toBeChecked();
    }
  });

  test("Verify that can input current date on Visit Date", async ({ page }) => {
    const visitDateInput = page.getByLabel("Visit Date (Required)");
    const today = formatDate(new Date());

    await visitDateInput.fill(today);
    await expect(visitDateInput).toHaveValue(today);
  });

  test("Verify that can input comment", async ({ page }) => {
    const commentInput = page.getByLabel("Comment");
    await commentInput.fill(comments[0]);
    await expect(commentInput).toHaveValue(comments[0]);
  });

  test("Verify that book appointment button is displayed and enabled.", async ({
    page,
  }) => {
    const bookButton = page.getByRole("button", { name: "Book Appointment" });
    await expect(bookButton).toBeVisible();
    await expect(bookButton).toBeEnabled();
  });
});
