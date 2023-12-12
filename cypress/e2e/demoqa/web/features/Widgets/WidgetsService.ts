import { Widgets, ProgressBar } from "../../PageTypes";

export const WidgetsMetadata = {
  Intercepts: {
      
  },
  Ui: {
    Card: '.card',
    MainHeader: '.main-header',
    ContainerRow: '.container .row',
    LeftPanelButtons: '.left-pannel .btn',
    StartStopButton: '#startStopButton',
    ResetButton: '#resetButton',
    ProgressBar: 'div[role="progressbar"]',
    ProgressBarValue: 'aria-valuenow'
  }
}

export class WidgetsService {
  private static instance: WidgetsService;
  private UI = WidgetsMetadata.Ui;

  public static getInstance(): WidgetsService {

    if(!WidgetsService.instance){
      WidgetsService.instance = new WidgetsService();
    }

    return WidgetsService.instance;
  }

  openWidgetsPage(): WidgetsService {
    cy.get(this.UI.Card).contains(Widgets.PageTitle).click({ force: true });
    this.getMainHeader.should('contain.text', Widgets.PageTitle)
    cy.get(this.UI.ContainerRow).contains(Widgets.PageDescription).should('be.visible')
    return this;
  }

  openProgressBar(): WidgetsService {
    this.getLeftPanelButtons.contains(ProgressBar.PageTitle).click({ force: true });
    this.getMainHeader.should('contain.text', ProgressBar.PageTitle)
    return this;
  }

  get getMainHeader(): Cypress.Chainable {
    return cy.get(this.UI.MainHeader);
  }

  get getLeftPanelButtons(): Cypress.Chainable {
    return cy.get(this.UI.LeftPanelButtons);
  }

  startStopProgressBar(): WidgetsService {
    cy.get(this.UI.StartStopButton).click()
    return this;
  }

  validateProgress(rule, value: string): Cypress.Chainable {
    return cy.get(this.UI.ProgressBar).invoke('attr', this.UI.ProgressBarValue).should(rule, value)
  }

  validateProgressLessThan(value: number): Cypress.Chainable {
    return cy.get(this.UI.ProgressBar).invoke('attr', this.UI.ProgressBarValue).then(progress => {
      expect(Number(progress)).to.be.lessThan(value)
    });
  }

  get getResetButton(): Cypress.Chainable {
    return cy.get(this.UI.ResetButton); 
  }
}
