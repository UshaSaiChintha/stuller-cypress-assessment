import { locators } from '../support/locators'

it("Task 2 - API + UI Hybrid Validation", () => {

    const SKU = '51424:1001:P';

    let apiProduct;

    // Step 1: Use cy.request() to fetch product data
    cy.request({
        method: 'GET',
        url: `${Cypress.env('API_BASE_URL')}/v2/products`,
        qs: { SKU }, 
        auth: {
            username: Cypress.env('USERNAME'),
            password: Cypress.env('PASSWORD')
        },   
    }).then(res => {

        // Step 3: API response status code should be 200
        expect(res.status).to.eq(200);
        apiProduct = res.body?.Products?.[0];
        expect(apiProduct).to.exist;
        expect(apiProduct.SKU).to.eq(SKU);
    });

    // Step 2: Search for the same product in UI
    cy.visit('/');
    cy.login();
    cy.searchProduct(SKU);
    cy.contains(locators.product.itemNumber, SKU).should('be.visible');

    // Step 4: The SKU property from the API response should match the Item Number displayed on the UI
    cy.get(locators.product.itemNumber).invoke('text').then(uiSku => {
        expect(uiSku.trim()).to.eq(apiProduct.SKU);
    });

    // Step 5: Price.Value from the API should match the item price shown on the UI. You will need to login to see the price.
    cy.get(locators.product.priceWhole).invoke('text').then(wholeText => {
        cy.get(locators.product.priceDecimal).invoke('text').then(decimalText => {
            const whole = wholeText.replace(/[^0-9]/g, '');
            const uiPrice = Number(`${whole}.${decimalText}`);
            const apiPrice = Number(apiProduct.Price.Value.toFixed(2));
            expect(uiPrice).to.eq(apiPrice);
        });
    });

    // Step 6: The API Description field should match the product title displayed on the UI
    cy.get(locators.product.productTitle).invoke('text').then(uiTitle => {
        const normalizedUiTitle = uiTitle.trim();
        const apiDescription = apiProduct.Description.trim();
        expect(normalizedUiTitle).to.contain(apiDescription);
    });

    // Step 7: The API Status field should match the availability/status shown on the UI
    cy.get(locators.product.statusMessage).invoke('text').then(uiMsg => {
        const normalizedUiMsg = uiMsg.trim();
        const apiMsg = apiProduct.Status.trim();
        expect(normalizedUiMsg.toLowerCase()).to.contain(apiMsg.toLowerCase());
    })
})