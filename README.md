# Automation Testing Assessment

UI automation (Playwright + Page Object Model)
## Tech Stack
- Playwright (JavaScript, ES Modules)
- Page Object Model (BasePage + page classes)
- Playwright HTML Report
- Postman + Newman (API automation)



## Setup
```bash
git clone <your-repository-url>
cd saucedemo-reqres-automation
npm install
npx playwright install chromium
```

## Project Structure
```
Pageobjects/  -> BasePage and page classes (Login, Inventory, Cart, Checkout)
testdata/     -> Test data (users, messages, expected prices)
tests/        -> UI test scenarios (Q1, Q2, Q3)
postman/      -> Postman collection and environment (API tests)
```

## UI Automation (https://www.saucedemo.com/)

 Scenario  Description 

 Q1. locked_out_user login and error message verification 
 Q2. standard_user: reset state, add 3 items, verify name and total, order success, reset, logout 
 Q3. performance_glitch_user: reset state, sort Z-A, add first item, verify, order success, reset, logout 

### Run each scenario separately
```bash
npm run test:q1
npm run test:q2
npm run test:q3
```

### Run all scenarios sequentially
```bash
npm run test:ui
```

### Headed mode (browser visible)
```bash
npm run test:ui:headed
```

## Reports
An HTML report is generated automatically after every execution in `playwright-report/`.
```bash



