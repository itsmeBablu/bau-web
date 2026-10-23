# Website architecture and review

## Ownership

This repository is `try-bau/web-page`; `try-bau/SmartBau` remains unchanged. Luna A owns the foundation/shell, B the homepage and animation, C public content/pricing, D showcase/plugins, E account/help/contracts, F verification/CI. The lead reviews and integrates all results. Work was split into disjoint files within the isolated checkout, with no destructive resets or worktrees.

## Rendering and boundaries

Next.js 16.4.2 App Router with React 19 uses statically generated locale root layouts. Marketing content is server-rendered; theme/menu, forms/search and story/viewer behavior are small client boundaries. Public content is typed EN/DE data rather than duplicated page implementations. Shared semantic CSS tokens provide theme colors and glass controls. System fonts avoid a remote font request.

`HomePage` renders static content; `HomeExperience` imports GSAP and ScrollTrigger asynchronously only when motion is enabled. A GSAP context owns and reverts scroll listeners/tweens. The original building scene is a separate dynamic import. Continuous progress reveals walls, structure, roof, MEP and interiors in a sticky scene; later stages change lighting/camera for a prepared presentation, not live AI rendering. The renderer caps DPR, uses lower detail on mobile, renders only on changes/settling and pauses when outside the viewport. A static poster is present before hydration and remains the fallback.

Showcase cards load neither Three.js nor models until the user opens a public demonstration. The native dialog manages focus/Escape. OrbitControls handles pointer navigation; explicit buttons and keyboard controls cover camera operations. GLTF loading, demand rendering, hidden-tab suspension, late callbacks and GPU disposal are reviewed. Embedding copies a **public detail page** URL and is labeled accordingly; a private-model embed/upload service is not implemented.

## Security review

No account tokens, provider credentials, private room links or billing state cross into website client code. App URL configuration is validated. Existing application auth is documented as an integration boundary; the website never impersonates a guest identity or claims authenticated balances/models. All application-data authorization must remain at the product backend.

Public forms are non-operational integration contracts: streamed request bodies are capped at 8 KiB regardless of Content-Length, JSON fields/email are validated, cross-origin Origin values are rejected, responses are no-store, no PII is logged/stored/forwarded. There is no fake success, payment provider or real charging. A configured service requires durable storage, rate limiting, double opt-in/unsubscribe implementation and verified provider responses before activation.

Response headers disable MIME sniffing, limit referrer data, disable camera/microphone/geolocation, and restrict objects/base/form actions. This is a baseline CSP, not a strict nonce-based deployment CSP. Public detail pages may be embedded; no protected account data is served. HTTPS, hosting logs/retention, abuse moderation, operator privacy notices, production origin rules and service rate limits need deployment-specific review.

## Product truth

Claims reference audited SmartBau source at `68e032702de7b4154cdb15e7c5a213f36ef5d009`. Current code presence is distinguished from deployment availability. Collaboration and hosted AI are beta/deployment-dependent; plugin concepts are planned. Pricing groupings are illustrative and unapproved. Actual CAD captures are labeled separately from original architectural demonstration imagery. No usage statistics, customer logos, official prices or live AI-rendering claims are invented.

## SEO and deployability

Each locale has server-rendered metadata/hreflang. Sitemap/robots and generated PNG Open Graph images are independent of the product. Configure the approved site origin before publishing; previews remain non-indexable without it. The site requires no application backend to build. The provided Node build and CI workflow are the deployment preparation; a live deployment is not claimed without an actual hosting result.

## Remaining owner decisions

Approved app/site URLs; official prices/limits/credits and payment sandbox; identity/API integration approval; newsletter/support/partner providers; upload storage and moderation; operator/legal identity; plugin runtime and permission model; production hosting/domain. These are service configuration/commercial prerequisites, not simulated features.
