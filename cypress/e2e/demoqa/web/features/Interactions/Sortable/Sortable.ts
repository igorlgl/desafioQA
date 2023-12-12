import { Given, Then, When, Before } from '@badeball/cypress-cucumber-preprocessor';
import { InteractionsService } from '../InteractionsService'

const page = InteractionsService.getInstance();
const ascOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
const descOrder = ascOrder.toReversed();

Before(() => {
  cy.visit('/');
})

Given("User open the Interactions page", () => {
  page.openInteracitionsPage();
})

Given("User click on Sortable menu Item in the left menu", () => {
  page.openSortablePage();
})

Then("User sort items list in descending order by draging and droping", () => {
  page.sortList(ascOrder);
})

Then("User sort items list in ascending order by draging and droping", () => {
  page.sortList(descOrder);
})
