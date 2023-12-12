import { Given, Then, When, Before } from '@badeball/cypress-cucumber-preprocessor';
import { WidgetsService } from '../WidgetsService'

const page = WidgetsService.getInstance();

Before(() => {
  cy.visit('/');
})

Given("User open the Widgets page", () => {
  page.openWidgetsPage();
})

Given("User click on Progress Bar menu Item in the left menu", () => {
  page.openProgressBar();
})

When("User click on Start button", () => {
  page.startStopProgressBar();
})

When("User click on Stop button before progress bar reach 25%", () => {
  cy.wait(1000);
  page.startStopProgressBar();
})

Then("Progress should be lower than 25%", () => {
  page.validateProgressLessThan(25);
})

When(`User wait progress reach 100%`, () => {
  page.validateProgress('be.equal', '100');
})

Then(`Reset button should be visible`, () => {
  page.getResetButton.should('be.visible');
})

Given(`User click on Reset button`, () => {
  page.getResetButton.click();
})

Then("Progress bar is 0% completed", () => {
  page.validateProgress('be.equal', '0');
})
