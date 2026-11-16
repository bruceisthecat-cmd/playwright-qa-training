
# QA Testing | Playwright & TypeScript

A hands-on QA testing project combining requirements analysis, test design, and AI-assisted test automation using Playwright and TypeScript.

The project demonstrates how I apply nearly 10 years of professional manual QA, integration testing, and UAT experience to modern automation tools.

## My Approach

My primary focus was evaluating requirements, determining appropriate test coverage, and validating that automated tests checked the intended application behavior.

I used Claude AI to assist with generating and refining test code while remaining involved in:

- Reviewing requirements and identifying test scenarios
- Evaluating positive, negative, integration, and regression coverage
- Reviewing assertions and expected outcomes
- Executing tests and investigating failures
- Correcting validation issues
- Organizing reusable test components
- Configuring and troubleshooting GitHub Actions

This is an independent learning project, not automation developed during my employment at Citi.

## Test Results

**12 functional regression tests passed in GitHub Actions CI.**

The CI workflow runs Playwright tests automatically when changes are pushed to the repository.

The project also includes additional tests and browser configurations beyond the 12-test CI regression selection.

## Technologies

- Playwright and TypeScript
- Node.js
- Git and GitHub
- GitHub Actions (CI)
- Page Object Model (POM)
- Claude AI-assisted code development

## Test Coverage

The project includes testing of:

- Positive and negative login scenarios
- Login error handling and validation
- Network behavior and failure scenarios
- Media and canvas interactions
- Multiple browser tabs
- Visual regression scenarios

The telemetry tests run against a local mock application. Separate login tests use the SauceDemo demonstration application.

## Project Structure

- `mock-app/` — Local mock application supporting SSE, simulated 503 responses, audio, canvas maps, and SharedWorker functionality
- `src/pages/DashboardPage.ts` — Dashboard page object
- `src/components/` — Reusable application component classes, including map components
- `src/fixtures/base.ts` — Dashboard fixture and console-error auditing
- `tests/` — Functional, integration, login, media, multitab, and visual tests
- `.github/workflows/` — GitHub Actions CI workflow
- `playwright.config.ts` — Playwright configuration

## Running the Tests

Install dependencies:

```bash
npm install
npx playwright install
```

Run the complete test suite:

```bash
npm test
```

Run smoke tests:

```bash
npm run test:smoke
```

Generate visual regression baselines when needed:

```bash
npm run test:visual:update
```

Open the HTML report:

```bash
npm run report
```

Reports are generated in `reports/html` and `reports/results.json`.

## Test Tags

`@smoke`, `@network`, `@media`, `@multitab`, `@visual`, `@slow`

## Technical Notes

- Playwright treats Chrome's `Severe` console logs as errors. The console audit also checks for uncaught exceptions.
- Requirement 1.3 uses CDPSession, which is Chromium-specific and therefore skipped in Firefox.
- Visual regression snapshots are browser- and operating-system-specific. Generate baselines in the same environment where tests will run.
- To test against a real application, update `baseURL`, remove or replace the local `webServer` configuration, and adjust component locators.

## What I Learned

This project strengthened my practical understanding of automated test execution, reusable test architecture, CI pipelines, and troubleshooting.

More importantly, it reinforced the importance of applying QA judgment to automation: a passing test is only meaningful when it validates the correct requirements and expected behavior.
