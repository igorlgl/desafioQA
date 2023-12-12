import { Given, Then, When, Before, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { ElementsMetadata, ElementsService } from '../ElementsService'
import { faker } from '@faker-js/faker';

const page = ElementsService.getInstance();
const UI = ElementsMetadata.Ui;
let firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const age = faker.datatype.number({ min: 15, max: 36 }).toString()
const salary = faker.random.numeric(4);
const department = 'IT';

Before(() => {
  cy.visit('/');
})

Given("User open the Elements page", () => {
  page.openElementsPage();
})

Given("User click on Web Tables menu Item in the left menu", () => {
  page.openWebTables();
})

When("User click on Add button", () => {
  page.clickAddButton();
})

When("User populate Registration Form's fields", () => {
  page.typeText(UI.FirstNameInput, firstName);
  page.typeText(UI.LastNameInput, lastName);
  page.typeText(UI.UserEmailInput, email);
  page.typeText(UI.AgeInput, age);
  page.typeText(UI.SalaryInput, salary);
  page.typeText(UI.DepartmentInput, department);
})

When(`User click on Submit Button`, () => {
  page.clickSubmitButton();
})

Then(`New record should be shown with the provided data`, () => {
  const lastAddedRecord = [firstName, lastName, age, email, salary, department].join('');
  page.validateRecord(lastAddedRecord, 3)
})

Given(`User click to edit last added record`, () => {
  page.getEditRecordIcon(3).click({force: true})
})

Given(`User edit first name information`, () => {
  firstName = faker.name.firstName();
  page.typeText(UI.FirstNameInput, firstName);
})

Then(`Edited record should updated data information`, () => {
  const lastAddedRecord = [firstName, lastName, age, email, salary, department].join('');
  page.validateRecord(lastAddedRecord, 3)
})

Given(`User click to delete last edited record`, () => {
  page.getDeleteRecordIcon(3).click()
})

Then(`Last record no longer exist`, () => {
  page.getDeleteRecordIcon(3).should('not.exist')
})

When('User add 12 new records', (data: DataTable) => {
  const dataInput = data.hashes();
  let count = 2;

  cy.get(UI.PageSizeOptions).select('20 rows');

  dataInput.forEach(record => {
    page.clickAddButton();

    page.typeText(UI.FirstNameInput, record.firstName);
    page.typeText(UI.LastNameInput, record.lastName);
    page.typeText(UI.AgeInput, record.age);
    page.typeText(UI.UserEmailInput, record.email);
    page.typeText(UI.SalaryInput, record.salary);
    page.typeText(UI.DepartmentInput, record.department);
    
    page.clickSubmitButton();
    cy.wait(1000);

    count++;

    const lastAddedRecord = [record.firstName, record.lastName, record.age, record.email, record.salary, record.department].join('');
    page.validateRecord(lastAddedRecord, count)
  })
})

Then(`Records count should be 15`, () => {
  page.getDeleteRecordIcon().should('have.length', 15)
})

When(`User delete all 12 newly added records`, () => {
  for(let i = 14; i > 2; i--){
    page.getDeleteRecordIcon(i).click({force: true});
  }
})

Then(`Records count should be 3`, () => {
  page.getDeleteRecordIcon().should('have.length', 3)
})