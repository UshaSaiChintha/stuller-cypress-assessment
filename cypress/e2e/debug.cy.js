import { locators } from '../support/locators'

describe('packaging product page', () => {

  const ItemNumber = '61-0089:100000:T'

  it('should load and have product details', () => {
    // cy.visit('https://www.stuller.com/search/results?query=61-0089:100000:T')
    cy.visit('/')
    cy.searchProduct(ItemNumber)

    // cy.wait(3000)

    // Item number should be visible
    cy.contains(ItemNumber).should('exist')

    // cy.wait(2000)

    // Price should be non-zero
    // cy.get('.mainPrice').should('not.be.empty')
    cy.get(locators.product.price).should('be.visible').and('not.have.text', '')

    // cy.wait(1500)

    // Ship date should be available
    cy.login()
    cy.get(locators.product.shipDate).should('be.visible')
  });

  it('should update quantity and have ability to add product to the cart', () => {
    // cy.visit('https://www.stuller.com/search/results?query=61-0089:100000:T')
    cy.visit('/')
    cy.searchProduct(ItemNumber)
    cy.clearCartAPI()

    // cy.wait(5000)

    // Update quantity
    // cy.get('input').eq(8).clear().type('5')
    cy.get(locators.product.quantity).invoke('val', '5').trigger('input')

    // cy.wait(2000)

    // Click on Add To Cart button
    // cy.get('.addToCartButton').click()
    cy.get(locators.product.addToCartButton).first().click()

    // Visit cart page
    cy.visit('/cart')

    // Verify cart page lists the same quantity
    // cy.get('input').eq(3).should('have.value', 5)
    cy.get(locators.cart.cartQuantity).should('have.value', 5)
  })

  // Please add 2 more test cases here
  it('should show error message when adding product with zero quantity on API front', () => {
  cy.visit('/');
  cy.searchProduct(ItemNumber);

  cy.get(locators.product.quantity).invoke('val', '0').trigger('input')

  cy.intercept('POST', '**/addtocart**').as('addToCart');
  cy.get(locators.product.addToCartButton).first().click()

  cy.wait('@addToCart').then(({ response }) => {
  expect(response.statusCode).to.eq(200); 
  expect(response.body.error).to.eq(true);
  expect(response.body.message).to.eq('Please enter a valid quantity.');
  expect(response.body.cartItemsCount).to.eq(0);
  expect(response.body.currentItemQuantity).to.eq(0);
  });
  });


  it('should show error message when adding product with zero quantity on UI front', () => {
  cy.visit('/');
  cy.searchProduct(ItemNumber);

  cy.get(locators.product.quantity).invoke('val', '0').trigger('input')
  cy.get(locators.product.addToCartButton).first().click()
  cy.contains('Please enter a valid quantity.').should('be.visible');



  })
})