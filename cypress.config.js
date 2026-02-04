const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.stuller.com',
    env: {
      USERNAME: 'stullerqa26752',
      PASSWORD: '7$9e!PuQm',
      API_BASE_URL: 'https://api.stuller.com'
    },
  },
});
