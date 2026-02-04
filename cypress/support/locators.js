export const locators = {
  general: {
    span: 'span',
  },

  home: {
    loginButton: 'span:contains("Log In")',
    accountButton: '[data-test="Account"]',
    searchInput: '[data-test="search-input"]',
    executeSearch: '[data-test="execute-search"]',
  },

  login: {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    submit: '[data-test="log-in"]',
  },

  product: {
    itemNumber: '[data-test="item-number"]',
    specialInstructions: '[placeholder="Reviewed Prior to Shipping"]',
    quantity: '[data-test=quantity]',
    price: '.mainPrice',
    addToCartButton: '.addToCartButton',
    priceWhole: '.whole',
    priceDecimal: '.decimal',
    productTitle: '[data-bind="html: Title()"]',
    statusMessage: '[data-test="status-message"]',
    shipDate: '[data-test=ship-date]',
  },

  cart: {
    cartCount: '[data-test="cart-item-count-on-tab"]',
    itemNumber: '[data-test="item-number"]',
    specialInstructions: '[data-test="special-instructions"]',
    cartQuantity: '[aria-label=Quantity]',
  },
};
