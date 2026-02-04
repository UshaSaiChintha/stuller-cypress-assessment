import { locators } from '../support/locators'

it("Task 1 - Test for End-to-End Workflow Automation", () => {

    const ITEM_NUMBER = '4196:4677:P';
    const SPECIAL_INSTRUCTION = 'Task 1 - E2E Workflow Automation';

  // Step 1: Visit homepage
  cy.visit('/');

  // Step 2: Login using attached username and password
  cy.login();
  
  // Step 3: Search for a product from homepage - 4196:4677:P
  // Create a custom command to search for the product from homepage. Use this command to search for a given item from the the test.
  cy.searchProduct(ITEM_NUMBER);

  // clearing cart to make sure cart is empty before adding new item
  cy.clearCartAPI();
  
  //Step 4: Make a note of item number
  cy.contains(locators.product.itemNumber, ITEM_NUMBER).should('be.visible');
  cy.get(locators.product.itemNumber).invoke('text').as('itemNumber');

  //Step 5: Enter a Special instruction - Task 1 - E2E Workflow Automation
  cy.get(locators.product.specialInstructions).invoke('val', SPECIAL_INSTRUCTION).trigger('input', { force: true }).trigger('change', { force: true });

  //Step 6: Add product to cart

  // Validating on API front too (Step 10)
  cy.intercept('POST', '**/addtocart**').as('addToCart');
  cy.get(locators.product.addToCartButton).should('not.be.disabled');
  cy.get(locators.product.addToCartButton).click({waitForAnimations: false});
  cy.wait('@addToCart').then(({ response }) => {
    expect(response.statusCode).to.eq(200);

    const body = response.body;

    expect(body.success).to.eq(true);
    expect(body.cartItemsCount).to.eq(1);
    expect(body.currentItemQuantity).to.eq(1);

    expect(body.cartItems).to.have.length(1);
    expect(body.cartItems[0].ItemNumber).to.eq(ITEM_NUMBER);
    expect(body.cartItems[0].PostModel.SpecialInstructions).to.eq(SPECIAL_INSTRUCTION);
    expect(body.cartItems[0].PostModel.Quantity).to.eq(1);
  });
  
  //Step 7: Visit https://www.stuller.com/cart
  cy.visit("/cart");
  
  //Step 8: Verify cart count is 1
  cy.get(locators.cart.cartCount).first().should('have.text', '1');

  //Step 9: Verify item number and special instructions match
  cy.get(locators.cart.itemNumber).should('have.text', ITEM_NUMBER);
  cy.get(locators.cart.specialInstructions).should('have.text', SPECIAL_INSTRUCTION);

  // Validating on API front too (Step 10)
  cy.request({
    url: '/cart/getcart',
    headers: { 'x-requested-with': 'XMLHttpRequest' }
  }).then(res => {
    
    const items = res.body.jsonCart.CartItems;

    expect(items).to.have.length(1);

    const item = items[0];

    expect(item.ItemNumber).to.eq(ITEM_NUMBER);
    expect(item.PostModel.SpecialInstructions).to.eq(SPECIAL_INSTRUCTION);
    expect(item.PostModel.Quantity).to.eq(1);
});
  
  //Step 10: In addition to the required verifications, we encourage you to be creative in enhancing the test.
  // You may add any additional validations, improvements, or enhancements that you believe would:
  // Improve test robustness
  // Increase coverage of critical functionality
  // Make the test more maintainable or reliable
  // Demonstrate real-world testing practices
});