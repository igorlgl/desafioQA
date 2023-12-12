import { Elements, WebTables } from "../../PageTypes";

export const ElementsMetadata = {
  Intercepts: {
      
  },
  Ui: {
    Card: '.card',
    MainHeader: '.main-header',
    ContainerRow: '.container .row',
    LeftPanelButtons: '.left-pannel .btn',
    AddNewRecordButton: '#addNewRecordButton',
    FirstNameInput: '#firstName',
    LastNameInput: '#lastName',
    UserEmailInput: '#userEmail',
    AgeInput: '#age',
    SalaryInput: '#salary',
    DepartmentInput: '#department',
    SubmitButton: '#submit',
    EditRecord: '[id^="edit-record-"]',
    DeleteRecord: '[id^="delete-record-"]',
    RowRole: '[role="row"]',
    PageSizeOptions: '.-pageSizeOptions select'
  }
}

export class ElementsService {
  private static instance: ElementsService;
  private UI = ElementsMetadata.Ui;

  public static getInstance(): ElementsService {

    if(!ElementsService.instance){
      ElementsService.instance = new ElementsService();
    }

    return ElementsService.instance;
  }

  openElementsPage(): ElementsService {
    cy.get(this.UI.Card).contains(Elements.PageTitle).click({ force: true });
    this.getMainHeader.should('contain.text', Elements.PageTitle)
    cy.get(this.UI.ContainerRow).contains(Elements.PageDescription).should('be.visible')
    return this;
  }

  openWebTables(): ElementsService {
    this.getLeftPanelButtons.contains(WebTables.PageTitle).click({ force: true });
    this.getMainHeader.should('contain.text', WebTables.PageTitle)
    return this;
  }

  clickAddButton(): ElementsService {
    cy.get(this.UI.AddNewRecordButton).click({ force: true });
    return this;
  }

  validateRecord(data: string, recordId?: number): ElementsService {
    this.getDeleteRecordIcon(recordId)
    .parents(this.UI.RowRole)
    .invoke('text')
    .then(($text) => {
      expect($text.trim()).is.eql(data);
    })
    return this;
  }

  get getMainHeader(): Cypress.Chainable {
    return cy.get(this.UI.MainHeader);
  }

  get getLeftPanelButtons(): Cypress.Chainable {
    return cy.get(this.UI.LeftPanelButtons);
  }

  typeText(selector: string, text: string): ElementsService {
    cy.get(selector).clear().type(text, { delay: 10 });
    return this;
  }

  clickSubmitButton(): ElementsService {
    cy.get(this.UI.SubmitButton).click({ force: true });
    return this;
  }

  getEditRecordIcon(recordId?: number): Cypress.Chainable {
    return recordId >= 0 ? cy.get(this.UI.EditRecord).eq(recordId) : cy.get(this.UI.EditRecord);
  }

  getDeleteRecordIcon(recordId?: number): Cypress.Chainable {
    return recordId >= 0 ? cy.get(this.UI.DeleteRecord).eq(recordId) : cy.get(this.UI.DeleteRecord);
  }
}
