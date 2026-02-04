# stuller-cypress-assessment


# Setup Instructions

Clone the repository:

```bash
git clone https://github.com/UshaSaiChintha/stuller-cypress-assessment.git
cd stuller-cypress-assessment
```

Install dependencies:

```bash
npm install
```

---

# ▶️ How to Run Tests

### Open Cypress Test Runner (UI mode)

```bash
npx cypress open
```

### Run in Headless Mode

```bash
npx cypress run
```

---

# Framework Design Decisions

## 1. Locator Abstraction

All selectors are centralized for maintainability:

```
cypress/support/locators.js
```

Benefits:

- Avoids duplication
- Easier DOM updates
- Improves readability

---

## 2. Custom Commands

Reusable workflows abstracted into:

```
cypress/support/commands.js
```

Implemented commands:

| Command | Purpose |
|--------|---------|
| `cy.login()` | Logs in user |
| `cy.searchProduct()` | Searches product from homepage |
| `cy.clearCartAPI()` | Clears existing cart items via API |

---

## 3. Base URL Usage

Configured in:

```
cypress.config.js
```

Enables relative navigation:

```js
cy.visit('/')
cy.visit('/cart')
```

---

## 4. Secured Credentials

Credentials stored in config:

```
cypress.config.js
```

Accessed using:

```js
Cypress.env('USERNAME')
Cypress.env('PASSWORD')
```

---

# Debugging Notes

The original test suite had multiple reliability issues.

### Hard Waits

```js
cy.wait(3000)
cy.wait(5000)
```

- Slows execution
- Causes flakiness

### Index-Based Selectors

```js
cy.get('input').eq(8)
```

- Breaks when DOM changes

### Weak Assertions

```js
cy.get('.mainPrice').should('not.be.empty')
```

- Doesn’t ensure visibility

### Direct URL Navigation

```js
cy.visit('https://www.stuller.com/...')
```

- Environment inflexible

---

# Stability Improvements

### Removed Hard Waits

```js
cy.get(locator).should('be.visible')
```

### Stable Selectors

```js
[data-test="quantity"]
[data-test="ship-date"]
```

### Cart Isolation

```js
cy.clearCartAPI()
```

### Strong Assertions

```js
cy.get(priceLocator)
  .should('be.visible')
  .and('not.have.text', '')
```

---

# New Test Cases Added

## 1. Invalid Quantity — API Validation

**Objective:** Backend rejects invalid cart operations.

**Steps:**
Set quantity = 0 
Click on Add to Cart Button
Intercept API and assert on api result

---

## 2. Invalid Quantity — UI Validation

**Objective:** UI displays validation feedback.

**Steps:**
Set quantity = 0 
Click on Add to Cart Button
Assert on UI front
```

---

# Assumptions

- Test credentials remain active
- SKU data stable
- API uses Basic Auth
- Cart APIs accessible

---

# Future Improvements

- Fixtures for SKU data

---

# 📁 Project Structure

```
cypress/
 ├─ e2e/
 │   ├─ workflow.cy.js
 │   ├─ api-ui.cy.js
 │   └─ debug.cy.js
 ├─ fixtures/
 ├─ support/
 │   ├─ commands.js
 │   └─ locators.js
 │
cypress.config.js
package.json
README.md
```

---

# Summary

Framework demonstrates:

- UI + API hybrid validation
- Custom command design
- Test isolation
- Flakiness debugging
- Strong assertion practices
