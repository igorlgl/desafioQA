import { AlertsFrameWindows, BrowserWindows } from "../../PageTypes";

export const AlertsFrameWindowsMetadata = {
  Intercepts: {
      
  },
  Ui: {
    Card: '.card',
    MainHeader: '.main-header',
    ContainerRow: '.container .row',
    LeftPanelButtons: '.left-pannel .btn',
    NewWindowButton: '#windowButton',
    NewWindowSampleHeading: "#sampleHeading"
  }
}

export class AlertsFrameWindowsService {
  private static instance: AlertsFrameWindowsService;
  private UI = AlertsFrameWindowsMetadata.Ui;
  private state = {};

  public static getInstance(): AlertsFrameWindowsService {

    if(!AlertsFrameWindowsService.instance){
      AlertsFrameWindowsService.instance = new AlertsFrameWindowsService();
    }

    return AlertsFrameWindowsService.instance;
  }

  openAlertsFrameWindowsPage(): AlertsFrameWindowsService {
    cy.get(this.UI.Card).contains(AlertsFrameWindows.PageTitle).click({ force: true });
    this.getMainHeader.should('contain.text', AlertsFrameWindows.PageTitle)
    cy.get(this.UI.ContainerRow).contains(AlertsFrameWindows.PageDescription).should('be.visible')
    return this;
  }

  openBrowserWindowsPage(): AlertsFrameWindowsService {
    this.getLeftPanelButtons.contains(BrowserWindows.PageTitle).click({ force: true });
    this.getMainHeader.should('contain.text', BrowserWindows.PageTitle)
    return this;
  }

  captureNewWindow(): AlertsFrameWindowsService {
    cy.window().then((win)=>{
      const open = win.open;
      cy.stub(win, 'open')
      .as('WindowOpen')
      .callsFake((...params) => {
        this.state.popup = open(...params)
        return this
      });
    })
    return this;
  }

  newWindow(): Cypress.Chainable {
    const popup = Cypress.$(this.state.popup.document)
    return cy.wrap(popup.contents().find('body'))
  }

  get getMainHeader(): Cypress.Chainable {
    return cy.get(this.UI.MainHeader);
  }

  get getLeftPanelButtons(): Cypress.Chainable {
    return cy.get(this.UI.LeftPanelButtons);
  }

  clickNewWindowButton(): AlertsFrameWindowsService {
    cy.get(this.UI.NewWindowButton).click({force: true});
    return this;
  }
}
