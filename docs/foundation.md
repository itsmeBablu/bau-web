# Shared foundation

## Localization

`src/lib/i18n.ts` exports `Locale` (`'en' | 'de'`), `locales`, `isLocale(value)`, and `getDictionary(locale)`. The locale root layout validates async route params, generates static params for both languages, and sets the server rendered document language. The default `/` route redirects to `/en`; unprefixed public paths redirect to their English routes in `next.config.ts`.

## Shell and glass components

`SiteShell` accepts `{ locale, children }` and renders the skip link, navbar, page content, and footer. The shell exports `GlassNavbar`, `GlassFooter`, `MobileMenu`, `ThemeToggle`, and `LanguageToggle` for reuse when needed.

The reusable surface primitives are exported from `src/components/foundation/SiteShell.tsx`:

- `GlassCard` and `GlassFeatureCard` accept `children` and an optional `className`.
- `GlassPricingCard` accepts `children` and an optional `className`.
- `GlassButton` accepts `children`, an optional internal `href`, `variant` (`primary`, `secondary`, or `quiet`), `onClick`, and `type`.
- `GlassMenu` accepts `children` and an optional `className`.
- `GlassModal` accepts `open`, `onClose`, an accessible `label`, an optional `closeLabel`, and `children`.
- `GlassTooltip` accepts `label`, `children`, and an optional `className`.

Use the shared global classes `.container`, `.eyebrow`, `.section`, `.page-intro`, `.card`, `.button`, `.button-primary`, and `.button-secondary`. Brand and semantic color tokens live in `src/app/globals.css`; dark is the default theme and the theme toggle persists a light/dark choice in local storage when available.

The optional application launch destination comes from `src/lib/config.ts`. `getAppLink(locale)` provides a localized account route when `NEXT_PUBLIC_APP_URL` is not configured.
