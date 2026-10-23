# SmartBau public website

Independent English/German product website for SmartBau. Next.js App Router + React + TypeScript, a semantic CSS design system, scoped GSAP/ScrollTrigger and lazy standalone Three.js experiences. No CAD engine, BIM stores, WASM or application bundle is included.

## Develop

Node **22 or newer** (validated with Node 24.19.0) and npm. From this repository:

```bash
npm ci
npm run dev
```

The website uses port **3100**, independently from the SmartBau reference application. On restricted cloud machines set `npm_config_cache=/workspace/.npm-cache`; the default home cache may be unwritable. For CI/browser tests install Chromium with `npx playwright install --with-deps chromium`, or set `CHROMIUM_PATH=/usr/bin/chromium` when a system browser is available.

```bash
npm run lint
npm run typecheck
npm run test
npm run build
CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e
npm run format:check
```

`npm start` serves the production build on 3100. Playwright reuses an existing local server; CI starts its own server. See the verification report for which serving mode was exercised.

## Routes

`/` redirects to `/en`. Every page is available under `/en` and `/de`: home, features, pricing, updates, roadmap, newsletter (including unsubscribe), partners, plugins and concept details, help, showcase and model details, account, and legal/privacy/terms/imprint. Unprefixed marketing URLs redirect to English. Locale root layouts render the correct server-side HTML language; the language switch retains the current route.

## Deployment settings

Copy `.env.example` to `.env.local` only when needed; never commit secrets.

- `NEXT_PUBLIC_APP_URL`: approved application URL for launch links. Unset means the site explains that the app link is unconfigured; no production domain is guessed.
- `NEXT_PUBLIC_SITE_URL`: approved website origin for absolute canonical/social URLs and sitemap. Unset keeps previews non-indexable and the sitemap empty. Configure before the deployment build.

Both variables are public build-time configuration. No service credential belongs in `NEXT_PUBLIC_*`. Public URLs reject unsafe schemes and embedded credentials.

Deploy as a standard Node Next.js application or a compatible managed host. CI performs lint/typecheck/unit/build/browser checks. No deployment account, public preview URL or production domain has been supplied, so none is claimed here.

## Honest integration boundaries

Pricing is a **typed, unapproved draft**, with no official prices, credit allocations or feature limits. Checkout, entitlement enforcement, authenticated model uploads, newsletter delivery, partner delivery, plugin execution and AI help are not enabled. No identity database or guest account is created. Newsletter/inquiry/plugin/unsubscribe endpoints validate bounded input, reject cross-origin submissions and return versioned **503 unavailable** without storing or forwarding data. The assistant is unavailable. See [integration contracts](docs/integrations.md) before connecting any service.

The newsletter archive links sourced product updates; it is not a fabricated history of sent emails. Legal pages are clearly marked drafts and need actual operator details and legal review before publication. Only the original, explicitly public demonstration model is offered in the gallery. There are no private user models or functional upload controls.

## Design and assets

Yellow `#FACC15` is primary; blue `#38BDF8` identifies engineering. Dark/light semantic tokens and selective frosted glass use CSS, avoiding a global optical rendering dependency. Radius and motion language are inspired by the read-only SmartBau design references; website components are independent.

The homepage is static-first with an original SVG poster and an eight-stage procedural building in a sticky scroll story. GSAP and Three.js load only in their client experiences. Reduced motion, Save-Data and no-WebGL preserve readable content and posters. The gallery loads a **37,924-byte** original GLB only on request; [generation source and provenance](public/models/README.md) are included. [Actual product capture provenance](public/product/SOURCE.md) is recorded separately from illustrative website assets.

See [architecture](docs/architecture.md), [foundation API](docs/foundation.md), [progress/handoff](PROGRESS.md) and [verification](docs/verification/qa-plan.md). The source brief is retained at `docs/website-brief.md`.
