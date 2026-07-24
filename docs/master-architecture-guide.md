# 🏗️ Master Architecture Guide

## 🎯 Use Case & Philosophy
This build is an **Agency Master Operation Template**. It is designed to serve as a high-performance baseline for creating conversion-driven marketing websites and portfolios, specifically for the Shopify and e-commerce ecosystem.

- **Primary Objective**: Rapidly deploy SEO-optimized, secure, and brand-consistent sites for clients.
- **Conversion Focus**: Built-in tracking and UX patterns designed to turn visitors into leads/customers.
- **AI-First Design**: Structured with semantic HTML and clear documentation to allow AI agents to handle rebranding and content migration flawlessly.

This document serves as the technical blueprint for the Agency Master Template. It defines how data flows, how routes are structured, and how components are organized.

## 🗺️ Routing Map (Next.js App Router)
All routes are located in `src/app/`.

| Route | File Path | Description |
| :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Homepage — composes Hero, TrustStrip, Services, FeaturedWork, Process, AIWorkflow, WhyMe, AboutPreview and FinalCTA sections, in that order. |
| `/work` | `src/app/work/page.tsx` | Full portfolio listing. |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx` | Dynamic case study pages (Markdown-driven). |
| `/about` | `src/app/about/page.tsx` | Agency/Professional biography. |
| `/contact` | `src/app/contact/page.tsx` | Lead generation form. |
| `/api/contact` | `src/app/api/contact/route.ts` | POST-only Route Handler — rate-limited (`src/lib/rate-limiter.ts`, Upstash Redis), then sends contact-form submissions via Resend. Not a page. |
| `/robots.txt` | `src/app/robots.ts` | Generated `MetadataRoute.Robots` — disallows `/api/`, points to the sitemap. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Generated `MetadataRoute.Sitemap` — static routes plus every published case study (via `getProjects()`, not a second data source). No `priority`/`changeFrequency` on any entry — Google's documentation states it doesn't use either for crawling or ranking. `lastModified` is included only for projects with a real `updatedAt` in frontmatter; static routes and projects without one are omitted rather than backfilled with the build date. |

## 📦 Component Inventory
Reusable UI elements located in `src/components/`.

### Layout Components
- `SiteHeader.tsx`: Global navigation, brand logo, and mobile menu. Client Component (nav state).
- `SiteFooter.tsx`: Global footer, secondary links, and social icons.
- `StructuredData.tsx`: Person + WebSite JSON-LD, rendered once in the root layout.
- `GoogleAnalyticsPageViews.tsx`: Client Component — fires a `page_view` event on every App Router client-side navigation after the first (the bare `<GoogleAnalytics>` component from `@next/third-parties` only tracks the initial load on its own).

### Form Components
- `ContactForm.tsx`: Client Component — the `/contact` form. Posts to `/api/contact`, honest loading/success/error states, server-validated, honeypot spam protection.

### MDX Components
- Located in `src/components/mdx/`: Custom React components used inside `.mdx` files for rich case study layouts.

### Homepage Section Components
- Located in `src/components/home/`: nine presentational components composing the homepage — `HeroSection`, `TrustStrip`, `ServicesSection`, `FeaturedWorkSection`, `ProcessSection`, `AIWorkflowSection`, `WhyMeSection`, `AboutPreviewSection`, `FinalCTASection` — rendered in that order by `src/app/page.tsx`.
- Static copy for these components lives in `src/content/home.ts` (a single plain, typed object keyed by section — not a CMS or content loader). Each component imports only the section it renders. `FeaturedWorkSection` is the only one that also reads live data, via the project loader below.
- Markup-specific strings that aren't reusable editorial copy — an `aria-label`, a decorative arrow glyph — intentionally stay inline in the component rather than being centralized into `home.ts`. They're implementation details of that component's markup, not content someone would edit as copy.

## 📄 Content & Data Schema

### Single Source of Truth: MDX (`src/content/case-studies/`)
Every project exists exactly once, as a single `.mdx` file — there is no separate data file. Frontmatter is the only place project metadata is authored. Files prefixed with `_` (e.g. `_template.mdx`) are internal reference templates and are never exposed publicly.

Note the distinction from `docs/case-studies/`: that directory holds approved narrative **source drafts** (editorial working documents a case study is written and reviewed from) — it is not consumed by the app and is not the MDX contract. Once a case study's narrative is approved there, its content is used to author the corresponding file in `src/content/case-studies/`, which remains the only source `getProjects()`/`getFeaturedProjects()`/`getProjectBySlug()` ever read from.

### Schema & Runtime Validation

Frontmatter is treated as external, untrusted input. The authoritative field list lives in **one place**: `src/lib/project-schema.ts` (a Zod schema, `projectFrontmatterSchema`) — not as a hand-written TypeScript interface, and not duplicated here. `ProjectFrontmatter` (and the `Project`/`CaseStudyFrontmatter` names re-exported from `src/lib/projects.ts` for backward compatibility) are inferred directly from that schema via `z.infer`, so the type and the validation can never drift apart.

**Where validation happens**: every `.mdx` file is validated exactly once, in `readProjectFile()` inside `src/lib/projects.ts`, immediately after `gray-matter` parses the frontmatter and before that data is returned to any caller. This is the single trusted boundary — `getProjects()`, `getFeaturedProjects()`, `getProjectSlugs()`, and `getProjectBySlug()` all read through it, so nothing downstream (pages, sitemap, metadata) ever sees unvalidated frontmatter.

**Unknown fields**: the schema uses `.strict()` — a typo'd or stray frontmatter key fails validation instead of being silently ignored. Both real case studies today use exactly the documented field set with no extension fields, so there's no current case for allowing arbitrary extra keys.

**On invalid frontmatter**: `readProjectFile()` throws immediately, failing the dev server or build loudly (never a production runtime response) with the filename, slug, failing field path(s), and a human-readable reason, e.g.:
```
Invalid case-study frontmatter in "iotek.mdx" (slug: "iotek"):
  - title: title is required
  - liveUrl: liveUrl must be a valid URL
```

**Adding a new project**: copy `_template.mdx`, rename it to the project's slug, fill in every field the template documents, and set `status: draft` until it's ready to publish. If a required field is missing or a field has the wrong shape, the dev server / build will fail immediately with the error format above — fix the file and re-run.

**Validation scenarios**: `pnpm run validate:content` (`scripts/validate-content.ts`) exercises the schema directly (valid project, missing field, invalid URL, invalid enum, unknown field) and the loader against the real content directory (template/draft exclusion, and that a genuinely invalid file's error message names the filename and field). No new test framework was introduced — the project has none yet; this is a plain script run via `tsx`.

Two fields are intentionally free-text strings, not structured dates: `year` (e.g. `"2025"`) and `duration` (e.g. `"~6-7 months (2025)"`). Case studies store these as human-readable values, not ISO dates, so the schema doesn't force a date shape onto them.

`updatedAt` (optional, `YYYY-MM-DD`) is the one real date field: the date a case study's content was last meaningfully revised. It's manually authored, not auto-computed — update it by hand when you materially edit a published case study, not for typo fixes, and never set it to today's date just to have a value. It powers the sitemap's `lastModified` for that project; a project without `updatedAt` simply has no `lastModified` entry rather than one backfilled with the build date. `iotek.mdx` and `nuud.mdx` were seeded with `2026-07-21`, the real date of the commit that published both — not an invented value.

### Data Access Layer (`src/lib/projects.ts`)
The only supported way to read project data. Four functions, all reading the same MDX files:

- `getProjects({ includeDrafts? })` — the full published project collection, in editorial order (sorted by `order`). Used by `/work`.
- `getFeaturedProjects({ includeDrafts? })` — the published, `featured: true` subset, in the same editorial order as `getProjects()`. Used by the homepage's Featured Work section.
- `getProjectSlugs({ includeDrafts? })` — slugs for `generateStaticParams` on `/work/[slug]`.
- `getProjectBySlug(slug, { includeDrafts? })` — a single project plus its MDX body; used by `/work/[slug]`.

**Responsibility boundary**: `getProjects()` and `getFeaturedProjects()` decide *which* projects qualify and in what order — that's the data layer's job. *How many* are actually shown is a presentation decision made by the calling component: `FeaturedWorkSection` calls `getFeaturedProjects().slice(0, 3)` to cap the homepage at 3 cards. The loader itself has no concept of "3" — a future page that wants to show a different number of featured projects can call `getFeaturedProjects()` unmodified.

Homepage, `/work`, `/work/[slug]`, route metadata, and any future feature (sitemap, RSS, Open Graph image generation) must all read through this loader — project data must never be re-derived or duplicated elsewhere.

**Draft projects are excluded from every one of these functions by default.** A project is published unless its frontmatter explicitly sets `status: draft` — an omitted `status` always means published. `/work/[slug]` also sets `dynamicParams = false`, so a draft (or unknown) slug 404s instead of being rendered on demand. The `includeDrafts: true` option exists only for internal/development tooling and is never used by any public page.

## 🔍 Site Configuration, SEO & Analytics (`src/lib/`)

- **`site-config.ts`**: single source of truth for the production domain (`siteConfig.siteUrl`), site identity, and social profiles (`sameAs`). `absoluteUrl(path)` and `buildPageMetadata({ title, description, path })` are the two exports every route's `metadata` should go through — they generate canonical URLs, Open Graph, and Twitter card fields consistently instead of each page hand-rolling them. Root layout metadata, `robots.ts`, `sitemap.ts`, and `StructuredData.tsx` all read from this file.
- **`analytics-config.ts`**: reads `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `GOOGLE_SITE_VERIFICATION`, and `BING_SITE_VERIFICATION` from environment variables — never hardcoded, never invented. `buildVerificationMetadata()` returns the `verification` field for the root layout's metadata, omitting it entirely when no tokens are configured.

### Metadata Conventions

- **Don't set `twitter.title`/`twitter.description`.** Next's Metadata API fills both automatically from `openGraph.title`/`openGraph.description` when the `twitter` object omits them (verified via rendered output, not assumed) — adding them explicitly is dead duplication, not a safety net.
- **`robots` is inherited, not merged, per key.** A page's `metadata` object only needs to set `robots` when it wants to *differ* from the root layout's `index: true, follow: true` — omitting it entirely inherits the parent correctly. The one exception: `not-found.tsx` explicitly sets `robots: { index: false, follow: false }`, because Next's built-in not-found handling injects its own `noindex` tag *in addition to* whatever the root layout would otherwise contribute, rather than replacing it — without the explicit override, the 404 page rendered two conflicting `<meta name="robots">` tags.
- **No Open Graph/Twitter images exist anywhere yet** (root, pages, or case studies) — deliberate, not an oversight: there's no real image asset to reference. When one is added, note that OG metadata does **not** deep-merge between a layout and a page — a page that sets its own `openGraph` object (as every page here does, via `buildPageMetadata`/`generateMetadata`) replaces the parent's `openGraph` entirely, images included. A future global fallback image set only on the root layout would silently disappear on every other page unless `buildPageMetadata`/`generateMetadata` are updated to accept and pass through an `image` parameter. Once a real image exists, also upgrade `twitter.card` from `'summary'` to `'summary_large_image'`.

## 🎨 Global Styles (Tailwind 4)
- **Entry Point**: `src/app/globals.css`
- **Theme Variables**: Use the `@theme` block in `globals.css` to define brand colors and typography.
- **Strict Rule**: Avoid hardcoded hex values in components; always use Tailwind theme tokens.

## Infrastructure Lessons Learned

### Issue
During the foundation phase, the existing Vercel project repeatedly deployed an outdated commit, despite:
- Local builds succeeding.
- TypeScript passing.
- ESLint passing.
- The production build passing.
- GitHub containing the latest commits.

Symptoms observed in the stale deployments:
- Dependency scanning continued detecting an old version of `next-mdx-remote`.
- Deleted project files continued appearing in deployment builds.

### Investigation
The following was verified, in order:
- **Git verification** — confirmed the local working tree was clean and commits existed with the expected hashes.
- **Branch verification** — confirmed `main` was the active branch, both locally and on the remote.
- **Dependency verification** — confirmed `package.json`/`pnpm-lock.yaml` on `main` referenced the intended dependency versions.
- **Local production build verification** — confirmed `tsc --noEmit`, `eslint`, and a clean `rm -rf .next && pnpm run build` all passed against the exact commit in question.
- **Repository synchronization** — confirmed via `git fetch` and `git log origin/main` that the GitHub remote had received and stored the correct commits.
- **Vercel deployment inspection** — inspected the Vercel project's deployment history and GitHub integration state for signs of what commit it was actually building from.

### Root Cause
The original Vercel project appeared to have a stale or corrupted Git integration. The repository itself was healthy — verified clean at every checkpoint above. The issue was isolated to the Vercel project configuration, not to the codebase or GitHub.

### Resolution
The issue was resolved by:
- Creating a new Vercel project.
- Reconnecting the existing GitHub repository.
- Verifying automatic deployments.
- Confirming the latest commits were successfully deployed.

### Recommendation
If a Vercel project repeatedly deploys stale commits despite GitHub containing the correct repository state and local production builds succeeding, prefer creating a fresh Vercel project instead of spending excessive time troubleshooting a potentially stale Git integration.
