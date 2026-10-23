# SmartBau public website

All implementation belongs in this repository. /workspace/SmartBau is read-only reference; never modify it. Work on feat/premium-website. Preserve all work. Plan → implement → verify → save.

Stack: Next.js App Router, TypeScript, CSS semantic tokens, GSAP route-specific motion, isolated lazy Three.js scenes. English/German routes /en and /de; / redirects to /en. No CAD engine dependencies. Core yellow #FACC15, engineering blue #38BDF8.

Agents own disjoint files assigned by lead. Do not commit or modify another agent's files. Lead installs dependencies, integrates, reviews, tests and commits. npm cache must be /workspace/.npm-cache (default home is unwritable). Site runs on port 3100; leave existing CAD servers alone.

Never invent prices, partners, product claims, account data, email subscriptions, uploads or plugin installation. Unconfigured integrations return honest unavailable states. No real charging. No secrets in source or client bundles.

Before handoff update PROGRESS.md. Run npm run lint, npm run test, npm run build and browser checks; distinguish passed/unrun. Store sanitized evidence in docs/verification.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
