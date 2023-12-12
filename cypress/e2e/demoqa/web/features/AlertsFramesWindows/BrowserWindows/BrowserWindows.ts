import { Given, Then, When, Before } from '@badeball/cypress-cucumber-preprocessor';
import { AlertsFrameWindowsMetadata, AlertsFrameWindowsService } from '../AlertsFrameWindowsService'

const page = AlertsFrameWindowsService.getInstance();
const UI = AlertsFrameWindowsMetadata.Ui;
const state = {};

Before(() => {
  cy.visit('/');

  page.captureNewWindow();
})

Given("User open the Alerts, Frame & Windows page", () => {
  page.openAlertsFrameWindowsPage();
})

Given("User click on Browser Windows menu Item in the left menu", () => {
  page.openBrowserWindowsPage();
})

When("Click on New Window button", () => {
  page.clickNewWindowButton();
})

Then("New window should be shown", () => {
  cy.get('@WindowOpen').should('be.calledWith', '/sample');
})

Then(`New window content should be "This is sample page"`, () => {
  cy.wait(1000);
  page.newWindow().then($body => {
    page.newWindow()
      .find(UI.NewWindowSampleHeading)
      .should('contain.text', 'This is a sample page')
  });
})