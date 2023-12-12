import { Interactions, Sortable } from "../../PageTypes";

export const InteractionsMetadata = {
  Intercepts: {
      
  },
  Ui: {
    Card: '.card',
    MainHeader: '.main-header',
    ContainerRow: '.container .row',
    LeftPanelButtons: '.left-pannel .btn',
    TabPanelList: '#demo-tabpane-list',
    VerticalListItem: '.vertical-list-container .list-group-item ',
  }
}

export class InteractionsService {
  private static instance: InteractionsService;
  private UI = InteractionsMetadata.Ui;

  public static getInstance(): InteractionsService {

    if(!InteractionsService.instance){
      InteractionsService.instance = new InteractionsService();
    }

    return InteractionsService.instance;
  }

  openInteracitionsPage(): InteractionsService {
    cy.get(this.UI.Card).contains(Interactions.PageTitle).click({ force: true });
    this.getMainHeader.should('contain.text', Interactions.PageTitle)
    cy.get(this.UI.ContainerRow).contains(Interactions.PageDescription).should('be.visible')
    return this;
  }

  openSortablePage(): InteractionsService {
    this.getLeftPanelButtons.contains(Sortable.PageTitle).click({ force: true });
    this.getMainHeader.should('contain.text', Sortable.PageTitle)
    return this;
  }

  get getMainHeader(): Cypress.Chainable {
    return cy.get(this.UI.MainHeader);
  }

  get getLeftPanelButtons(): Cypress.Chainable {
    return cy.get(this.UI.LeftPanelButtons);
  }

  sortList(list: Array<string>): InteractionsService {
    const dataTransfer = new DataTransfer;
    list.forEach((item)=>{
      cy.get(this.UI.VerticalListItem).contains(item).trigger("mousedown", { which: 1 });
      cy.get(this.UI.TabPanelList)
        .trigger("mousemove", { which: 1, pageX: 390, pageY: 290 })
        .trigger('mouseleave').trigger('mouseup')
    })
    return this;
  }
}
