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
- [ ] Define locale metadata values: `en_US` and `es_ES` or `es_US`, depending on the target audience.
- [ ] Move public app routes under `src/app/[lang]/`.
- [ ] Add `generateStaticParams()` for `en` and `es` at the locale layout level.
- [ ] Set `<html lang={lang}>` from the route param.
- [ ] Keep global providers, analytics, header, footer, and structured data in the locale layout.
- [ ] Localize the error surfaces: add `[lang]/not-found.tsx` and `[lang]/error.tsx` so a visitor inside `/es/...` sees Spanish error copy.
- [ ] Add a `[lang]/[...rest]/page.tsx` catch-all that calls `notFound()`, so unmatched URLs under a locale render the localized 404 inside the locale layout instead of the root one.
- [ ] Keep the root `not-found.tsx` and `global-error.tsx` locale-neutral; they render outside the `[lang]` segment and cannot read the locale param.

Likely route structure:

```txt
src/app/
  layout.tsx
  page.tsx
  not-found.tsx
  global-error.tsx
  [lang]/
    layout.tsx
    page.tsx
    not-found.tsx
    error.tsx
    [...rest]/page.tsx
    about/page.tsx
    contact/page.tsx
    resume/page.tsx
    for-agencies/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
```

Implementation note: the root `src/app/layout.tsx` may need to stay minimal because Next requires a root layout. The locale-aware shell can live in `src/app/[lang]/layout.tsx`.

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

- [ ] Add a helper like `localizedPath(lang, path)`.
- [ ] Update `SiteHeader` links to include the active locale.
- [ ] Update `SiteFooter` internal links to include the active locale.
- [ ] Update project card links from `/work/[slug]` to `/[lang]/work/[slug]`.
- [ ] Update resume links that point to internal project pages.
- [ ] Keep external links unchanged.
- [ ] Add a language switch component to the header.
- [ ] Make the switch preserve the equivalent page when available.

Examples:

| Current URL | Switch To Spanish | Switch To English |
|-------------|-------------------|-------------------|
| `/en` | `/es` | `/en` |
| `/en/about` | `/es/about` | `/en/about` |
| `/en/work/brand-website-build` | `/es/work/brand-website-build` | `/en/work/brand-website-build` |

If a translated case study does not exist yet, either hide that case study in the missing locale or redirect the switch to the localized `/work` index. Do not send users to a 404 from the language switch.

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
| Case studies | `src/content/case-studies/*.mdx` | Add per-locale MDX content. |
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

- [ ] Extend `buildPageMetadata()` to accept `lang`.
- [ ] Generate canonical URLs with locale prefix.
- [ ] Add `alternates.languages` for English and Spanish equivalents.
- [ ] Add an explicit `x-default` alternate pointing to the fallback English page.
- [ ] Set localized Open Graph locale.
- [ ] Add `openGraph.alternateLocale` where useful.
- [ ] Ensure page titles and descriptions are localized.
- [ ] Avoid pointing canonical from Spanish pages to English pages.

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

- [ ] Every page with both language versions exposes `en`, `es`, and `x-default` alternates.
- [ ] `x-default` points to the English fallback equivalent, not to `/`.
- [ ] If only one localized version exists, publish only the available language alternate and define the fallback behavior explicitly; do not create an `hreflang` URL that returns a 404.

### Phase 7: Sitemap And Robots

Make search engines discover both language versions.

- [ ] Update `src/app/sitemap.ts` to emit all static routes for both locales.
- [ ] Emit all published case studies for each locale.
- [ ] Include `lastModified` only when the source content has a real `updatedAt`.
- [ ] Include language alternates if supported by the current Next metadata route type.
- [ ] Exclude `/` from the content sitemap because it is redirect-only.
- [ ] Keep `robots.ts` allowing localized routes.
- [ ] Ensure `/api/` remains blocked.

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

- [ ] Update `StructuredData` to receive `lang`.
- [ ] Localize `WebSite.description`.
- [ ] Localize `Person.jobTitle` if it appears in the target language page.
- [ ] Add Article/CreativeWork schema for case studies if the project wants stronger GAIO/SEO coverage.
- [ ] Add FAQ schema for pages that render a real FAQ section with enough questions.

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
- [ ] An unknown URL under `/es/...` renders the Spanish 404 inside the locale layout, not the root English one.
- [ ] A runtime error inside `/es/...` renders the Spanish error boundary.
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

This section is the resume point. If a working session is lost, start here: read the PR table, check out the branch of the first PR that is not `merged`, run `git log --oneline -5` and `pnpm run verify`, and continue from that PR's checklist.

### Delivery strategy

- Scope of this pass: **Slice 1 only** — the technical foundation. Spanish routes exist and work, but serve English fallback copy and are `noindex` until real Spanish content lands (Slice 2, tracked separately).
- Five chained PRs, each independently shippable. Every PR must pass `pnpm run verify` and its manual checks before merge.
- Branch naming: `feat/i18n-<N>-<short-name>`. Base branch: `dev`. Each branch is cut from the previous PR's branch (they depend on each other); after PR N merges into `dev`, PR N+1 is rebased onto `dev`.
- Commits follow Conventional Commits, one work unit per commit, no attribution trailers.
- No test runner exists in this project; verification is `pnpm run verify` (lint, typecheck, build, content validation) plus the manual browser checks listed per PR.

### PR table

| # | Branch | Scope | Status |
|---|--------|-------|--------|
| 1 | `feat/i18n-1-lang-routes` | Locale config, move public routes under `[lang]`, root `/` → `/en` fallback, legacy 301 redirects, localized error surfaces | pending |
| 2 | `feat/i18n-2-root-locale-redirect` | Middleware: `/` picks locale from cookie → `Accept-Language` → `en`; Node runtime; exclusions | pending |
| 3 | `feat/i18n-3-locale-links-switch` | `localizedPath()` helper, header/footer/card/resume links keep locale, language switch component that sets `preferred_locale` | pending |
| 4 | `feat/i18n-4-locale-metadata-sitemap` | `buildPageMetadata(lang)`, canonical + `hreflang`, OG locale, `StructuredData(lang)`, sitemap for indexable locales, `noindex` for locales without real content | pending |
| 5 | `feat/i18n-5-locale-content-model` | `src/content/{en,es}` with `es → en` fallback, project loader takes `lang`, contact form labels split from values, UI label dictionary | pending |

Status values: `pending` → `in-progress` → `pr-open (#n)` → `merged`.

### PR 1 — Locale foundation

Start state: all routes live at `src/app/<route>`; no locale concept exists.

- [ ] `src/lib/i18n.ts`: `LOCALES = ['en', 'es']`, `DEFAULT_LOCALE = 'en'`, `type Locale`, `isLocale()` guard.
- [ ] Move `page.tsx`, `about/`, `contact/`, `resume/`, `for-agencies/`, `work/`, `work/[slug]/` under `src/app/[lang]/`.
- [ ] `src/app/[lang]/layout.tsx` renders `<html lang={lang}>` + `<body>`, holds providers/header/footer/analytics/structured data, exports `generateStaticParams()` for both locales, and calls `notFound()` for an unsupported `lang`.
- [ ] `src/app/layout.tsx` becomes a pass-through (`return children`) so the root `not-found.tsx` still has a root layout.
- [ ] `src/app/page.tsx` does `redirect('/en')` as the safety net until PR 2 adds smart detection.
- [ ] `src/app/[lang]/not-found.tsx`, `src/app/[lang]/error.tsx`, `src/app/[lang]/[...rest]/page.tsx` (calls `notFound()`).
- [ ] `next.config.ts` `redirects()`: permanent redirects `/about`, `/work`, `/contact`, `/resume`, `/for-agencies`, `/work/:slug` → `/en/...`.
- [ ] `work/[slug]` keeps `dynamicParams = false` and `generateStaticParams()` now returns `{ lang, slug }` pairs.
- [ ] Build output shows the locale pages as static (`○`/`●`), not dynamic (`ƒ`).

Finished state: `/en/*` and `/es/*` render the current English site; every legacy URL 301s to `/en/*`; `/` lands on `/en`.

Manual checks: `/about` → 301 → `/en/about`; `/work/brand-website-build` → 301; `/es/about` renders; `/es/does-not-exist` renders the `[lang]` 404; `html lang` is `es` under `/es`.

### PR 2 — Root locale detection

Start state: `/` always goes to `/en`.

- [ ] Middleware in `src/proxy.ts` (Next 16 name for middleware) on the default Node runtime (no `runtime = 'edge'`), matched only on `/`.
- [ ] Order: `preferred_locale` cookie (validated with `isLocale`) → `Accept-Language` best match → `en`.
- [ ] Never redirect an already-prefixed URL.
- [ ] Response sets `Vary: Accept-Language, Cookie` or is marked non-cacheable.
- [ ] Exclusions verified: `/api/`, `/_next/`, static files, `sitemap.xml`, `robots.txt`, images.

Manual checks: Spanish browser + no cookie → `/es`; English → `/en`; cookie `es` + English browser → `/es`; direct `/en/about` never redirects.

### PR 3 — Locale-aware navigation

Start state: internal links still point to unprefixed paths and rely on the 301s.

- [ ] `localizedPath(lang, path)` in `src/lib/i18n.ts`.
- [ ] `SiteHeader`, `SiteFooter`, project cards, resume internal links, CTAs use it.
- [ ] `LanguageSwitch` component in the header: swaps the locale segment of the current path, sets `preferred_locale` (`Secure`, `SameSite=Lax`, `Path=/`, `Max-Age` ≈ 1 year).
- [ ] Switch never lands on a 404: if the equivalent page does not exist in the target locale, go to that locale's `/work` (case studies) or home.

Manual checks: navigate the whole site under `/es` without ever leaving `/es`; switch preserves the equivalent page; cookie is set after a manual switch.

### PR 4 — Metadata, canonicals, hreflang, sitemap

Start state: metadata and sitemap still emit unprefixed URLs.

- [ ] `buildPageMetadata({ lang, ... })`: locale-prefixed canonical, `alternates.languages` for every locale that has real content, `openGraph.locale` + `alternateLocale`.
- [ ] `INDEXABLE_LOCALES` in `src/lib/i18n.ts` — starts as `['en']`. Pages in a non-indexable locale get `robots: { index: false }` and are excluded from sitemap and `hreflang`.
- [ ] `StructuredData` receives `lang`.
- [ ] `sitemap.ts` emits static routes and published case studies for indexable locales only; `/` excluded.
- [ ] `robots.ts` unchanged except confirming `/api/` stays blocked.

Manual checks: view source of `/en/about` — canonical is `/en/about`, no `hreflang` to `/es` yet; `/es/about` has `noindex`; sitemap has only `/en/*`.

Slice 2 unlock: when a locale's real content lands, add it to `INDEXABLE_LOCALES` — this flips `hreflang`, sitemap and `noindex` together.

### PR 5 — Locale content model

Start state: content modules and MDX are single-locale.

- [ ] `src/content/en/{home,for-agencies,static-pages}.ts` + `src/content/en/case-studies/*.mdx` (moved from current paths).
- [ ] `src/content/es/` mirrors the structure; missing files fall back to `en` at load time.
- [ ] `getContent(lang)` style loaders; `projects.ts` accepts `lang` and reads `src/content/{lang}/case-studies` with `en` fallback.
- [ ] `contact-form-options.ts` keeps enum values; labels come from a per-locale map. Server validation unchanged.
- [ ] UI label dictionary for header, footer, 404, error, CTA strings.
- [ ] `scripts/validate-content.ts` validates every locale directory with the same schema.

Manual checks: `pnpm run validate:content` passes; `/es` renders (English fallback copy); contact form submits with the same enum values as before.

### Open decisions (must close before Slice 2)

- Target audience for Spanish: `es_ES` vs `es_US`/LatAm. Drives vocabulary, keywords and OG locale.
- CSRF token on the contact form is a pre-existing gap, out of scope here; handle in its own change.

### Session log

- 2026-09-02 — Plan reviewed twice against the codebase; added legacy 301 redirects, security/cache sections, localized error surfaces, Node-runtime note. Implementation starts with PR 1.
