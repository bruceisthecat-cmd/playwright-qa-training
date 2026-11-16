# telemetry-qa

Playwright + TypeScript framework covering Epics 1-3, running against a local mock app.

## Run
```bash
npm install
npx playwright install
npm run test:visual:update      # first time only: create baseline screenshots
npm test                        # everything, Chromium + Firefox
npm run test:smoke              # npx playwright test --grep @smoke
npm run report                  # open the HTML report
```
Reports: `reports/html` (stakeholders) and `reports/results.json` (CI).

## Layout
- `mock-app/`: stand-in for the real app (SSE, 503-able endpoint, audio, canvas map, SharedWorker)
- `src/pages/DashboardPage.ts`: top-level page object, composes the components
- `src/components/`: one class per widget; `components/map/` splits the canvas map into sub-components
- `src/fixtures/base.ts`: `dashboard` fixture + auto console-error audit in teardown
- `tests/`: one spec file per epic, plus visual

## Tags
`@smoke` baseline, `@network`, `@media`, `@multitab`, `@visual`, `@slow`.

## Notes
- Playwright reports Chrome's `Severe` logs as `error`; the audit fails on those and on uncaught exceptions.
- Req 1.3 uses CDPSession, which exists only in Chromium, so it skips on Firefox.
- Snapshots are per browser AND per OS. Generate baselines in the same environment CI uses.
- Pointing at the real app: change `baseURL`, remove `webServer`, update the locators in `src/components/`.
