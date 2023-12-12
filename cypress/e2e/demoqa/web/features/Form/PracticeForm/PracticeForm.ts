import { Given, Then, When, Before } from '@badeball/cypress-cucumber-preprocessor';
import { FormMetadata, FormService } from '../FormService'
import { faker } from '@faker-js/faker'

const page = FormService.getInstance();
const UI = FormMetadata.Ui;
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other'])
const subject = faker.helpers.arrayElement(["Hindi", "English", "Maths", "Physics", "Chemistry", "Biology"])
const mobileNumber = faker.random.numeric(10);
const monthDateBirth = faker.datatype.number({ min: 1, max: 11 })
const dayDateBirth = faker.datatype.number({ min: 1, max: 28 })
const yearDateBirth = faker.datatype.number({ min: 2004, max: 2023 })
const address = faker.address.secondaryAddress()
const hobbies = faker.helpers.arrayElement(['1', '2', '3'])
const state = 'NCR';
const city = 'Delhi';

Before(() => {
  cy.visit('/')
})

Given("User open the Forms page", () => {
  page.openFormPage();
})

Given("User click on Practice Form menu Item in the left menu", () => {
  page.openPracticeFormPage();
})

When("Fill up the whole Practice Form", () => {
  page.typeText(UI.FirstNameInput, firstName);
  page.typeText(UI.LastNameInput, lastName);
  page.typeText(UI.UserEmailInput, email);
  page.checkOption(UI.GenderRadio, gender);
  page.typeText(UI.UserNumberInput, mobileNumber);
  page.inputDateOfBirth(dayDateBirth, monthDateBirth, yearDateBirth);
  page.typeText(UI.SubjectsOption, `${subject}{ENTER}`)
  page.checkOption(UI.HobbiesCheckbox, hobbies);
  page.getUploadInput.selectFile('cypress/fixtures/example.txt')
  page.typeText(UI.CurrentAddressInput, address);
  cy.get(UI.State).click({force: true})
  page.typeText(UI.StatePlaceholder, `${state}{ENTER}`)
  cy.wait(1000).then(() => {
    cy.get(UI.City).click({force: true})
    page.typeText(UI.CityPlaceholder, `${city}{ENTER}`);
  })
})

When("Click on Submit button", () => {
  page.submitForm();
})

Then("Confirmation modal is shown", () => {
  page.checkModal();
})