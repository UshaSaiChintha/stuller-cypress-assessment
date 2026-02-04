// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { locators } from './locators'

Cypress.Commands.add('login', () => {
  // Step 2: Login using attached username and password
  cy.contains(locators.general.span, 'Log In').click();

  cy.get(locators.login.username).type(Cypress.env('USERNAME'));
  cy.get(locators.login.password).type(Cypress.env('PASSWORD'));

  cy.get(locators.login.submit).click();

  cy.get(locators.home.accountButton).should('be.visible');
});


Cypress.Commands.add('clearCartAPI', () => {
    cy.request({
        method: 'GET',
        url: '/cart/getcart',
        headers: {'x-requested-with': 'XMLHttpRequest'},
    }).then((res) => {

    const cartItems = res.body?.jsonCart?.CartItems || [];

    // Cart already empty
    if (cartItems.length === 0) {
      return;
    }

    cartItems.forEach(item => {

      cy.request({
        method: 'POST',
        url: '/cart/delete',
        headers: {'x-requested-with': 'XMLHttpRequest'},
        qs: {
          lineItemId: item.Id,
          itemNumber: item.ItemNumber,
          hashCode: item.Id
        },
      }).then(deleteRes => {
        expect(deleteRes.body.success).to.eq(true);
      });

    });
  });

})

Cypress.Commands.add('searchProduct', (itemNumber) => {
    cy.get(locators.home.searchInput).filter(':visible').invoke('val', itemNumber).trigger('input');
    cy.get(locators.home.executeSearch).filter(':visible').click();
})
