# Bilingual SEO Migration Plan

This plan migrates the portfolio from a single English site to real English and Spanish pages that can be indexed independently, serve the visitor's browser language by default, and still let the visitor switch languages manually.

## Target Outcome

| Area | Target |
|------|--------|
| URLs | Real locale-prefixed routes: `/en/...` and `/es/...` |
| Default entry | `/` redirects to the best locale using saved preference first, then browser language |
| SEO | Each page has localized metadata, canonical URL, `hreflang`, and sitemap entries |
| Content | English and Spanish pages are authored as real content, not client-side string swaps |
| UX | Header exposes a language switch that preserves the current equivalent page when possible |
| Rendering | Pages remain server-rendered/static where possible for crawlability and performance |

Current state on `dev` as of 2026-10-08: Slice 1's technical integration is merged through PRs #4-#9. Locale-prefixed routing, legacy redirects, root locale detection, locale-aware navigation, metadata/sitemap plumbing, the `src/content/{en,es}` content model, and the indexability gate are in place. Spanish routes currently serve English fallback copy and remain non-indexable until Slice 2 writes and reviews real Spanish copy.

## Recommended URL Strategy

Use locale-prefixed paths for both languages:

```txt
/en
/en/about
/en/work
/en/work/[slug]
/en/contact
/en/resume
/en/for-agencies

/es
/es/about
/es/work
/es/work/[slug]
/es/contact
/es/resume
/es/for-agencies
```

Keep `/` as a language-aware redirect, not as a canonical content page.

### Existing URL Preservation

The current site already exposes non-prefixed URLs. They must remain reachable after the migration through permanent redirects:

| Existing URL | Permanent Destination |
|--------------|-----------------------|
| `/` | Locale selection redirect; not a permanent SEO redirect |
| `/about` | `/en/about` |
| `/work` | `/en/work` |
| `/contact` | `/en/contact` |
| `/resume` | `/en/resume` |
| `/for-agencies` | `/en/for-agencies` |
| `/work/[slug]` | `/en/work/[slug]` |

- [ ] Add permanent redirects for all existing indexable non-prefixed routes.
- [ ] Preserve query strings and relevant fragments where the platform supports it.
- [ ] Do not redirect old URLs based on the visitor's browser language; use `/en/...` as the stable migration destination.
- [ ] Verify that old URLs do not remain as duplicate indexable pages.
- [ ] Add the redirect behavior to the release checklist and Search Console validation.

## Why This Strategy

| Decision | Reason |
|----------|--------|
| Prefix both languages | Avoids treating English as the hidden/default version and makes canonical logic simpler. |
| Redirect `/` | Lets users land in the right language without creating duplicate root content. |
| Server-render localized pages | Gives Google real HTML per language instead of client-side translated text. |
| Localized MDX/content files | Case studies need SEO-quality Spanish writing, not runtime dictionary substitution. |
| `hreflang` alternates | Tells search engines the English and Spanish URLs are equivalent by language. |

## Migration Phases

### Phase 1: Locale Foundation

Create the routing and locale primitives before translating content.

- [ ] Add a locale config module, for example `src/lib/i18n.ts`.
- [ ] Define supported locales: `en` and `es`.
- [ ] Define default locale fallback: `en`.
- [x] Define locale metadata values: `en_US` and `es_US` (resolved for the site's LatAm/US Spanish audience).
- [ ] Move public app routes under `src/app/[lang]/`.
- [ ] Add `generateStaticParams()` for `en` and `es` at the locale layout level.
- [ ] Set `<html lang={lang}>` from the route param.
- [ ] Keep global providers, analytics, header, footer, and structured data in the locale layout.
- [ ] Keep `[lang]/error.tsx` (runtime error boundary, client-rendered by nature) and `global-error.tsx`.
- [ ] Serve every 404 from the statically prerendered global `src/app/not-found.tsx`, rendered with the full site shell (`<html lang="en">`, header, footer). Set `dynamicParams = false` on `[lang]/layout.tsx` so an unknown locale (`/fr`) is an unmatched route and gets that same static 404.
- [ ] Extract the shared chrome into `src/components/SiteShell.tsx` so the locale layout and the global 404 render the same shell.
- [ ] Do NOT add a `[lang]/[...rest]` catch-all or a `[lang]/not-found.tsx` (see the limitation below).

Route structure:

```txt
src/app/
  layout.tsx          ← pass-through (returns children); exists only so the global 404 has a root layout
  not-found.tsx       ← static global 404, renders <SiteShell lang="en">
  global-error.tsx
  robots.ts
  sitemap.ts
  api/
  [lang]/
    layout.tsx        ← <SiteShell lang={lang}>: <html lang>, <body>, metadata, header, footer; dynamicParams = false
    page.tsx
    error.tsx
    about/page.tsx
    contact/page.tsx
    resume/page.tsx
    for-agencies/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
```

Implementation note — Next 16.2 limitation, verified 2026-09-02: a `notFound()` thrown from a **dynamic** render (a `[...rest]` catch-all, or any non-prerendered route) always aborts the SSR shell. Next then serves `<html id="__next_error__">` with no `lang` and no site chrome, and only the client re-render shows the real not-found UI. Wrapping `{children}` in `<Suspense>` keeps the shell but turns the response into a **200** (soft-404), which is worse for SEO. There is no server-rendered localized 404 in Next 16.2 without hacks. Today's `dev` never hits that path because every 404 is served from the static `_not-found.html`, so the migration keeps that model: one static, English 404 for all locales (no regression), and localized 404 copy is deferred. If a Spanish 404 is ever wanted, the trade-off is a client-rendered 404 (catch-all + `[lang]/not-found.tsx`), not an SSR one.

`/` is handled by a redirect (temporary `permanent: false` rule in `next.config.ts`, replaced by `src/proxy.ts` in Phase 2).

### Phase 2: Root Redirect And Language Preference

Make `/` choose the best language without hurting SEO.

- [ ] Add middleware/proxy logic for locale detection.
- [ ] Run the middleware on the default Node.js runtime. Do not set `runtime = 'edge'`: on Vercel, middleware runs on Fluid Compute with full Node.js support, and the Edge runtime only adds compatibility limits. Older i18n tutorials that hardcode `edge` predate this.
- [ ] If a language preference cookie exists, redirect `/` to that locale.
- [ ] Otherwise parse the `Accept-Language` header.
- [ ] Redirect Spanish browsers to `/es`.
- [ ] Redirect everyone else to `/en`.
- [ ] Exclude static assets, API routes, images, favicon, sitemap, and robots from locale redirects.
- [ ] When the user manually switches language, save a cookie such as `preferred_locale`.
- [ ] Ensure locale-prefixed URLs are always respected and are never overridden by browser detection.
- [ ] Ensure the redirect is not repeated after the user has selected a locale manually.

Priority order:

```txt
manual cookie > browser Accept-Language > default locale
```

Root route rules:

- [ ] `/` contains no standalone indexable content; it only selects and redirects to a locale.
- [ ] Browsers with Spanish as their best supported language go to `/es` when no preference cookie exists.
- [ ] Browsers with English or unsupported languages go to `/en` when no preference cookie exists.
- [ ] Crawlers without a useful `Accept-Language` header fall back to `/en`.
- [ ] A saved manual preference takes precedence over the browser language on future visits to `/`.
- [ ] Direct visits to `/en/...` or `/es/...` never redirect to another locale because of the browser language.
- [ ] Confirm in Google Search Console that localized pages, not `/`, are the indexable canonical content URLs.

### Phase 3: Locale-Aware Links And Navigation

Prevent users from accidentally leaving the selected language.

- [x] `localizedPath(lang, path)` and `swapLocaleInPath(pathname, target)` added to `src/lib/i18n.ts`. Both no-op on `#...`, `http(s)://`, `mailto:`, `tel:`; never double-prefix; pass query/hash through; `swapLocaleInPath` handles `/` and the static-404 `/_not-found` pathname without producing `/es/undefined`.
- [x] `SiteHeader`, `SiteFooter`, project cards, resume, home/landing sections all route internal links through the helpers — `rg` for unlocalized `href="/"` across `src/**/*.{ts,tsx,mdx}` returns zero offenders.
- [x] `LanguageSwitch` in the header swaps the locale segment of the current path (not a fixed destination), so it preserves the equivalent page. It writes `preferred_locale` client-side (`Secure`, `SameSite=Lax`, `Path=/`, `Max-Age=31536000`) from a compile-time `Locale` value only — never a raw/user-controlled string. Fixed after review: mobile switch now closes the menu on navigate (`onNavigate` prop); wrapper is a `<nav aria-label="Language">` landmark, not an unlabeled `<div>`.
- [x] External links, `mailto:`, resume PDF, `#main-content` unchanged.
- [x] GA `language_switch` event added (`from_locale`/`to_locale`) via the existing `data-tracking` delegated-listener convention.

Known deferred item (not a bug): `src/app/not-found.tsx` is the static global 404 and always renders `<SiteShell lang="en">` (see Phase 1's Next 16.2 limitation). On a 404 reached from an `/es/...` URL, the switch shows "English" as current even though the visitor was on a Spanish path. Low impact — revisit only if localized 404s become possible.

Examples:

| Current URL | Switch To Spanish | Switch To English |
|-------------|-------------------|-------------------|
| `/en` | `/es` | `/en` |
| `/en/about` | `/es/about` | `/en/about` |
| `/en/work/brand-website-build` | `/es/work/brand-website-build` | `/en/work/brand-website-build` |

If a translated case study does not exist yet, either hide that case study in the missing locale or redirect the switch to the localized `/work` index. Do not send users to a 404 from the language switch.

Result: 4 commits on `feat/i18n-3-locale-links-switch` (helpers → links → switch → post-review fix), 20 files, +264/−49. `pnpm run verify` green. Fresh review found two should-fix items (mobile menu not closing on switch, unlabeled wrapper `<div>`); both fixed and reverified.

### Security And Privacy Considerations

The locale migration must not weaken the existing security posture. Locale detection is request routing, not an authorization boundary, and every value involved in it must be constrained explicitly.

#### Locale Validation And Redirect Safety

- [ ] Accept only the supported locales: `en` and `es`.
- [ ] Validate the locale before using it in route generation, content loading, filesystem paths, metadata, or cookies.
- [ ] Reject or safely fall back from malformed locale values rather than passing them through.
- [ ] Generate redirects only from internal, allowlisted routes.
- [ ] Never use a query parameter, cookie, or request header as an arbitrary redirect destination.
- [ ] Confirm there is no open-redirect behavior in the root language redirect or language switch.
- [ ] Keep locale validation separate from content authorization; a valid locale must not grant access to drafts or unpublished content.

#### Cookie And Privacy Handling

- [ ] Store only the supported locale in `preferred_locale`; never store the full `Accept-Language` header.
- [ ] Set the preference cookie with `Secure`, `SameSite=Lax`, and `Path=/` in production.
- [ ] Define an expiration or `Max-Age` appropriate for a language preference.
- [ ] Do not put personal data or authentication state in the locale cookie.
- [ ] Document whether the functional preference cookie requires consent under the privacy laws relevant to the site's audience.
- [ ] Keep analytics consent and tracking cookies separate from the language preference cookie.

#### Cache And Request Variation

Because the root redirect can depend on both cookies and `Accept-Language`, CDN behavior must be verified:

- [ ] Confirm a redirect selected for one visitor cannot be served to another visitor with a different language preference.
- [ ] Test behavior with and without `preferred_locale`.
- [ ] Test behavior with English, Spanish, unsupported, and missing `Accept-Language` headers.
- [ ] Configure the appropriate cache policy or request variation for the root redirect, using `Vary: Accept-Language, Cookie` or a no-cache/private policy where required by the deployment platform.
- [ ] Confirm locale-prefixed pages remain safely cacheable as independent static URLs.

#### Contact Form And Input Security

The localized form must preserve the current server-side protections:

- [ ] Keep rate limiting, server-side honeypot checks, input length limits, control-character checks, and strict enum validation.
- [ ] Send the active locale only as validated metadata; do not trust client-provided locale for authorization or routing.
- [ ] Keep internal form values stable while localizing display labels.
- [ ] Localize user-facing errors without exposing API keys, stack traces, provider responses, or other internal details.
- [ ] Review CSRF protection before production. The project security standard calls for CSRF tokens on forms; the current contact endpoint has a honeypot and rate limiting but no explicit CSRF token.
- [ ] Confirm that localized labels cannot inject content into email subjects, headers, or message bodies.

#### Secrets, Headers, And Regression Checks

- [ ] Keep Resend credentials and all server-only environment variables inaccessible to client bundles.
- [ ] Confirm the locale switch does not require weakening the existing CSP.
- [ ] Re-test CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` after adding middleware/proxy logic.
- [ ] Confirm middleware/proxy exclusions do not accidentally expose `/api/`, private files, drafts, or development routes.

#### Redirect Limitations

Query strings can be preserved by server redirects where supported. URL fragments such as `#section` are client-side and are not sent to the server, so they cannot be preserved by an HTTP redirect. If fragment preservation is required, it must be handled by client-side navigation.

### Phase 4: Content Model

Separate translatable content from stable project metadata.

Current content locations:

| Content | Current Location | Migration Need |
|---------|------------------|----------------|
| Homepage | `src/content/home.ts` | Split by locale or export keyed content. |
| For agencies page | `src/content/for-agencies.ts` | Split by locale or export keyed content. |
| Static pages | `src/app/about/page.tsx`, `contact`, `resume` | Move copy into locale-aware content modules. |
| Case studies | `src/content/{en,es}/case-studies/*.mdx` | Add per-locale MDX content. |
| Form options | `src/lib/contact-form-options.ts` | Separate stored values from localized labels. |
| Header/footer labels | Components | Read labels from locale content. |

Recommended content shape:

```txt
src/content/
  en/
    home.ts
    for-agencies.ts
    static-pages.ts
    case-studies/*.mdx
  es/
    home.ts
    for-agencies.ts
    static-pages.ts
    case-studies/*.mdx
```

Alternative content shape:

```txt
src/content/
  home.ts
  for-agencies.ts
  static-pages.ts
  case-studies/
    en/*.mdx
    es/*.mdx
```

Recommendation: use `src/content/en` and `src/content/es` because it keeps all localized authoring together and makes missing translations easier to audit.

### Phase 5: Case Study Localization

Make each case study a real localized page.

- [ ] Update the project loader to accept `lang`.
- [ ] Read MDX from `src/content/{lang}/case-studies`.
- [ ] Keep slug stable across languages when the project is the same.
- [ ] Validate each locale with the same strict frontmatter schema.
- [ ] Add locale-specific `seoTitle` and `seoDescription`.
- [ ] Add Spanish MDX body content written for Spanish search intent.
- [ ] Update `generateStaticParams()` to generate `{ lang, slug }` pairs only for published projects in each locale.
- [ ] Keep `dynamicParams = false` so unknown localized slugs 404 cleanly.

Stable slugs are recommended:

```txt
/en/work/brand-website-build
/es/work/brand-website-build
```

Translated slugs are possible, but they add complexity because the app needs a slug mapping layer:

```txt
/en/work/brand-website-build
/es/work/desarrollo-marca-sitio-web
```

Recommendation: start with stable slugs. Translate titles, headings, metadata, and body content first. Consider translated slugs later only if there is clear SEO value.

### Phase 6: Metadata, Canonicals, And Hreflang

Update the metadata helper so every localized page emits correct SEO signals.

- [x] `buildPageMetadata()` and the new `buildLocaleMetadataFields(lang, path)` accept `lang`. All six static pages plus `work/[slug]` and the home page (`[lang]/page.tsx`) call it via `generateMetadata`.
- [x] Canonical URLs are locale-prefixed everywhere, home page included (`/en`, `/es`), never the bare site URL.
- [x] `alternates.languages` includes one entry per locale in `INDEXABLE_LOCALES` (currently `en` only) — a non-indexable locale's page still declares the indexable alternate, never a self-referencing `hreflang` for content that isn't real yet.
- [ ] `x-default` alternate: intentionally deferred, not added. It only makes sense once 2+ locales are indexable (see the `x-default` rule below) — revisit when PR 5 flips `es` into `INDEXABLE_LOCALES`.
- [x] `openGraph.locale`: `en_US` for `en`, `es_US` for `es` (plan left `es_ES`/`es_US` open; chose `es_US` — this site's realistic Spanish-speaking audience is LatAm/US clients, not Spain).
- [x] `openGraph.alternateLocale` set from the other indexable locales.
- [x] Page titles/descriptions/OG title flow through the same helper for every page including home; verified no duplicate "Jose Leon | Jose Leon" title on `/` (home's title is already fully branded, so it's excluded from the `%s | Jose Leon` template).
- [x] Spanish pages self-canonicalize (`/es/about` → `/es/about`), never to English.

Expected metadata pattern:

```ts
alternates: {
  canonical: 'https://noelsajor.com/es/about',
  languages: {
    en: 'https://noelsajor.com/en/about',
    es: 'https://noelsajor.com/es/about',
    'x-default': 'https://noelsajor.com/en/about'
  }
}
```

Canonical rule:

| Page | Canonical |
|------|-----------|
| `/en/about` | `/en/about` |
| `/es/about` | `/es/about` |
| `/` | No indexed content; redirect only |

`x-default` rule:

- [ ] Every page with both language versions exposes `en`, `es`, and `x-default` alternates — deferred with the `x-default` item above, both locales aren't indexable yet.
- [x] Currently only one language version is indexable (`en`): only that alternate is published, and non-indexable `/es/*` never gets an `hreflang` URL that would read as duplicate/thin content.

### Phase 7: Sitemap And Robots

Make search engines discover both language versions.

- [x] `src/app/sitemap.ts` emits static routes and published case studies for locales in `INDEXABLE_LOCALES` only (13 `<loc>` entries today, all `/en/*`). Flips to include `/es/*` automatically once PR 5 adds `es` to `INDEXABLE_LOCALES`.
- [x] `lastModified` logic untouched — still only set when the source has a real `updatedAt`.
- [x] `/` excluded from the sitemap (redirect-only, confirmed no `<loc>` entry for it).
- [x] `robots.ts` untouched — its only path is a generic `allow: '/'`, nothing unprefixed to fix.
- [x] `/api/` still blocked.

Expected sitemap coverage:

```txt
/en
/en/about
/en/work
/en/contact
/en/resume
/en/for-agencies
/en/work/[slug]
/es
/es/about
/es/work
/es/contact
/es/resume
/es/for-agencies
/es/work/[slug]
```

### Phase 8: Structured Data

Localize JSON-LD where it contains page-visible language-specific text.

- [x] `StructuredData` accepts `lang`, threaded from `SiteShell`. Text stays English for both locales for now (no real Spanish source string exists yet) — the prop plumbing is correct so PR 5 only has to swap in real copy.
- [ ] Localize `WebSite.description` and `Person.jobTitle` with real Spanish text (PR 5).
- [ ] Add Article/CreativeWork schema for case studies if the project wants stronger GAIO/SEO coverage (optional, not scheduled).
- [ ] Add FAQ schema for pages that render a real FAQ section with enough questions (optional, not scheduled).

Do not invent profiles, credentials, locations, or business entities just to fill schema fields.

### Phase 9: Spanish SEO Content Work

Translate by intent, not word-for-word.

- [ ] Define Spanish positioning keywords before translating pages.
- [ ] Rewrite homepage hero and service sections naturally in Spanish.
- [ ] Rewrite case-study summaries around Spanish search behavior.
- [ ] Translate CTA labels, navigation, form labels, validation messages, and success/error states.
- [ ] Keep technical terms in English where Spanish users actually search that way, for example `Shopify`, `frontend`, `UI/UX`, and `ecommerce`.
- [ ] Avoid keyword stuffing.

#### Translation Publication Gate

A Spanish URL is publishable only when its content is complete and editorially reviewed. The migration must not expose a Spanish page that is only partially translated or still contains English content by accident.

- [ ] The page has a complete Spanish title, description, headings, body copy, CTA labels, and accessibility text.
- [ ] Internal links point to Spanish equivalents where those equivalents exist.
- [ ] Metadata, canonical, `hreflang`, Open Graph, and structured data are correct for the Spanish URL.
- [ ] Forms, validation states, empty states, success messages, and error messages are localized.
- [ ] The page has passed Spanish editorial review for natural phrasing and search intent.
- [ ] The page has passed rendered-source inspection to confirm Spanish HTML is server-rendered.
- [ ] The page is included in `/es` navigation and the Spanish sitemap only after all checks pass.

For case studies specifically:

- [ ] Spanish frontmatter passes the strict schema.
- [ ] Spanish `seoTitle` and `seoDescription` are authored independently where search intent differs.
- [ ] The MDX body, image alt text, gallery labels, and project facts are complete.
- [ ] Untranslated case studies are omitted from `/es/work` and from Spanish `generateStaticParams()` until ready.

Likely Spanish keyword targets:

| Topic | Spanish Search Intent |
|-------|-----------------------|
| Shopify | desarrollador Shopify freelance, desarrollo Shopify, tiendas Shopify personalizadas |
| UI/UX | diseñador UI UX, diseño de interfaces, diseño de experiencia de usuario |
| Front-end | desarrollador frontend, implementación frontend, desarrollo web frontend |
| Agencies | soporte white-label para agencias, apoyo frontend para agencias, producción web para agencias |
| Ecommerce | desarrollo ecommerce, optimización ecommerce, tiendas online |

### Phase 10: Contact Form Localization

The contact form needs special care because labels are user-facing but submitted values may be operational.

- [ ] Keep stable internal values for `supportType` and `timeline` if emails or analytics depend on them.
- [ ] Display localized labels in the UI.
- [ ] Send the active locale with the contact form submission.
- [ ] Localize form errors and success messages.
- [ ] Decide whether received emails should preserve English internal labels or show the visitor's Spanish labels.
- [ ] Update server validation if option values change.

Recommended approach: keep internal enum values stable and add localized display labels.

### Phase 11: Analytics

Preserve measurement while making language behavior visible.

- [ ] Include locale in page view tracking if GA does not infer it clearly from path.
- [ ] Track language-switch clicks.
- [ ] Track contact form submissions with the active locale.
- [ ] Keep existing tracking event names stable unless there is a reporting reason to change them.

Useful events/properties:

| Event | Useful Properties |
|-------|-------------------|
| `language_switch` | `from_locale`, `to_locale`, `path` |
| `contact_form_submit_success` | `locale` |
| page view | locale is inferable from path, but explicit locale can help reporting |

### Phase 12: Verification

Run automated and manual checks before shipping.

Automated checks:

- [ ] `pnpm run lint`
- [ ] `pnpm run typecheck`
- [ ] `pnpm run validate:content`
- [ ] `pnpm run build`

Manual browser checks:

- [ ] `/` redirects to `/es` when browser language is Spanish and no cookie exists.
- [ ] `/` redirects to `/en` when browser language is English and no cookie exists.
- [ ] Existing non-prefixed URLs permanently redirect to their English equivalents.
- [ ] Manual language switch saves preference.
- [ ] Manual preference wins over browser language.
- [ ] Header links stay in the current locale.
- [ ] Case-study links stay in the current locale.
- [ ] Missing translations do not produce broken language-switch links.
- [ ] `html lang` changes between `en` and `es`.
- [ ] An unknown URL under `/es/...` (and `/fr`, `/nope`) returns 404 with the static global 404 page: `<html lang="en">`, header and footer present, no `__next_error__` shell. (Localized 404 copy is deferred — Next 16.2 limitation, see Phase 1.)
- [ ] A runtime error inside `/es/...` renders the `[lang]` error boundary.
- [ ] Canonical URLs point to the current localized page.
- [ ] `hreflang` links point to equivalent pages.
- [ ] `hreflang` includes a valid `x-default` fallback where both language versions exist.
- [ ] Sitemap includes both locale sets.

SEO inspection checks:

- [ ] View rendered source for `/en` and `/es` to confirm localized HTML is server-rendered.
- [ ] Inspect metadata for static pages.
- [ ] Inspect metadata for case-study pages.
- [ ] Confirm Spanish pages do not canonicalize to English.
- [ ] Confirm English and Spanish pages are both indexable.
- [ ] Confirm old non-prefixed URLs redirect and are not indexed as duplicate pages.
- [ ] Confirm `/` is redirect-only and is not used as the canonical for either language.
- [ ] Confirm only `en` and `es` are accepted as locale values.
- [ ] Confirm root redirects cannot be influenced into an external destination.
- [ ] Confirm the CDN does not cache one visitor's language redirect for another visitor.
- [ ] Confirm the contact form retains all existing server-side protections and CSRF status is documented.

## Suggested Implementation Order

1. Add locale config and helper functions.
2. Move app routes into `[lang]` without changing visible copy yet.
3. Add root redirect and locale-aware layout.
4. Update internal links to preserve locale.
5. Add language switcher.
6. Localize static content modules.
7. Localize metadata helper and structured data.
8. Refactor case-study loader for localized MDX.
9. Add Spanish case-study content incrementally.
10. Update sitemap.
11. Verify build, content validation, and rendered SEO tags.

## Release Strategy

Ship in two safe slices if possible.

| Slice | Scope | Reason |
|-------|-------|--------|
| Slice 1 | Routing, old-URL redirects, root language selection, language switch, localized static pages | Establishes architecture, protects existing SEO URLs, and lets the site work bilingually without touching every case study at once. |
| Slice 2 | Localized case studies, sitemap alternates, deeper SEO polish | Lets Spanish long-form content get proper editorial attention. |

If all Spanish case studies are not ready, publish only the translated ones in `/es/work` and keep untranslated ones out of the Spanish project list until they are ready.

## Main Risks

| Risk | Mitigation |
|------|------------|
| Duplicate-content signals | Use correct canonical per locale and `hreflang` alternates. |
| Poor Spanish SEO quality | Rewrite for Spanish search intent instead of literal translation. |
| Broken localized links | Centralize URL generation in helper functions. |
| Missing case-study translations | Generate static params only for published localized files. |
| Form option drift | Keep stable internal enum values and separate localized labels. |
| Accidental dynamic rendering | Keep locale selection in routing/middleware and avoid client-only content swaps. |
| Open redirects or unsafe locale values | Allowlist locales and generate destinations only from internal route helpers. |
| Incorrect CDN language cache | Vary or disable caching for the preference-dependent root redirect. |
| Weakened form security | Preserve server-side validation/rate limiting and review CSRF protection separately. |
| Privacy regression | Keep language preference separate from analytics/tracking consent and personal data. |

## Definition Of Done

- [ ] `/` redirects to the correct locale based on cookie/browser/default fallback.
- [ ] Existing non-prefixed URLs permanently redirect to their English locale-prefixed equivalents.
- [ ] `/en` and `/es` render real localized HTML.
- [ ] Every public route has a localized equivalent or an intentional fallback behavior.
- [ ] Header, footer, CTAs, cards, forms, and metadata are localized.
- [ ] Case-study pages are generated from locale-aware MDX files.
- [ ] Canonical and `hreflang` tags are correct for all indexed pages.
- [ ] `hreflang` contains a valid `x-default` fallback where applicable.
- [ ] Sitemap includes English and Spanish pages.
- [ ] `/` is redirect-only and excluded from the content sitemap.
- [ ] `pnpm run verify` passes.
- [ ] Spanish copy has been reviewed for natural search intent, not just translation accuracy.

---

## Implementation Progress

This section is the resume point. If a working session is lost, start here: read the PR table, confirm `dev` contains the latest merged PR, run `git log --oneline -5` and `pnpm run verify`, then continue with Slice 2 Spanish copy work.

Current state: PRs #4-#9 are merged to `dev`; `main` is intentionally unchanged. Slice 1 technical integration is complete, and Slice 2 Spanish copy has not started.

### Slice 2 — Spanish copy: execution plan

This is the resume point for Slice 2. Phase 9 and Phase 10 above remain the detailed spec; this section is the execution order, one PR per row, cut from `dev` and merged back into `dev` with merge commits. Nothing goes to `main` until the activation PR is merged and the user asks for a production release.

Reviewed 2026-10-08 against `dev` at `03ec478`. The inventory below corrects the first draft in four places: page metadata (`title`/`description`) is hardcoded in each `page.tsx`, not in the content modules; the contact API returns English error strings; `scripts/validate-content.ts` (lines ~259-270) asserts that `es` has no case studies and will fail on the first Spanish MDX; and `public/resume.pdf` / `public/og-image.png` are English-only assets that need a decision.

Audience: `es_US`. Translate for search intent and natural phrasing, not word-for-word. Preserve slugs, URLs, tracking IDs, frontmatter schema, anonymization, factual claims, metrics, roles and seniority. Never invent or soften a claim.

#### Slice 2 PR table

| PR | Branch | Scope | Status |
|----|--------|-------|--------|
| 10 | `docs/i18n-es-style-guide` | `docs/es-style-guide.md`: tone (`tú` profesional unless decided otherwise), terms kept in English vs translated, brand/product names, number and date formats, CTA verb conventions. Approved by the user before any copy PR starts. | `pending` |
| 11 | `feat/i18n-6-es-chrome` | Last structural PR. (a) `src/content/es/ui.ts` real copy. (b) The four raw-JSX paragraphs in `src/app/[lang]/contact/page.tsx` and `src/app/[lang]/resume/page.tsx` moved into the UI dictionary. (c) `src/components/ContactForm.tsx` labels, placeholders, submit/success/error states moved into a per-locale dictionary. (d) `src/app/api/contact/route.ts` returns a stable `code` alongside `error`; the client maps `code` to localized text. (e) Move the hardcoded `generateMetadata` `title`/`description` of `about`, `contact`, `for-agencies`, `resume` and `work` into the locale content modules (English unchanged, `es` falls back). (f) Replace the fallback assertion in `scripts/validate-content.ts` with a parity check: every `es` MDX slug must exist in `en`, same frontmatter schema, `es` files optional. | `in-review` ([PR #11](https://github.com/noelsajor/portfolio-v1/pull/11)) |
| 12 | `feat/i18n-7-es-home` | `src/content/es/home.ts` real copy plus home metadata. Position around Shopify, ecommerce, front-end and remote collaboration for the `es_US` market (see Phase 9 keyword table). | `in-review` ([PR #12](https://github.com/noelsajor/portfolio-v1/pull/12)) |
| 13 | `feat/i18n-8-es-for-agencies` | `src/content/es/for-agencies.ts` real copy plus metadata. Highest commercial intent page: white-label, production capacity, confidentiality, Shopify, UI/UX. | `in-review` ([PR #13](https://github.com/noelsajor/portfolio-v1/pull/13)) |
| 14 | `feat/i18n-9-es-static-pages` | `src/content/es/static-pages.ts` real copy plus metadata for About, Contact, Resume and Work index. Resolve the resume PDF decision (see open decisions) in this PR. | `in-review` ([PR #14](https://github.com/noelsajor/portfolio-v1/pull/14)) |
| 15 | `feat/i18n-10-es-cs-d2c-intimacy` | `src/content/es/case-studies/d2c-intimacy-wellness-storefront.mdx` | `in-review` ([PR #15](https://github.com/noelsajor/portfolio-v1/pull/15)) |
| 16 | `feat/i18n-11-es-cs-strike-hemp` | `src/content/es/case-studies/strike-hemp-cannabis-storefront.mdx` | `in-review` ([PR #16](https://github.com/noelsajor/portfolio-v1/pull/16)) |
| 17 | `feat/i18n-12-es-cs-sana-wellness` | `src/content/es/case-studies/sana-wellness-storefront.mdx` | `in-review` ([PR #17](https://github.com/noelsajor/portfolio-v1/pull/17)) |
| 18 | `feat/i18n-13-es-cs-vita-organica` | `src/content/es/case-studies/vita-organica-supplement-manufacturer-site.mdx` | `in-review` ([PR #18](https://github.com/noelsajor/portfolio-v1/pull/18)) |
| 19 | `feat/i18n-14-es-cs-brand-website` | `src/content/es/case-studies/brand-website-build.mdx` | `in-review` ([PR #19](https://github.com/noelsajor/portfolio-v1/pull/19)) |
| 20 | `feat/i18n-15-es-cs-firstline` | `src/content/es/case-studies/firstline-wholesale-access-control.mdx` | `in-review` ([PR #20](https://github.com/noelsajor/portfolio-v1/pull/20)) |
| 21 | `feat/i18n-16-es-cs-alberto-olivero` | `src/content/es/case-studies/alberto-olivero-portfolio-build.mdx` | `in-review` ([PR #21](https://github.com/noelsajor/portfolio-v1/pull/21)) |
| 22 | `feat/i18n-17-es-activation` | `INDEXABLE_LOCALES = ['en', 'es']` in `src/lib/i18n.ts`. Nothing else in this PR. | `in-review` ([PR #22](https://github.com/noelsajor/portfolio-v1/pull/22), draft until PRs 10-21 are approved) |

Status values: `pending` -> `in-progress` -> `in-review` (open PR, awaiting editorial sign-off) -> `merged-to-dev`.

Scope found during PR 11 (beyond the first inventory): the case-study page labels (`Back to work`, `The Problem`, `The Solution`, `Timeline`, `My Role`, `Gallery`, the four question chips), the `/work` index heading/intro/empty state, `View case study`, `Visit live site`, the sr-only `(opens in a new tab)`, the skip link, nav/footer/language-switch aria-labels, `Selected proof` on For Agencies, and the project enum display labels (`type`, `capabilities`) shown on cards and chips. All moved into `uiContent` / `project-labels.ts`. The question chips now follow the locale of the MDX actually rendered (`CaseStudy.contentLocale`), so `/es` pages that still fall back to English content keep working anchors.

Why this order: PR 11 removes every remaining hardcoded English string and every structural blocker first, so PRs 12-21 are copy-only and can be reviewed by a non-developer. Chrome (nav, footer, form, errors) is what every `/es` page shares, so it goes before any page. `for-agencies` goes before the static pages because it carries the clearest commercial search intent. Case studies ship one per PR because the project loader falls back per file, so each one can land independently, and a seven-MDX PR would not get a real editorial read. Case-study order is a suggestion (Shopify storefronts first); reorder by commercial priority if needed. `_template.mdx` stays English-only and unpublished.

#### Per-PR checklist (PRs 11-21)

- [ ] `docs/es-style-guide.md` followed; new terminology decisions added to the guide in the same PR.
- [ ] `pnpm run verify` green.
- [ ] `/en` routes render byte-identical copy to before the PR (English is never touched by a copy PR).
- [ ] Affected `/es` routes checked in the browser: desktop and mobile nav, CTAs, forms, 404.
- [ ] Rendered-source check: `curl` of the affected `/es` route shows Spanish copy server-rendered, no English leftovers (grep for a handful of English phrases from the `en` source).
- [ ] Case-study PRs only: frontmatter passes the strict schema, `seoTitle` and `seoDescription` authored for Spanish search intent (not translated), image alt text and gallery labels translated, slug unchanged, metrics and anonymization identical to `en`.
- [ ] Editorial sign-off by the user (native Spanish speaker) recorded in the PR description before merge.

#### Activation PR (22) checklist

Run 2026-10-08 against a local production build of the PR 22 branch (`pnpm run build && pnpm start`). Items marked [x] passed there; the two post-deploy items stay open.

- [ ] All of PRs 11-21 are `merged-to-dev` (gate for merging PR 22 itself).
- [x] `/sitemap.xml` lists `/es` URLs; every entry carries `xhtml:link` alternates for `en`, `es` and `x-default` (-> `/en`). 26 URLs, 78 alternate links.
- [x] `<meta name="robots">` on `/es/*` is `index, follow`; `robots.txt` unchanged (`Allow: /`, `Disallow: /api/`).
- [x] Page `<head>` on both locales emits `hreflang` for `en`, `es` and `x-default`; canonical stays self-referential per locale.
- [x] `<html lang="es">` on every `/es` route. Known, accepted gap: a missing `/es/work/<slug>` returns the global 404 shell with `lang="en"` (Next 16.2 limitation recorded in PR 1).
- [x] Language switch renders on `/en` (`Switch to Spanish`) and `/es` (`Cambiar a inglés`).
- [x] `/` -> 307 `/es` for `Accept-Language: es-MX` and for `preferred_locale=es`; `/` -> `/en` for `en-US` and for unsupported languages (`fr-FR`).
- [x] `og:locale` is `es_US` on `/es` with `og:locale:alternate` `en_US`, and the reverse on `/en`.
- [x] JSON-LD on `/es`: `Person.jobTitle` and `WebSite.description` in Spanish (read from the content modules since PR 11).
- [x] Legacy URL `/work/<slug>` -> 308 `/en/work/<slug>` still works.
- [ ] Post-deploy (after `dev` -> `main`): request indexing for `/es` in Google Search Console; confirm the property covers the whole domain, not only the English prefix.

#### Slice 2 open decisions

- [x] `tú` vs `usted`. Decided 2026-10-08: `tú` profesional (docs/es-style-guide.md section 1).
- [x] `public/resume.pdf` is English-only. Decided 2026-10-08: `public/resume-es.pdf` added in PR 14 (same one-page layout, content translated, metrics and employer names identical); `/es/resume` links to it via `uiContent.resumePage.pdfHref`.
- [ ] `public/og-image.png` is a single English asset. Acceptable for `es_US` launch; revisit after activation if social shares in Spanish matter.
- [ ] Contact emails sent via Resend: keep internal English labels (`Support type`, `Timeline`) since they are operational, but include the visitor's locale in the email body. Close in PR 11.
- [x] Case-study order (PRs 15-21) confirmed 2026-10-08 as listed.

### Delivery strategy

- Scope of this pass: **Slice 1 only** — the technical foundation. Spanish routes exist and work, but serve English fallback copy and are `noindex` until real Spanish content lands (Slice 2, tracked separately).
- PRs #4-#8 shipped the original Slice 1 chain. PR #9 added the indexability gate so locale discovery and SEO outputs stay limited to locales with reviewed, indexable content.
- Branch naming: `feat/i18n-<N>-<short-name>`. Base branch: `dev`. Each branch is cut from the previous PR's branch (they depend on each other); after PR N merges into `dev`, PR N+1 is rebased onto `dev`.
- Commits follow Conventional Commits, one work unit per commit, no attribution trailers.
- No test runner exists in this project; verification is `pnpm run verify` (lint, typecheck, build, content validation) plus the manual browser checks listed per PR.

### PR table

| PR | Branch | Scope | Status |
|----|--------|-------|--------|
| [#4](https://github.com/noelsajor/portfolio-v1/pull/4) | `feat/i18n-1-lang-routes` | Locale config, move public routes under `[lang]`, root `/` -> `/en` fallback, legacy permanent redirects, localized error surfaces | `merged-to-dev` on 2026-10-08 via `3e09101` |
| [#5](https://github.com/noelsajor/portfolio-v1/pull/5) | `feat/i18n-2-root-locale-redirect` | Proxy: `/` picks locale from cookie -> `Accept-Language` -> `en`; Node runtime; exclusions | `merged-to-dev` on 2026-10-08 via `43fd3fe` |
| [#6](https://github.com/noelsajor/portfolio-v1/pull/6) | `feat/i18n-3-locale-links-switch` | `localizedPath()` helper, header/footer/card/resume links keep locale, language switch component that sets `preferred_locale` | `merged-to-dev` on 2026-10-08 via `e6e70f6` |
| [#7](https://github.com/noelsajor/portfolio-v1/pull/7) | `feat/i18n-4-locale-metadata-sitemap` | `buildPageMetadata(lang)`, canonical + `hreflang`, OG locale, `StructuredData(lang)`, sitemap for indexable locales, `noindex` for locales without real content | `merged-to-dev` on 2026-10-08 via `79847d4` |
| [#8](https://github.com/noelsajor/portfolio-v1/pull/8) | `feat/i18n-5-locale-content-model` | `src/content/{en,es}` with `es` -> `en` fallback, project loader takes `lang`, contact form labels split from values, UI label dictionary | `merged-to-dev` on 2026-10-08 via `bd5e429` |
| [#9](https://github.com/noelsajor/portfolio-v1/pull/9) | `fix/i18n-indexable-locale-gate` | Gates static params, sitemap and metadata discovery behind `INDEXABLE_LOCALES`, keeping `/es` out of indexable discovery until Spanish copy is real | `merged-to-dev` on 2026-10-08 via `49a8a2b` |

Current status for PRs #4-#9 is `merged-to-dev`; earlier intermediate branch states are no longer actionable.

Pushed 2026-09-02 at the user's explicit request, as 5 stacked PRs. Merged 2026-10-08 oldest first (#4 -> #5 -> #6 -> #7 -> #8) into `dev` with merge commits; PR #9 was then merged into `dev` as the indexability safety gate.

### PR 1 — Locale foundation

Start state: all routes live at `src/app/<route>`; no locale concept exists.

- [x] `src/lib/i18n.ts`: `LOCALES = ['en', 'es']`, `DEFAULT_LOCALE = 'en'`, `type Locale`, `isLocale()` guard.
- [x] Move `page.tsx`, `about/`, `contact/`, `resume/`, `for-agencies/`, `work/`, `work/[slug]/` under `src/app/[lang]/`.
- [x] `src/app/[lang]/layout.tsx` renders `<html lang={lang}>` + `<body>`, holds providers/header/footer/analytics/structured data, exports `generateStaticParams()` for both locales, and calls `notFound()` for an unsupported `lang`.
- [x] `src/app/layout.tsx` is a pass-through root layout; `src/app/not-found.tsx` is the static global 404 rendered with `<SiteShell lang="en">`. First attempt used a `[lang]/[...rest]` catch-all + `[lang]/not-found.tsx` for localized 404s — reverted after the fresh review reproduced `<html id="__next_error__">` (no `lang`, no header) on every dynamic 404; see the Next 16.2 limitation note in Phase 1.
- [x] `/` → `/en` handled by a non-permanent redirect in `next.config.ts` until PR 2 adds smart detection in `src/proxy.ts`.
- [x] `[lang]/layout.tsx` has `dynamicParams = false`; unknown locales are unmatched routes and get the static global 404. No `rewrites()` needed.
- [x] `src/components/SiteShell.tsx` shared by the locale layout and the global 404. `src/app/[lang]/error.tsx` kept.
- [x] `next.config.ts` `redirects()`: permanent redirects `/about`, `/work`, `/contact`, `/resume`, `/for-agencies`, `/work/:slug` → `/en/...`.
- [x] `work/[slug]` keeps `dynamicParams = false`. Its `generateStaticParams()` still returns `{ slug }` only — Next multiplies child params by the parent `[lang]` params, producing 7 projects × 2 locales = 14 prerendered pages. No manual pairing needed.
- [x] Build output shows the locale pages as static (`●`), not dynamic (`ƒ`). Only `[lang]/[...rest]` is dynamic, by design.

Finished state: `/en/*` and `/es/*` render the current English site; every legacy URL 301s to `/en/*`; `/` lands on `/en`.

Manual checks (verified with `next start` + curl on 2026-09-02): `/about` → 308 → `/en/about`; `/work/brand-website-build` → 308; `/` → 307 → `/en`; `/es/about` → 200 with `<html lang="es">`; `/es/does-not-exist` → 404.

Result: 4 code commits on `feat/i18n-1-lang-routes` (locale config → move routes → redirects → document shell + static 404), 14 files, +227/−122. `pnpm run verify` green. Fresh-context review found the 404 regression; fixed and re-verified with curl on 2026-09-02 (`/en/nope`, `/es/nope`, `/fr`, `/nope`, `/en/work/unknown-slug` → 404 with `<html lang="en">` + header, no `__next_error__`).

### PR 2 — Root locale detection

Start state: `/` always goes to `/en` via a temporary `permanent: false` redirect in `next.config.ts`; remove that rule when the proxy takes over.

- [x] `src/proxy.ts` (Next 16 name for middleware), `export function proxy(request)`, `config.matcher: '/'`. Next 16 proxy files always run on Node — setting `runtime` throws. Next special-cases a root matcher so it never bleeds into `/en`, `/about`, `/api/*`.
- [x] Order: `preferred_locale` cookie (validated with `isLocale`) → `Accept-Language` best q-value match on the primary subtag (`es-AR`, `es-419` → `es`; `q=0` excluded) → `en`. Pure helper in `src/lib/locale-detection.ts`.
- [x] Never redirects an already-prefixed URL; the proxy only reads the cookie, it never sets it (PR 3 does, on manual switch).
- [x] 307 (never permanent), destination built only from the validated locale, query string preserved, `Vary: Accept-Language, Cookie` + `Cache-Control: private, no-store`. Security headers from `next.config.ts` still apply to the redirect.
- [x] Temporary `/` → `/en` rule removed from `next.config.ts`; legacy permanent redirects untouched.

Manual checks (verified with `next start` + curl on 2026-09-02): no headers → `/en`; `es-419` / `es-AR` → `/es`; `pt-BR` / `fr` → `/en`; `en;q=0.5,es;q=0.9` → `/es`; cookie `es` + English browser → `/es`; cookie `ES` or `../../evil` → ignored → `/en`; `/?a=1` → `/es?a=1`; `/en/about` with Spanish browser → 200, no redirect; `/about` → 308; static files and `/api/contact` unaffected.

Result: 3 commits on `feat/i18n-2-root-locale-redirect` (helper, proxy + config, q=0 fix), 3 files, ≈+130/−6. `pnpm run verify` green.

### PR 3 — Locale-aware navigation

Start state: internal links still point to unprefixed paths and rely on the 301s.

- [x] `localizedPath(lang, path)` in `src/lib/i18n.ts`.
- [x] `SiteHeader`, `SiteFooter`, project cards, resume internal links, CTAs use it.
- [x] `LanguageSwitch` component in the header: swaps the locale segment of the current path, sets `preferred_locale` (`Secure`, `SameSite=Lax`, `Path=/`, `Max-Age` about 1 year).
- [x] Switch preserves the equivalent route; missing Spanish case-study content currently falls back to English at the content layer and stays non-indexable.

Manual checks: navigate the whole site under `/es` without ever leaving `/es`; switch preserves the equivalent page; cookie is set after a manual switch.

### PR 4 — Metadata, canonicals, hreflang, sitemap

Start state: metadata and sitemap still emit unprefixed URLs.

- [x] `buildPageMetadata({ lang, ... })` (and `buildLocaleMetadataFields(lang, path)`, extracted so `work/[slug]/page.tsx` and the home page can reuse just the locale-dependent slice): locale-prefixed canonical, `alternates.languages` for every locale in `INDEXABLE_LOCALES`, `openGraph.locale` + `alternateLocale`.
- [x] `INDEXABLE_LOCALES` in `src/lib/i18n.ts` — `['en']`. Pages in a non-indexable locale get `robots: { index: false, follow: true }` and are excluded from sitemap and `hreflang`.
- [x] `StructuredData` receives `lang` (threaded through `SiteShell`); English text kept for both locales until PR 5 has real Spanish copy.
- [x] `sitemap.ts` emits static routes and published case studies for indexable locales only; `/` excluded.
- [x] `robots.ts` unchanged; `/api/` still blocked.

Manual checks (verified with `next start` + curl on 2026-09-02): `/en/about` canonical `/en/about`, `hreflang="en"` only, `robots: index, follow`; `/es/about` canonical `/es/about`, `robots: noindex, follow`, `og:locale` `es_US` + `og:locale:alternate` `en_US`; sitemap has 13 `<loc>` entries, all `/en/*`, none `/es/` or `/`. `/en` and `/es` home page checked the same way after the fix below.

First pass missed the home page: `[lang]/page.tsx` had no `generateMetadata`, so `/` and `/es` inherited the layout's static, unprefixed canonical (`https://noelsajor.com`) and hardcoded `en_US` locale. Caught during my own verification, fixed in the same PR — home now builds its metadata via `buildLocaleMetadataFields` directly (its title is already fully branded, so it deliberately skips the `%s | Jose Leon` template other pages get).

Slice 2 unlock: when a locale's real content lands, add it to `INDEXABLE_LOCALES` — this flips `hreflang`, sitemap and `noindex` together.

Result: 6 commits on `feat/i18n-4-locale-metadata-sitemap`, 13 files, +257/−71. `pnpm run verify` green.

### PR 5 — Locale content model

Start state: content modules and MDX are single-locale.

- [x] `src/content/en/{home,for-agencies,static-pages,ui}.ts` + `src/content/en/case-studies/*.mdx` (moved via `git mv` from the pre-PR5 paths).
- [x] `src/content/es/{home,for-agencies,static-pages,ui}.ts` are one-line re-exports of the `en` versions (e.g. `export { homeContent } from '../en/home'`) — every `es` value is currently textually identical to `en`, by design (this PR is structural, not translation). `src/content/es/case-studies/` is an empty, git-tracked directory.
- [x] `src/lib/projects.ts`: `getProjectSlugs()` stays lang-independent (always reads `src/content/en/case-studies` — the fixed, stable-across-locales catalog). `getProjects(lang)`, `getFeaturedProjects(lang)`, `getProjectBySlug(slug, lang)` resolve each file per-locale with fallback to `en` when the `es` file doesn't exist yet. `work/[slug]/page.tsx`'s `generateStaticParams()` deliberately untouched — still produces 14 static pages (7 slugs × 2 locales), verified via `.next/server/app/{en,es}/work/*.html` file counts (7 + 7).
- [x] `contact-form-options.ts`: `SUPPORT_TYPES`/`TIMELINES` enums and `src/app/api/contact/route.ts` validation untouched (confirmed zero diff on the route file). Added `SUPPORT_TYPE_LABELS`/`TIMELINE_LABELS: Record<Locale, Record<enumValue, string>>` for display; `ContactForm` now takes a `lang` prop and renders from the label map while the submitted `value` stays the raw enum string.
- [x] UI chrome dictionary (`src/content/en/ui.ts` + `es` re-export) covers `SiteHeader` nav labels, the "Discuss a Project" CTA (desktop AND mobile — a fresh review caught the mobile one left hardcoded English on the first pass, fixed), `SiteFooter` aria-labels, the global 404 copy, and the `[lang]/error.tsx` copy. `not-found.tsx` stays hard-`en` on purpose (Phase 1's Next 16.2 limitation — it's the static global 404 and can't be locale-aware).
- [x] `scripts/validate-content.ts`: `CONTENT_DIR` points at `src/content/en/case-studies`; added a check that `getProjects('es')` returns the same slugs as `getProjects('en')` (proves the fallback works against the still-empty `es` directory).
- [x] Static page copy (`about`/`contact`/`resume`): plain-text leaves (headings, labels, `skillGroups`, `experience`) moved into `src/content/en/static-pages.ts`. Any paragraph with an inline `<Link>`/`mailto:`/tracked CTA was deliberately left as raw JSX in the page file rather than decomposed — a scope boundary to avoid brittle JSX surgery; see file:line list in the PR 5 result note below.
- [x] Fresh review also caught that `SiteHeader`'s `data-tracking` nav ids were derived from the visible label text — once real Spanish labels replace the `es` placeholders, that would silently rename analytics events (`nav_work` → `nav_trabajo`), breaking Phase 11's "keep tracking event names stable" rule. Fixed: tracking ids now derive from the (locale-agnostic) `href` instead.

Manual checks (verified 2026-09-02): `pnpm run validate:content` passes including the new fallback check; `/es`, `/es/about`, `/es/contact`, `/es/resume`, `/es/for-agencies`, `/es/work`, `/es/work/brand-website-build` all 200 with `<html lang="es">` and the same (English fallback) copy as before this PR — nothing went blank or broke; contact form still submits the same enum values.

Left as raw JSX, not extracted (Deliverable 3 scope boundary): `contact/page.tsx` — the "See my resume instead" sentence and the email/LinkedIn address links; `resume/page.tsx` — the "Reach out about a role"/"Download CV" CTAs and the "Get in touch" mailto link. All carry `data-tracking` or an inline `<Link>`.

Result: 6 commits on `feat/i18n-5-locale-content-model` (case studies → home/for-agencies → static pages → UI dictionary → contact labels → post-review fix), 43 files, +377/−157. `pnpm run verify` green.

### PR 6 — Indexability gate

Start state: Slice 1 had locale routes and English fallback content for `es`, but SEO discovery needed one extra guard to ensure non-indexable locales do not appear in static discovery surfaces before real copy lands.

- [x] `generateStaticParams()` for locale-sensitive content uses `INDEXABLE_LOCALES` where the page should only be discoverable for reviewed, indexable locales.
- [x] Sitemap and metadata discovery remain tied to `INDEXABLE_LOCALES` so the same switch controls `hreflang`, sitemap inclusion, and `noindex` removal.
- [x] Spanish routes can still be visited directly for QA, but they are not promoted as indexable content until Slice 2 is complete.

Result: [PR #9](https://github.com/noelsajor/portfolio-v1/pull/9) merged to `dev` on 2026-10-08 via merge commit `49a8a2b66918a21a0ba419f54a47ce698cf5c79b`. `pnpm run verify` green.

### Open decisions (Slice 1)

Slice 2 decisions live in the "Slice 2 open decisions" list above.


- ~~Target audience for Spanish: `es_ES` vs `es_US`/LatAm.~~ Resolved in PR 4: `es_US` (LatAm/US client base, not Spain) — drives `openGraph.locale` today; still the assumption to write Spanish copy against in PR 9/Phase 9.
- CSRF token on the contact form is a pre-existing gap, out of scope here; handle in its own change.

### Session log

- 2026-09-02 — Plan reviewed twice against the codebase; added legacy 301 redirects, security/cache sections, localized error surfaces, Node-runtime note. Implementation starts with PR 1.
- 2026-09-02 — PR 1 implemented on `feat/i18n-1-lang-routes`; it is now [PR #4](https://github.com/noelsajor/portfolio-v1/pull/4), merged to `dev`. Fresh review caught that dynamic 404s lost `<html lang>`; root-caused to a Next 16.2 limitation, resolved by serving all 404s from the static global page. Localized 404 copy deferred. Next: PR 2 (`src/proxy.ts` locale detection), branch from `feat/i18n-1-lang-routes`.
- 2026-09-02 — PR 2 implemented and verified on `feat/i18n-2-root-locale-redirect`; it is now [PR #5](https://github.com/noelsajor/portfolio-v1/pull/5), merged to `dev`. Next: PR 3 (locale-aware links + language switch that sets `preferred_locale`), branch from `feat/i18n-2-root-locale-redirect`.
- 2026-09-02 — PR 3 implemented on `feat/i18n-3-locale-links-switch`; fresh review found two should-fix a11y/UX items (mobile menu not closing on switch, unlabeled wrapper), both fixed. Next: PR 4, branch from `feat/i18n-3-locale-links-switch`.
- 2026-09-02 — PR 4 implemented on `feat/i18n-4-locale-metadata-sitemap`; home page metadata was missed in the first pass, caught and fixed in the same PR. `es_US` OG-locale decision closed. Next: PR 5 (content model — `src/content/{en,es}`, project loader takes `lang`, contact form labels, UI dictionary; flips `es` into `INDEXABLE_LOCALES` once real content lands), branch from `feat/i18n-4-locale-metadata-sitemap`.
- 2026-09-02 — PR 5 implemented on `feat/i18n-5-locale-content-model`; fresh review found two should-fix items (mobile "Discuss a Project" CTA left hardcoded English, nav `data-tracking` ids derived from label text instead of href), both fixed. Current state is [PR #8](https://github.com/noelsajor/portfolio-v1/pull/8) merged to `dev`.
- 2026-10-08 — PRs #4-#8 merged sequentially to `dev` with merge commits (`3e09101`, `43fd3fe`, `e6e70f6`, `79847d4`, `bd5e429`). PR #9 then merged the indexability gate to `dev` (`49a8a2b`), keeping static discovery and SEO surfaces constrained to `INDEXABLE_LOCALES` while Spanish copy remains fallback-only. Slice 1 technical integration is complete on `dev`; `pnpm run verify` passed. `main` intentionally remains unchanged at `1778505`. Slice 2 Spanish copy has not started. Known manual QA warnings: Next permanent redirects return 308, Spanish missing routes use the English global 404 shell, and preview contact-form testing is blocked by Vercel Authentication.

- 2026-10-08 — Slice 2 plan reviewed against `dev` (`03ec478`) and rewritten as a PR table (PRs 10-22). Four gaps added that the first inventory missed: page `generateMetadata` titles/descriptions hardcoded in `page.tsx`, English error strings in `src/app/api/contact/route.ts`, the `validate-content.ts` assertion that `es` has no case studies, and English-only `resume.pdf` / `og-image.png`. Order changed: style guide first, then one structural PR that removes every remaining hardcoded string, then copy-only PRs (home, for-agencies, static pages, one PR per case study), then a one-line activation PR. Next: PR 10 (`docs/es-style-guide.md`), approve it, then PR 11.

- 2026-10-08 — Slice 2 executed end to end as stacked PRs #10-#22 (style guide; structural chrome PR; home; for-agencies; static pages + `resume-es.pdf`; seven case studies, one per PR; activation as a draft). Every PR: `pnpm run verify` green and the prerendered `/en` HTML compared text-identical to a pre-Slice-2 baseline. A sweep of every `/es` page after PR 21 finds no English copy left. PR 11 found ~20 more hardcoded strings than the first inventory (case-study page labels, `/work` index copy, aria-labels, project enum labels, mobile menu toggle), all moved into `uiContent` / `project-labels.ts`; `CaseStudy.contentLocale` keeps question-chip anchors valid while a slug falls back to English. PR 22 also adds `x-default` and sitemap `xhtml:link` alternates (no-ops with one indexable locale). Open: editorial sign-off on #10-#21, then merge in order, then #22, then `dev` -> `main` on the user's call.

**Where a new session picks this up:**
- To review Slice 1 end to end: stay on `dev`, inspect the merge commits through `49a8a2b`, and run `pnpm run verify`.
- To continue the migration: PRs #10-#22 are open and stacked (each targets the previous branch; GitHub retargets to `dev` as each merges). Merge in order after editorial sign-off, re-running `pnpm run verify` on `dev` after #11 and after #22. Do not touch `main` until PR 22 is merged and the user explicitly asks for a production merge; then do the two post-deploy Search Console items in the activation checklist.
- What's deliberately NOT done, i.e. Slice 2 (real content, not structure): write actual Spanish copy for `src/content/es/{home,for-agencies,static-pages,ui}.ts` and `src/content/es/case-studies/*.mdx` (Phase 9 — translate by search intent, not word-for-word, against the `es_US` audience decision); once a locale's content is real, add `'es'` to `INDEXABLE_LOCALES` in `src/lib/i18n.ts` — that one flip turns on `hreflang`, sitemap inclusion, and removes `noindex` together (see Phase 6/7). Also still open: CSRF on the contact form (pre-existing gap, its own change) and the four raw-JSX paragraphs on `contact`/`resume` pages noted above (translate in place when real copy lands).
