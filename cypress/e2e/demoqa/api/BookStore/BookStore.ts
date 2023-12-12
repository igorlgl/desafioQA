import { Given } from '@badeball/cypress-cucumber-preprocessor';

let userID;
let token;
let books = [];
let userName = 'Morpheus';
let userPass = 'Matrix*1234';

Given('Automation Create an User', () => {
  cy.request({
    method: 'POST',
    url: '/Account/v1/User',
    body: {
      userName: userName,
      password: userPass
    },
  }).then((response) => {
    expect(response.status).is.eq(201)
    expect(response.body).to.haveOwnProperty('userID');
    userID = response.body.userID
  })
})

Given('Automation generate an Access Token', () => {
  cy.request({
    method: 'POST',
    url: '/Account/v1/GenerateToken',
    body: {
      userName: userName,
      password: userPass
    },
  }).then((response) => {
    expect(response.status).is.eq(200)
    expect(response.body).to.haveOwnProperty('token');
    token = response.body.token
  })
})

Given('Automation confirm that and user can be Authorized', () => {
  cy.request({
    method: 'POST',
    url: '/Account/v1/Authorized',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      userName: userName,
      password: userPass
    },
  }).then((response) => {
    expect(response.status).is.eq(200)
    expect(response.body).to.be.true
  })
})

Given('Automation gets all available books', () => {
  cy.request({
    method: 'GET',
    url: '/BookStore/v1/Books',
  }).then((response) => {
    expect(response.status).to.have.eq(200)
    books = response.body.books
  })
})

Given('Automation add two books under the current user collection', () => {
  cy.request({
    method: 'POST',
    url: `/BookStore/v1/Books/`,
    auth: {
      user: userName,
      pass: userPass
    },
    body: {
      userId: userID,
      collectionOfIsbns: [{'isbn': books[0].isbn}, {'isbn': books[1].isbn}, ]
    },
  }).then((response) => {
    expect(response.status).is.eq(201)
  })
})

Given('Automation list current user details', () => {
  cy.request({
    method: 'GET',
    url: `/Account/v1/User/${userID}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }).then((response) => {
    expect(response.status).to.have.eq(200)
    cy.log(JSON.stringify(response.body))
  })
})