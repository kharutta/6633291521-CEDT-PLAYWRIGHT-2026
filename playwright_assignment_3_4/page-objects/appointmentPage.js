import fieldInfo from "../test-data/field_info.json";

export class AppointmentPage {
  constructor(page) {
    this.page = page;
  }

  async makeAppointment(validInput) {
    await this.page
      .getByLabel(fieldInfo.facility.label)
      .selectOption(validInput.facility);

    await this.page
      .getByRole(fieldInfo.readmission.role, {
        name: fieldInfo.readmission.name,
      })
      .check();

    await this.page
      .getByRole(fieldInfo.healthcareProgram.role, {
        name: validInput.healthcareProgram,
      })
      .check();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonthName = monthNames[new Date().getMonth()];
    await this.page.locator(fieldInfo.visitDate.locator).click();
    await this.page
      .getByRole(fieldInfo.visitDate.month.role, { name: currentMonthName })
      .click();
    await this.page.getByText(validInput.visitDate.month).click();
    await this.page
      .getByRole(fieldInfo.visitDate.day.role, {
        name: validInput.visitDate.day,
      })
      .nth(5)
      .click();

    await this.page
      .getByRole(fieldInfo.comment.role, { name: fieldInfo.comment.name })
      .click();
    await this.page
      .getByRole(fieldInfo.comment.role, { name: fieldInfo.comment.name })
      .fill(validInput.comment);

    await this.page
      .getByRole(fieldInfo.submit.role, { name: fieldInfo.submit.name })
      .click();
  }
}
