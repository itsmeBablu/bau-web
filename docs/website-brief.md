# BUILD SMARTBAU — PREMIUM PRODUCT WEBSITE
## Cloud Codex Multi-Agent Implementation

**Target repository:** https://github.com/try-bau/web-page

**Reference repository (read-only):** https://github.com/try-bau/SmartBau

**Lead architect and administrator:** GPT-6.1 Sol

**Implementation agents:** GPT-6 Luna

**Task:** Build and deliver a professional, responsive SmartBau website from scratch in the new, initially empty repository.

---

# 1. SOL — YOU ARE IN CHARGE

You are the lead engineer, technical architect, product designer, integration owner and final quality reviewer.

Your job is not just to give agents tasks. Your job is to deliver working software.

Use your strongest available reasoning mode for architecture, design decisions, security and review.

Delegate well-defined implementation tasks to GPT-6 Luna agents when supported by the Codex environment.

Luna agents do the implementation. Sol plans, coordinates, checks, tests, fixes and integrates their work.

If Luna model routing or subagent spawning is unavailable, use available workers or execute tasks directly rather than pretending that agents were launched.

**Never finish simply because all agents report their tasks complete. Verify everything yourself.**

---

# 2. REPOSITORY RULES

The target repository is:

`try-bau/web-page`

This is a brand-new, independent website repository.

GitHub inspection showed that it initially contained no files or commits.

First:

1. Verify the current repository and permissions.
2. Check whether an initial commit has been created.
3. Bootstrap the repository and development environment if necessary.
4. Establish a safe working branch and commit workflow.
5. Set up the complete project structure.
6. Create `README.md`, `AGENTS.md` and a durable `PROGRESS.md`.
7. Configure linting, testing, formatting, build and CI.

If Cloud Codex cannot start because the repository has no initial commit, clearly identify that prerequisite rather than claiming the task has started.

**All implementation changes belong in `try-bau/web-page`.**

Do not modify, force-push or commit into `try-bau/SmartBau`.

## SmartBau reference repository

Use `try-bau/SmartBau` only to study and extract approved design patterns, brand tokens, documentation and product information.

Important reference files:

- `packages/drawing-engine/src/designTokens.ts`
- `apps/web/components/common/GlassPanel.tsx`
- `apps/web/lib/gsapMotion.ts`
- `apps/web/src/styles/globals.css` on `main`
- `apps/web/app/globals.css` on `Babu`
- `docs/design-system.md`
- `packages/ui/src/`
- Existing product documentation and screenshots.

Do not clone the entire CAD app into the website.

Do not copy IFC processing, BIM engines, Zustand modeling stores, WASM modules or full CAD viewer components into marketing page bundles.

The website must be independently buildable and deployable.

---

# 3. CHOOSE THE WEBSITE TECH STACK

Use a modern production-ready architecture.

Recommended:

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Three.js / React Three Fiber for isolated 3D experiences, if beneficial
- Lucide React icons
- Accessible UI primitives
- Liquid-glass effects with CSS fallbacks
- Vitest for component/unit tests
- Playwright for browser and interaction tests

Before installing, verify current package compatibility and documentation.

Avoid unnecessary dependencies.

Make marketing pages server-rendered or statically generated wherever appropriate.

Keep the 3D viewer and animation runtime inside lazily loaded client components.

Use one consistent design system, not several overlapping component libraries.

---

# 4. SMARTBAU BRAND IDENTITY — EXACT DESIGN DIRECTION

The new website must visibly belong to the SmartBau product family.

## Core colors

### V-Yellow — Primary

`#FACC15`

Use for:

- Primary CTAs
- Important buttons
- Architecture highlights
- Active navigation indicators
- Architectural model elements
- Selected states
- Important icons
- Brand accent details

Yellow is the principal brand color.

Primary buttons must use accessible dark text on the yellow surface.

### V-Blue — Engineering / MEP

`#38BDF8`

Use for:

- MEP features
- Engineering-related sections
- Secondary accents
- Technical lines and systems
- 3D ducts and pipes
- MEP diagrams
- Selected specialized states

Blue complements yellow; do not make both colors compete equally in every section.

### Dark theme

Use the SmartBau dark foundation, approximately:

- Background: `#090A0F`
- Elevated surface: `#181920`
- Overlay: `#222533`
- Primary: `#FACC15`
- MEP accent: `#38BDF8`

### Light theme

Use clean white and neutral surfaces with the same primary accents.

Create centralized theme tokens:

```css
:root {
  --v-yellow: #facc15;
  --v-blue: #38bdf8;
  --brand-primary: var(--v-yellow);
  --brand-engineering: var(--v-blue);
}
```

Expand these into a complete semantic token system for text, background, borders, cards, focus states, surface elevations and interactions.

Support both dark and light modes.

**Design principle: The website should look like a premium architecture and engineering software brand, not a generic SaaS template.**

---

# 5. LIQUID GLASS DESIGN SYSTEM

Study the original SmartBau `GlassPanel` and liquid-glass presets.

Recreate a standalone website-specific glass system inspired by the source.

Use:

- Refraction-like highlights
- Frosted translucency
- Controlled backdrop blur
- Specular edges
- Subtle surface depth
- Appropriate shadow intensity
- Rounded corners
- Responsive behavior

Suggested dimensions from the source system:

- Large panels: 24px radius
- Controls: 16px radius
- Chips: 12px radius

Create reusable components:

- `GlassNavbar`
- `GlassCard`
- `GlassButton`
- `GlassMenu`
- `GlassModal`
- `GlassPricingCard`
- `GlassFeatureCard`
- `GlassTooltip`

Do not apply heavy glass effects everywhere.

Glass should be prominent in:

- Navigation
- Floating CTAs
- Featured cards
- Interactive 3D overlays
- Premium visual highlights

Text-heavy documentation and legal content should remain easy to read.

Use a lightweight CSS glass fallback for mobile, tablets, low-power devices and browsers where advanced optical effects are expensive or unsupported.

Avoid loading a heavy glass library on every page unless measurements justify it.

No uncontrolled blur, illegible content or glass layers obscuring interactions.

---

# 6. GSAP — ANIMATION SYSTEM

Use **GSAP** as the primary animation engine.

Use ScrollTrigger for scroll-driven storytelling.

Build a reusable motion system rather than scattering unrelated animations across components.

Study SmartBau's `gsapMotion.ts` for the visual language and preferred easing patterns.

Create:

- Shared easing presets
- Duration presets
- Section reveal helpers
- Scroll-progress animations
- Card motion
- Navigation transitions
- Modal transitions
- Camera-tween helpers
- Timeline cleanup utilities

## Motion behavior

Use smooth, deliberate animation.

Examples:

**Navigation**

Glass navigation appears smoothly as the page loads.

On scroll, its layout remains stable while its visual surface subtly changes.

**Typography**

Reveal large headings using restrained opacity and vertical movement.

Avoid animating every character unnecessarily.

**Feature cards**

Slight depth/parallax response.

Smooth hover feedback.

**Sections**

Reveal content as it enters the viewport.

**3D**

Synchronize architectural scene changes with scroll progress.

**Buttons**

Subtle magnetic or tactile response where appropriate, without sacrificing usability.

## Technical requirements

- Use scoped GSAP contexts.
- Clean up animations on unmount.
- Respect `prefers-reduced-motion`.
- Avoid animating expensive layout properties where transforms suffice.
- Prevent duplicated animations under React development behavior.
- Do not block page scrolling.
- Do not create heavy perpetual animations merely for decoration.

Never sacrifice performance for visual effects.

---

# 7. WEBSITE PAGE STRUCTURE

Build these public pages.

## Main pages

1. Home — `/`
2. Features — `/features`
3. Pricing — `/pricing`
4. Updates — `/updates`
5. Roadmap — `/roadmap`
6. Newsletter — `/newsletter`
7. Partners — `/partners`
8. Plugins — `/plugins`
9. Help Center — `/help`
10. Showcase — `/showcase`
11. Account — `/account`
12. Legal pages

Use clean, search-friendly routes.

Create a shared navigation and footer.

On every important marketing page, provide a clear route to launch the CAD application.

The launch URL must be configurable through environment settings.

Do not guess the production CAD domain.

---

# 8. HOME PAGE — PREMIUM 3D ARCHITECTURAL STORY

The homepage is the most visually important part of the website.

Create a compelling architectural product experience.

## Hero concept: "From Idea to Intelligent Building"

A beautiful architectural model is assembled step by step as the user scrolls.

### Stage 1 — Empty Site

Show architectural ground lines, a terrain plot and site grid.

Start with clean technical visual language.

### Stage 2 — Walls Rise

Architectural walls progressively appear.

Use V-Yellow accents.

The motion should reveal the assembly clearly rather than simply popping an entire building into view.

### Stage 3 — Structure

Columns, beams and floor elements appear.

Show the relationship between architecture and structure.

### Stage 4 — Roof

The roof appears and completes the building.

Use smooth but physically understandable assembly transitions.

### Stage 5 — Engineering / MEP

Ducts, pipes, and related building systems appear in V-Blue.

Use a cutaway or section view where necessary.

### Stage 6 — Interior

The camera reveals interior spaces, openings, furniture and construction detail.

### Stage 7 — Render Transformation

The architectural model transitions into a polished architectural presentation render.

Do not falsely portray this as a live AI-generated render if it is a prepared demonstration.

### Stage 8 — Product CTA

Reveal:

**Design smarter. Build better.**

Actions:

- Start Designing
- Explore SmartBau
- View Demo

## Scene architecture

Prefer using a suitable original SmartBau-exported GLB/glTF demonstration model if access and asset rights permit.

Otherwise, create an original lightweight demonstration model specifically for the website.

Do not use generic abstract 3D blobs as the main architectural product story.

Optimize:

- Geometry
- Textures
- Materials
- Mesh instancing
- Camera animations
- Scene complexity
- Draw calls
- Initial transfer size

Target a compact optimized model, aiming for approximately 2–3 MB if practical.

Track actual transfer size.

## Scroll mechanics

Use GSAP ScrollTrigger to connect scroll progress to the architectural timeline.

Allow normal browser scrolling.

Do not implement full-page wheel trapping.

Do not require GPU rendering to understand the product.

Provide:

- Poster-first loading
- Static image fallback
- Reduced-motion alternative
- Lower-detail mobile variant
- No-WebGL fallback
- Save-Data support

Measure actual performance on representative devices.

---

# 9. PRODUCT FEATURES

Build a polished features page showcasing:

- 2D CAD drawing
- Precision snapping
- Walls, doors and windows
- Floors and roofs
- Structural modeling
- MEP workflows
- IFC workflows
- DWG/PDF workflows
- Smart annotations
- 3D visualization
- Rendering
- AI assistance
- Real-time collaboration, where verified

Use actual SmartBau product evidence.

Inspect code and documentation before writing capability claims.

Clearly distinguish Available, Beta and Planned functionality.

Use real screenshots or faithful product demonstrations.

Avoid fictional UI screenshots and invented statistics.

Feature sections should mix:

- Large screenshots
- Short animated workflows
- Clear product explanations
- Light GSAP effects
- Relevant yellow/blue accents

---

# 10. PRICING AND SUBSCRIPTIONS

Build a premium pricing page.

Include:

- Monthly/yearly switch
- Plan comparison
- Feature limits
- AI credit descriptions
- Pricing FAQ
- Start Free CTA
- Upgrade CTA

Do not invent official prices.

Use a typed draft pricing configuration until final commercial details are supplied.

A single approved pricing source should ultimately drive both the public website and the SmartBau application's entitlement checks.

Because this website lives in a separate repository, define a secure, versioned integration contract rather than copying billing state into the frontend.

Prepare the backend integration for a suitable payment provider.

If a payment provider is configured and approved:

- Secure checkout
- Subscription management
- Verified webhooks
- Idempotent event handling
- Server-side entitlements
- Failed-payment states
- Upgrade/downgrade/cancellation flows

Never enable real charging without approved prices and provider configuration.

---

# 11. ACCOUNTS AND APPLICATION INTEGRATION

The website must link naturally to the existing SmartBau product.

Provide:

- Sign In
- Start Designing
- Account
- Subscription
- Usage/Credits
- Uploaded Models

SmartBau already has authentication in its application.

Investigate the currently supported authentication and API approach.

Do not create a second disconnected identity system.

Where cross-domain identity sharing is needed, define an appropriate secure authentication contract.

Never directly share sensitive browser tokens between unrelated origins.

Do not use a fixed guest account as the identity for protected resources.

Keep the public website independently deployable.

If product API integration is unavailable, implement an honest integration-ready state with clearly documented endpoints, rather than fabricating account information.

---

# 12. SHOWCASE — 3D MODEL GALLERY

Build a real architectural showcase experience.

Users should eventually be able to:

- Explore models
- Search and filter
- Preview thumbnails
- Open a 3D viewer
- Orbit
- Pan
- Zoom
- Reset camera
- Fullscreen
- View public model information
- Share public links
- Embed permitted models

Start with GLB/glTF support.

Do not ship the entire CAD engine just to preview a model.

Use a lightweight independent viewer.

## Upload system

Implement secure uploads only when approved storage/backend services are available.

Use:

- Authenticated ownership
- Signed storage URLs
- File validation
- File size limits
- Upload progress
- Processing state
- Thumbnail generation
- Quotas
- Secure visibility permissions

Uploads must be private by default.

Publishing to the public gallery requires an explicit user choice.

Add moderation and abuse-report handling.

Do not fake uploads or store large models only in ephemeral server memory.

---

# 13. PLUGIN DIRECTORY

Build:

- Plugins listing
- Plugin categories
- Search
- Plugin details
- Developer documentation
- Submission form
- Version and permission descriptions
- Review states

First determine whether SmartBau actually has an installable plugin runtime.

If not, provide a Coming Soon or Waitlist experience.

Do not build a decorative Install button that pretends to install something.

Keep installation security separate from the marketing site.

---

# 14. HELP CENTER AND AI ASSISTANT

Create searchable documentation.

Initial topics:

- Getting started
- Creating projects
- CAD drawings
- Walls and openings
- Floors and roofs
- Structural and MEP modeling
- Import/export
- 2D/3D viewing
- Rendering
- Troubleshooting
- Account and billing questions

Use documentation grounded in SmartBau's actual implementation.

Build an AI help assistant only through approved backend services.

The assistant must:

- Answer from documentation
- Reference sources
- Avoid invented capabilities
- Read approved pricing information
- Respect privacy
- Hand off unsupported requests to support

Enforce cost limits, authentication/rate limits, prompt-injection protections and server-side credential storage.

---

# 15. UPDATES, ROADMAP, NEWSLETTER AND PARTNERS

## Updates

Use data-driven release notes with dates and versions.

## Roadmap

Display:

- Planned
- In Progress
- Shipped

Do not claim planned features are shipped.

## Newsletter

Build a double-opt-in subscription flow with one-click unsubscribe and a searchable/archive view.

Do not claim an email was subscribed if there is no provider configured.

## Partners

Build an elegant logo directory and partner inquiry form.

Only publish approved partner logos and claims.

---

# 16. INTERNATIONALIZATION

Support English and German.

Implement a maintainable localization structure.

Include translated:

- Navigation
- CTAs
- Marketing pages
- Form labels
- Errors
- Help where translated content is available
- Metadata

Configure correct language attributes and hreflang.

Avoid duplicating entire page implementations.

---

# 17. SEO, PERFORMANCE AND ACCESSIBILITY

This website must rank well and load fast.

Implement:

- Static/server rendering
- Metadata per route
- Sitemap
- Robots configuration
- Canonical URLs
- Open Graph images
- Structured data where appropriate
- Language-specific metadata
- Semantic headings
- Optimized media
- Image lazy loading
- Font optimization

Keep large libraries route-specific.

Use independent bundles for:

- Marketing
- 3D Hero
- Showcase Viewer
- Account
- AI Assistant

Do not load Three.js, GSAP ScrollTrigger, or the showcase viewer on pages that don't use them.

GSAP should be loaded only where animation is required.

Respect reduced motion and support browsers without WebGL.

Aim for WCAG 2.2 AA accessibility.

Test keyboard navigation, contrast, forms, focus states and mobile behavior.

---

# 18. SOL → LUNA TASK DELEGATION

Create a task board with clear ownership.

### Luna Agent A — Foundation

Responsible for:

- Project initialization
- Shared layouts
- Design tokens
- Liquid-glass components
- Navigation/footer
- Theme system
- Localization foundation

### Luna Agent B — Homepage and GSAP

Responsible for:

- Hero
- GSAP ScrollTrigger
- Architectural 3D scene
- Camera transitions
- Static fallbacks
- Responsive behavior

### Luna Agent C — Public Pages

Responsible for:

- Features
- Pricing presentation
- Updates
- Roadmap
- Newsletter UI
- Partners
- Legal page structure

### Luna Agent D — Showcase and Plugins

Responsible for:

- Model gallery
- Model detail pages
- Lightweight 3D viewer
- Plugin directory
- Submission UI

### Luna Agent E — Accounts and API Integration

Responsible for:

- Auth integration plan
- Secure account UI
- Validated API contracts
- Backend integration
- Entitlement integration

Sol must personally review security-sensitive and billing-related changes.

### Luna Agent F — QA and Optimization

Responsible for:

- Unit tests
- Browser tests
- Responsive checks
- Accessibility
- Bundle inspection
- Performance measurement
- Regression reports

## Agent execution requirements

Each delegated task must contain:

- Files owned
- Expected result
- Dependencies
- Acceptance criteria
- Tests required

Do not let agents overwrite one another's changes.

Use isolated worktrees or separate task branches where supported.

Sol must inspect every delivered diff.

Incomplete work goes back for correction.

---

# 19. IMPLEMENTATION PHASES

## Phase 1 — Foundation

- Initialize repository.
- Create design system.
- Establish routing and layout.
- Add brand tokens.
- Set up GSAP infrastructure.
- Set up CI and tests.

**Gate:** Site builds, navigation works, theme works, no unneeded CAD dependencies.

## Phase 2 — Homepage

- Build static hero first.
- Add architectural 3D.
- Integrate scroll animation.
- Optimize assets.
- Test fallbacks.

**Gate:** Complete homepage interaction works and normal scrolling is preserved.

## Phase 3 — Public Pages

Implement the Features, Pricing, Updates, Roadmap, Partners, Newsletter and legal page structures.

**Gate:** Routes work, content is accurate, page metadata is correct.

## Phase 4 — Help and AI

- Build docs/help.
- Add search.
- Integrate guarded AI assistance if backend configuration is available.

**Gate:** Answers are documentation-grounded; controls and costs are bounded.

## Phase 5 — Accounts and Subscriptions

- Connect approved identity.
- Implement account UI.
- Add approved billing integration and sandbox tests if credentials/prices are supplied.

**Gate:** Protected data is authorized server-side.

## Phase 6 — Showcase and Plugins

- Build gallery and viewer.
- Add secure uploads if storage/backend is configured.
- Build directory and submission flow.
- Distinguish supported plugin installation from planned functionality.

**Gate:** Model permissions and viewing behavior pass tests.

## Phase 7 — Final Quality

- Review everything.
- Fix visual inconsistencies.
- Optimize bundles.
- Run build/lint/tests.
- Run browser checks.
- Verify SEO and accessibility.
- Prepare preview deployment.

**Gate:** Verified, integrated website with no critical unresolved regressions.

---

# 20. SCREENSHOTS AND VIDEO

Where Codex browser automation supports it, capture:

- Homepage desktop
- Homepage mobile
- Light theme
- Dark theme
- 3D hero at different stages
- Features
- Pricing
- Showcase viewer
- Navigation interactions

Record a short screen demonstration of the 3D scroll experience where supported.

Store only reasonable-size artifacts.

Report exact generated artifact locations.

Do not claim evidence exists if it was not captured.

---

# 21. VERIFICATION

Configure appropriate scripts and run:

```bash
npm run lint
npm run test
npm run build
```

Add browser tests for:

- Navigation
- Responsive menus
- Dark/light theme
- Language switching
- ScrollTrigger lifecycle
- Reduced-motion behavior
- No-WebGL fallback
- Homepage loading
- Pricing configuration
- Account security
- Showcase permissions
- Studio link correctness
- Forms and validation

Inspect actual production bundles.

Run automated checks after each major phase rather than only at the end.

Sol must review failures, repair them and rerun affected checks.

Do not mark work complete based solely on a successful compilation.

---

# 22. FINAL DELIVERABLE

Sol must provide:

1. Website architecture overview.
2. Repository branch and commits.
3. Pages completed.
4. GSAP animation implementation.
5. Liquid-glass system explanation.
6. Confirmation of V-Yellow and V-Blue consistency.
7. 3D asset sources and optimization results.
8. Luna task assignments and verified results.
9. Actual test outcomes.
10. Responsive screenshots.
11. Video reference where available.
12. Preview/deployment details if available.
13. Security and accessibility findings.
14. Backend integrations pending configuration.
15. Remaining limitations and owner decisions.

Do not claim production readiness without functional, security and performance verification.

Do not modify `try-bau/SmartBau`.

---

# FINAL EXECUTION INSTRUCTION

**Sol: Start implementing the SmartBau public website in `try-bau/web-page` now.**

Use the existing SmartBau application exclusively as a visual, architectural and product-reference source.

Build the new website independently.

Make **V-Yellow the primary brand color**, with **V-Blue for engineering/MEP**.

Use **GSAP** for sophisticated transitions and scroll-driven architectural storytelling.

Use **liquid glass** selectively for premium navigation, controls and floating surfaces.

Delegate implementation to Luna agents where supported.

Review and integrate every task.

Finish each phase with measurable verification.

Make the website beautiful, fast, responsive, accessible and maintainable.

**Deliver working software, not just a collection of agent outputs.**