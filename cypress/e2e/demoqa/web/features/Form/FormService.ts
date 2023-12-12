import { FormPageLabels, PracticePageLabels } from "../../PageTypes";

export const FormMetadata = {
  Intercepts: {
      
  },
  Ui: {
    Card: '.card',
    MainHeader: '.main-header',
    ContainerRow: '.container .row',
    LeftPanelButtons: '.left-pannel .btn',
    FirstNameInput: '#firstName',
    LastNameInput: '#lastName',
    UserEmailInput: '#userEmail',
    GenderRadio: '[name="gender"]',
    UserNumberInput: '#userNumber',
    DateOfBirthInput: '#dateOfBirthInput',
    YearSelect: '.react-datepicker__year-select',
    MonthSelect: '.react-datepicker__month-select',
    DaySelect: 'div[class*="react-datepicker__day"][role="option"]',
    SubjectsOption: '.subjects-auto-complete__value-container',
    HobbiesCheckbox: 'input[type="checkbox"]',
    UploadPicture: '#uploadPicture',
    CurrentAddressInput: '#currentAddress',
    State: '#state [class$="indicatorContainer"]',
    StatePlaceholder: '#state [class$="placeholder"]',
    City: '#city [class$="indicatorContainer"]',
    CityPlaceholder: '#city [class$="placeholder"]',
    SubmitButton: '#submit',
    ModalDialog: '.modal-dialog',
    ModalTitle: '.modal-title',
    CloseModal: '#closeLargeModal'
  }
}

export class FormService {
  private static instance: FormService;
  private UI = FormMetadata.Ui;

  public static getInstance(): FormService {

    if(!FormService.instance){
      FormService.instance = new FormService();
    }

    return FormService.instance;
  }

  openFormPage(): FormService {
    cy.get(this.UI.Card).contains(FormPageLabels.PageTitle).click({ force: true });
    this.getMainHeader.should('contain.text', FormPageLabels.PageTitle)
    cy.get(this.UI.ContainerRow).contains(FormPageLabels.PageDescription).should('be.visible')
    return this;
  }

  openPracticeFormPage(): FormService {
    this.getLeftPanelButtons.contains(PracticePageLabels.PageTitle).click({ force: true });
    this.getMainHeader.should('contain.text', PracticePageLabels.PageTitle)
    return this;
  }

  get getMainHeader(): Cypress.Chainable {
    return cy.get(this.UI.MainHeader);
  }

  get getLeftPanelButtons(): Cypress.Chainable {
    return cy.get(this.UI.LeftPanelButtons);
  }

  get getUploadInput(): Cypress.Chainable {
    return cy.get(this.UI.UploadPicture)
  }

  typeText(selector: string, text: string): FormService {
    cy.get(selector).type(text, { delay: 10 });
    return this;
  }

  checkOption(selector: string, textOption: string): FormService {
    cy.get(`${selector}[value="${textOption}"]`).check({ force: true });
    return this;
  }

  inputDateOfBirth(day: number, month: number, year: number): FormService {
    cy.get(this.UI.DateOfBirthInput).click({force: true});
    cy.get(this.UI.MonthSelect).select(`${month}`);
    cy.get(this.UI.YearSelect).select(`${year}`);
    cy.contains(this.UI.DaySelect, day).click()
    return this;
  }

  submitForm(): FormService {
    cy.get(this.UI.SubmitButton).click({ force: true });
    return this;
  }

  checkModal(): FormService {
    cy.get(this.UI.ModalDialog).should('be.visible');
    cy.get(this.UI.ModalTitle).should('have.text', PracticePageLabels.ModalTitle);
    cy.get(this.UI.CloseModal).click({force: true})
    return this;
  }
}
