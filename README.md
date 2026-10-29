# Playwright POM (QA Practice)

Playwright end-to-end automation project for the [QA Practice Lab](https://qa-practice-lab-six.vercel.app/). The project uses TypeScript, Playwright Test, and the Page Object Model (POM) to keep test scenarios separate from page locators and browser actions.

> **Work in progress:** The test suite will continue to evolve.

## Modules covered

- Module 1 — Automation Practice
- Module 2 — ProtoShop
- Module 3 — ShopSphere
- Module 4 — TicketTrail

## Tech stack

- TypeScript
- Playwright Test
- Page Object Model
- Chromium and Firefox projects

## Project structure

```text
tests/
├── pages/                 # Page objects, locators, actions, and page waits
│   ├── base.page.ts       # Shared navigation and common page behavior
│   ├── module.page.ts     # Shared module assertions
│   ├── home.page.ts
│   ├── automation-practice.page.ts
│   ├── protoshop.page.ts
│   ├── login.page.ts
│   ├── dashboard.page.ts
│   └── tickettrail.page.ts
├── specs/                 # Test scenarios grouped by feature/module
│   ├── home.spec.ts
│   ├── module-1.spec.ts
│   ├── module-2.spec.ts
│   ├── module-3.spec.ts
│   └── module-4.spec.ts
└── utils/
    └── test-data.ts       # Reusable credentials and form data
```

The project follows this separation:

```text
pages = locators and UI actions
specs = test scenarios and behavior
utils = reusable test data and non-UI helpers
```

## Installation

```bash
npm install
npx playwright install chromium firefox
```

## Running tests

Run the full suite:

```bash
npm test
```

Run with a visible browser:

```bash
npm run test:headed
```

Run Playwright UI mode:

```bash
npm run test:ui
```

Run one module:

```bash
npx playwright test tests/specs/module-1.spec.js
```

Run one browser project:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

Run a test by title:

```bash
npx playwright test -g "user can log in"
```

## Configuration

The main configuration is in `playwright.config.js`. It defines the base URL, test directory, timeouts, reporters, browser projects, screenshots, videos, and traces.

## Test data

Reusable credentials and form data are kept in:

```text
tests/utils/test-data.js
```

The demo credentials are supplied by the practice application and are used only for testing:

```text
demo@practice.test / Demo@1234
```

Do not store real credentials, API keys, tokens, or personal information in the repository.

## Reports and artifacts

Open the HTML report after a run:

```bash
npx playwright show-report
```

Generated reports, test results, and Playwright MCP artifacts are excluded through `.gitignore`.

## GitHub Actions CI

GitHub Actions runs the Playwright suite automatically on pushes and pull requests targeting `main` or `master`.

The workflow is located at:

```text
.github/workflows/playwright.yml
```

It performs these steps:

1. Checks out the repository
2. Installs Node.js and npm dependencies
3. Installs Chromium and Firefox
4. Runs all Playwright tests
5. Uploads the HTML report after every run
6. Uploads screenshots, videos, traces, and other test results when a run fails

Reports are available in the GitHub Actions run under the workflow artifacts.

## Page Object Model example

The spec describes the behavior:

```js
await loginPage.login(email, password);
await dashboardPage.expectLoggedIn();
```

The page object contains the implementation details:

```js
async login(email, password) {
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.loginButton.click();
}
```

This keeps tests readable and makes locator maintenance easier.

## MCP configuration

The optional Playwright MCP configuration is stored in:

```text
.vscode/mcp.json
```

It is used by compatible clients to inspect and interact with live pages. It is separate from running the automated Playwright test suite.
