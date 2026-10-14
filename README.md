# Automation Testing Assessment

UI automation (Playwright + Page Object Model)
## Tech Stack
- Playwright (JavaScript, ES Modules)
- Page Object Model (BasePage + page classes)
- Playwright HTML Report
- Postman + Newman (API automation)

## Prerequisites
- Node.js v18 or later (https://nodejs.org)
- Git

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



# Reqres API Automation Assessment

This repository contains the Postman collection for the Reqres API Automation assessment. The tests cover user authentication, CRUD operations, and error handling scenarios using the Reqres public API.

## 🛠️ Tools & Technologies Used
- **Postman** (For API Testing & Automation)
- **JavaScript** (For writing test scripts in Postman)
- **GitHub** (For version control and submission)

## 📋 Prerequisites
Before running the tests, ensure you have:
1. Postman installed on your local machine.
2. A valid API Key from [Reqres.in](https://app.reqres.in/). 
   *(Note: The API key used in the environment is `free_user_3Kgt9qOEdZpqCPHSouCA6tnye3W`)*.

## 🚀 Execution Process (How to Run)

Follow these steps to execute the tests locally:

### 1. Import the Collection
- Open Postman.
- Click on **Import** in the top left corner.
- Select the `Api_automation.json` file from this repository.

### 2. Set up the Environment
- Create a new Environment in Postman named `Reqres_Env`.
- Add the following variables:
  - `baseUrl` : `https://reqres.in/api`
  - `userId` : `2`
  - `authToken` : *(Leave blank, it will be captured automatically during the test run)*
- Select the `Reqres_Env` from the environment dropdown at the top right.

### 3. Run the Tests (Sequential Way)
- Click on the `...` (three dots) next to the `Api_automation` collection.
- Select **Run Collection**.
- Ensure the requests are ordered sequentially: **Q3 -> Q4 -> Q5 -> Q6 -> Q8**.
- Click **Run Api_automation**.

### 4. Run Tests Altogether (Collection Runner)
- The Collection Runner will execute all requests in the defined order.
- You can view the test results (Pass/Fail) in the Runner window.

## 🧪 Test Scenarios Covered

| Task | Method | Endpoint | Description | Assertions |
| :--- | :--- | :--- | :--- | :--- |
| **Q3** | POST | `/login` | Login with registered credentials | Status 200, Capture `authToken` |
| **Q4** | GET | `/users/{{userId}}` | Get user by userId | Status 200, Verify Name & Email match |
| **Q5** | PUT | `/users/{{userId}}` | Update full profile | Status 200, Verify `updatedAt` timestamp |
| **Q6** | PATCH | `/users/{{userId}}` | Update single field (Job) | Status 200, Verify only that field changed |
| **Q8** | GET | `/users/9999` | Bad Request (User Not Found) | Status 404 |
| **Q8** | POST | `/login` | Bad Request (Missing Password) | Status 400, Verify error message |

## 📊 Generating Reports
To generate an HTML report using Newman CLI (Optional):
1. Install Newman: `npm install -g newman`
2. Install HTML Reporter: `npm install -g newman-reporter-htmlextra`
3. Run the collection:
   ```bash
   newman run Api_automation.json -e Reqres_Env.json -r htmlextra
npm run report
```
Screenshots, videos and traces of failed tests are saved in `test-results/`.

