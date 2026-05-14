# OrangeHRM Playwright BDD Framework

A production-grade end-to-end test automation framework built with Playwright, Cucumber BDD, and TypeScript. This framework tests the [OrangeHRM](https://opensource-demo.orangehrmlive.com) HR management application across three core modules with 38 scenarios covering happy path, negative, edge case, boundary value, and security testing.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev) | 1.44.0 | Browser automation |
| [Cucumber](https://cucumber.io) | 10.8.0 | BDD framework |
| [TypeScript](https://typescriptlang.org) | 5.4.5 | Programming language |
| [Allure](https://docs.qameta.io/allure) | 2.29.0 | Test reporting |
| [Node.js](https://nodejs.org) | 18+ | Runtime |
| [GitHub Actions](https://github.com/features/actions) | — | CI/CD pipeline |

---

## Framework Architecture

```
orangehrm-playwright/
├── features/                    # Gherkin feature files
│   ├── login/
│   │   └── login.feature
│   ├── leave/
│   │   └── leave.feature
│   └── recruitment/
│       └── recruitment.feature
├── fixtures/                    # Test data (JSON)
│   ├── users.json
│   ├── leave.json
│   └── recruitment.json
├── src/
│   ├── hooks/
│   │   ├── world.ts             # Custom Cucumber world
│   │   └── hooks.ts             # Before/After hooks
│   ├── pages/                   # Page Object Model
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── LeavePage.ts
│   │   └── RecruitmentPage.ts
│   └── steps/                   # Step definitions
│       ├── common.steps.ts      # Shared steps
│       ├── login.steps.ts
│       ├── leave.steps.ts
│       └── recruitment.steps.ts
├── .github/
│   └── workflows/
│       └── e2e.yml              # GitHub Actions CI/CD
├── cucumber.config.js
├── tsconfig.json
└── .env.example
```

### Design Patterns

- **Page Object Model (POM)** — UI interactions encapsulated in page classes, keeping step definitions clean and maintainable
- **AAA Pattern** — Each page object is structured into Arrange (locators), Act (interactions), and Assert (verifications)
- **Fixture-driven data** — All test data lives in JSON fixtures, no hardcoded values in step definitions
- **Shared steps** — Common steps like login live in `common.steps.ts` to avoid duplication across modules

---

## Test Coverage

### Login Module — 9 Scenarios
| Scenario | Type |
|----------|------|
| Admin logs in with valid credentials | Happy path |
| ESS employee logs in with valid credentials | Happy path |
| Login with incorrect password | Negative |
| Login with non-existent username | Negative |
| Login with empty username | Validation |
| Login with empty password | Validation |
| Login with both fields empty | Validation |
| SQL injection attempt in username field | Security |
| XSS payload in username field | Security |

### Leave Management Module — 16 Scenarios
| Scenario | Type |
|----------|------|
| Admin assigns leave with valid data | Happy path |
| Assign leave for single day boundary | Boundary value |
| Assign button clicked with all fields empty | Validation |
| Assign leave with no employee name | Validation |
| Assign leave with invalid employee name | Negative |
| Assign leave with no leave type | Validation |
| Assign leave with no from date | Validation |
| Assign leave with no to date | Validation |
| Assign leave with past dates shows confirmation | Business rule |
| Assign leave with to date before from date | Validation |
| Assign leave with comment exceeding 250 characters | Boundary value |
| Assign leave that overlaps with existing leave | Business rule |
| Search leave list with no filters | Happy path |
| Search leave list by scheduled status | Filter |
| Search leave list by date range | Filter |
| Reset leave list filters | State |

### Recruitment Module — 13 Scenarios
| Scenario | Type |
|----------|------|
| View all candidates with no filters | Happy path |
| Search candidates by shortlisted status | Filter |
| Search candidates by rejected status | Filter |
| Search candidates by vacancy | Filter |
| Search candidates by Payroll Administrator vacancy | Filter |
| Search candidates by Manual application method | Filter |
| Search by status and vacancy combination | Filter |
| Search by status and vacancy with no results | Negative |
| Search with invalid candidate name shows error | Negative |
| Reset candidate filters | State |
| View candidate detail shows all sections | Happy path |
| Delete candidate shows confirmation dialog | Happy path |
| Cancel delete keeps candidate in list | Negative |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Java 17+ (for Allure reports)

### Installation

```bash
# Clone the repository
git clone https://github.com/HassanTaiwo185/orangehrm-playwright.git
cd orangehrm-playwright

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install chromium firefox
```

### Environment Setup

```bash
# Copy the example env file
cp .env.example .env
```

The `.env.example` file contains the default values for the public demo site. No changes are needed to run the tests out of the box.

---

## Running Tests

### Run stable tests on Chrome (recommended)
```bash
npm run test:stable
```

### Run all tests on Chrome
```bash
npm run test:chrome
```

### Run all tests on Firefox
```bash
npm run test:firefox
```

### Run cross-browser (Chrome + Firefox)
```bash
npm run test:crossbrowser
```

### Run a specific feature
```bash
npx cucumber-js --config cucumber.config.js features/leave/leave.feature
```

### Run by tag
```bash
npm run test:tags -- '@smoke'
```

---

## Test Reports

### Generate and open Allure report
```bash
npm run report:generate
npm run report:open
```

### Serve live Allure report
```bash
npm run report:serve
```

The Allure report includes:
- Pass/fail status per scenario
- Step-by-step execution details
- Screenshots on failure
- Execution timeline
- Feature and story grouping

---

## Tag Strategy

| Tag | Purpose |
|-----|---------|
| `@sharedDemoSite` | Scenarios that write data to the shared demo site. May fail if data already exists from a previous run. Update fixture dates before re-running. |
| `@requiresLocalEnv` | Scenarios that require a local OrangeHRM instance (not the public demo site). |
| `@knownDefect` | Scenarios covering known application bugs. Excluded from CI to prevent false failures. |

The `test:stable` script excludes all three tags to ensure reliable, repeatable CI runs:

```
not @requiresLocalEnv and not @knownDefect and not @sharedDemoSite
```

---

## CI/CD Pipeline

GitHub Actions runs on every push and pull request to `main`. The pipeline:

1. Checks out code
2. Sets up Node.js 18
3. Installs dependencies
4. Installs Playwright browsers
5. Runs stable tests on Chrome
6. Runs stable tests on Firefox
7. Generates Allure report
8. Uploads report as a downloadable artifact (retained for 30 days)

Both browser steps use `continue-on-error: true` to ensure Firefox always runs even if Chrome fails.

---

## Known Limitations

This framework runs against the public demo site at `https://opensource-demo.orangehrmlive.com`. This site is shared globally which means:

- **Data persistence** — Records created by one test run persist for subsequent runs. Scenarios tagged `@sharedDemoSite` may fail if the same data already exists. Update the dates in `fixtures/leave.json` to future dates not yet used.
- **Rate limiting** — The site may become slow or unresponsive when many scenarios run back to back. A 3-second delay between scenarios is built into the After hook to mitigate this.
- **Shared state** — Other users of the demo site may modify data between runs, causing unexpected failures.

In a production environment these issues are resolved by running against a dedicated test environment with a database that resets between runs (e.g. a Docker container with a fresh OrangeHRM instance).

---

## Author

Hassan Taiwo — QA Automation Engineer  
