# Website QA plan

QA follows the public behavior and integration boundaries described in the website brief. Tests will be added after the relevant pages and stable accessible controls are present, so assertions describe user-visible behavior rather than internal implementation details.

## Unit coverage

- Locale validation and localized dictionary/config contracts, including pricing remaining explicitly draft with no numeric prices.
- Any small pure validation or URL helpers exposed by the completed account, form, showcase, and studio-link flows.

## Browser coverage

- English/German navigation and language switching; desktop links and the mobile menu, including its expanded state, Escape close, and link navigation.
- Dark/light theme selection and persistence across reloads.
- Homepage normal scrolling, stage content, reduced-motion behavior, and the static fallback when WebGL is unavailable.
- Pricing presentation retaining draft/no-charge status and omitting fabricated amounts or checkout claims.
- Account page showing an honest unavailable/sign-in integration state without identity or protected data.
- Forms validating required and malformed input while reporting integrations unavailable instead of claiming submission success.
- Showcase visibility and public/private permission behavior, plus configured studio links without a guessed production origin.

## Execution and evidence

The implemented browser coverage is in `e2e/site.spec.ts`; pure locale, pricing, and URL contract checks are in `tests/contracts.test.ts`, alongside the integration-handler tests under `src/`. Playwright uses port 3100 and accepts `CHROMIUM_PATH` for a system Chromium. GitHub Actions installs Chromium and FFmpeg, then runs lint, typecheck, unit tests, production build, and browser tests without production secrets.

Evidence is saved under `docs/verification/screenshots/`: `home-desktop.png`, `mobile-home.png`, `mobile-menu-de.png`, `home-light.png`, `home-dark.png`, `home-stage-04.png`, `home-stage-05.png`, `home-stage-08.png`, `features.png`, `pricing.png`, `showcase.png`, and `showcase-viewer.png`. The short scroll capture is `docs/verification/video/home-story.webm` (about 416 KB).

## Verification status

- Unit tests: lead reports 3 files and 9 tests passing.
- Lint and typecheck: lead reports passing after integration.
- Browser checks against production: 11/11 passed on the prior production build in 19.6 seconds. This includes English/German navigation and mobile menu, theme persistence and blocked storage, homepage reduced-motion/WebGL/no-WebGL paths, pricing, account, newsletter/inquiry validation and unavailable APIs, public showcase viewer Escape/focus restoration and unknown-model 404, bundle scope, and 40 localized public-route HTML/lang checks. A final browser rerun is pending the latest contrast and accessibility CSS build.
- Screenshots and a short scroll video were captured after production builds. The set covers desktop/mobile, dark/light themes, homepage stages, pricing, features, and the 3D showcase viewer. Refreshing evidence after the latest contrast update is pending.
- Unit tests passed (3 files, 9 tests), and lint and typecheck passed after QA changes.
- CI is configured in `.github/workflows/ci.yml` to run lint, typecheck, unit tests, production build, and Chromium browser tests without production secrets.
