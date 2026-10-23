# Latest integration checkpoint — 2026-10-23

Target repository: **try-bau/web-page**, branch **feat/premium-website**. The initially empty repository is bootstrapped independently. **SmartBau reference checkout remains clean and unchanged.** Original request: docs/website-brief.md.

## Completed

- Luna A: Next.js foundation, EN/DE root HTML language and route aliases, semantic yellow/blue tokens, dark/light themes, glass primitives, mobile menu and complete footer navigation. Storage-blocked theme fallback included.
- Luna B: original static-first architectural hero, eight-stage continuous GSAP/ScrollTrigger story with sticky procedural Three.js scene, lower-detail mobile rendering, cleanup, reduced-motion/Save-Data and no-WebGL posters. Prepared demonstration, not live AI rendering.
- Luna C: features with real CAD evidence and pinned source claims, typed unapproved pricing and period switch, updates/searchable archive, roadmap, newsletter/unsubscribe, partners and legal drafts. No invented prices/logos.
- Luna D: public model gallery/search/detail and lazy GLB viewer with keyboard/pointer/button camera controls, native dialog/focus restoration, fallback/disposal; plugin concept directory/details and honest submission state. Original CC0 GLB is **37,924 bytes**; source generator and SHA included.
- Luna E: safe configurable launch/site URLs, account integration-ready UI without fake identity/data, 14 grounded EN/DE help topics/search; bounded validated no-store 503 endpoints without PII persistence or real service side effects; documented auth/billing/storage contracts.
- Luna F: CI, unit/browser checks and screenshot/video evidence. Lead reviewed source/security, repaired stale product claims, metadata, nested landmarks, asset redirect collision, light contrast and pointer target sizes.

## Verification at this save

Production build, lint and typecheck pass. Unit tests: **3 files / 9 passed**. Production Playwright: **11 passed** and **40 localized route HTML/language checks passed** before the last accessibility/structured-data corrections; final rerun is underway after those scoped changes. Initial automated accessibility scan found public-page light-theme contrast and story target-size failures; fixes are implemented and final scan is pending. No waived test assertions or disabled failures.

## Configuration and remaining services

The independently runnable website is implemented; provider-dependent features remain deliberately disabled. Required owner configuration: approved app/site URLs; official pricing/limits/AI credits; auth/API integration; payment sandbox/verified webhooks/entitlements; email double opt-in/unsubscribe delivery; partner/support provider; authenticated private upload storage/moderation; plugin runtime; operator/legal details; hosting/domain. No real charging, email delivery, private upload, connected account or live AI help is claimed. Preview deployments are non-indexable without an approved site origin.

## Resume

Clone this repository/branch, run `npm ci`, read AGENTS.md and this file, then `npm run dev` (3100). Validate `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`; with Chromium installed, `CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e` and `node scripts/verify-accessibility.mjs`. See README.md and docs/architecture.md for integration boundaries. Preserve local work; never modify the read-only SmartBau app. No deployment or new GitHub PR is claimed without an actual result.

---

# SmartBau website progress

2026-10-23: Empty target repository verified reachable; created feat/premium-website. SmartBau reference clean and unchanged. Original brief saved at docs/website-brief.md.

## Task board

- Lead: architecture, reference product audit, integration/security review, verification, commits.
- Luna A: foundation, localized shell, glass primitives, theme, tokens, project config.
- Luna B: original architectural hero/scene, scoped GSAP, poster and reduced-motion fallbacks.
- Luna C: public pages/features/pricing/updates/roadmap/newsletter/partners/legal.
- Luna D: showcase gallery/viewer, original demo model, plugins directory.
- Luna E: config/contracts/account/help/search and honest integration endpoints.
- Luna F: unit/browser verification, CI, evidence and bundle analysis after integration.

### Luna C — public pages (2026-10-23)

- Implemented localized features, draft pricing, source-dated updates, roadmap, newsletter, partner inquiry and legal template routes.
- Features and roadmap are tied to the audited SmartBau reference revision; shared canvas and AI are labeled Beta with deployment/security caveats. Added an actual product capture and recorded its source in `public/product/SOURCE.md`.
- Newsletter and partner forms POST to `/api/newsletter` and `/api/inquiries`, show success only for a successful server response, and render explicit unavailable states otherwise. Pricing is versioned draft data with no amounts or charging path.
- Targeted ESLint passed. `npm run typecheck` is currently blocked by unrelated errors in `e2e/site.spec.ts` and `src/components/home/ArchitecturalScene.tsx`; no public-page errors were reported. No tests run.

Contracts: src/app/[locale]/ layout owned A; page.tsx owned B; subroute page modules owned C/D/E. Components split foundation/, home/, public/, showcase/, integrations/. Shared lib/i18n.ts owned A exports Locale, isLocale and locale helpers; lib/config.ts owned E. Props locale: 'en'|'de'. CSS owned per agent component folder or CSS modules; global CSS A only. Default root route redirects /en; localized pages always include locale. Backend unavailable by default; no fabricated success.

## Gates

1. Foundation builds/theme/nav verified.
2. Homepage static-first, eight-stage original architecture, normal scroll and fallbacks.
3. Public pages accurate and localized.
4. Help sources/search, safe integration-ready account/forms.
5. Showcase viewer and plugins honest planned state.
6. Build/lint/unit/browser/SEO/performance evidence, save/push safe branch.

2026-10-23: Luna E added validated `NEXT_PUBLIC_APP_URL` config with localized account fallback, versioned unavailable integration contracts, bounded JSON validation and honest 503 handlers for newsletter/inquiries/plugin submissions/assistant. Added EN/DE searchable sourced help and an account page with explicitly unavailable subscription, credits, and model sections. See `docs/integrations.md`. No SSO, fake account data, email, persistence, charging, or AI service is enabled.

Luna E verification: focused integration/config tests passed (4/4); ESLint passed on assigned files. `npm run typecheck` is currently blocked by a TypeScript parse error in the concurrently authored `src/app/[locale]/plugins/[slug]/page.tsx` (not owned by E).

2026-10-23: Luna B completed a localized static-first homepage with a scoped GSAP ScrollTrigger client island, continuous architectural assembly, original SVG poster and procedural Three.js model. Reduced-motion, Save-Data and no-WebGL paths retain the poster and story controls; the scene stops rendering offscreen and disposes on unmount. Hero and closing CTAs use the validated app URL with localized account fallback. Targeted ESLint and homepage-scoped TypeScript checks pass; `/en` returned HTTP 200 with SSR HTML. Full production build compiles but its type-check remains blocked by unrelated `e2e/site.spec.ts` errors.

2026-10-23: Luna D completed the translated showcase gallery/detail routes and plugin roadmap/detail pages. The original parametric pavilion GLB is 37,924 bytes (CC0 1.0); generator, provenance, SHA-256 and validation are recorded in `scripts/generate-showcase-model.py` and `public/models/README.md`. The Three.js/GLTFLoader viewer is a dynamic client chunk loaded only after the visitor selects 3D; it provides orbit/pan/zoom/reset/fullscreen, keyboard and button controls, reduced-motion/Save-Data/no-WebGL poster fallback, hidden-tab pause, and full cleanup. Public share links and a clearly labeled iframe for the public detail page are available. Plugin proposals POST JSON to the honest unavailable `/api/plugin-submissions` endpoint; no plugin runtime/install is represented. Verification: ESLint and `tsc --noEmit` pass; focused showcase asset test passes (1/1); GLB generator validation passes.
