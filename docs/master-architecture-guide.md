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

## 📦 Component Inventory
Reusable UI elements located in `src/components/`.

### Layout Components
- `SiteHeader.tsx`: Global navigation, brand logo, and mobile menu.
- `SiteFooter.tsx`: Global footer, secondary links, and social icons.

### MDX Components
- Located in `src/components/mdx/`: Custom React components used inside `.mdx` files for rich case study layouts.

### Homepage Section Components
- Located in `src/components/home/`: nine presentational components composing the homepage — `HeroSection`, `TrustStrip`, `ServicesSection`, `FeaturedWorkSection`, `ProcessSection`, `AIWorkflowSection`, `WhyMeSection`, `AboutPreviewSection`, `FinalCTASection` — rendered in that order by `src/app/page.tsx`.
- Static copy for these components lives in `src/content/home.ts` (a single plain, typed object keyed by section — not a CMS or content loader). Each component imports only the section it renders. `FeaturedWorkSection` is the only one that also reads live data, via the project loader below.
- Markup-specific strings that aren't reusable editorial copy — an `aria-label`, a decorative arrow glyph — intentionally stay inline in the component rather than being centralized into `home.ts`. They're implementation details of that component's markup, not content someone would edit as copy.

## 📄 Content & Data Schema

### Single Source of Truth: MDX (`src/content/case-studies/`)
Every project exists exactly once, as a single `.mdx` file — there is no separate data file. Frontmatter is the only place project metadata is authored. Files prefixed with `_` (e.g. `_template.mdx`) are internal reference templates and are never exposed publicly.

```typescript
type Project = {
    slug: string          // derived from the filename, never authored in frontmatter
    title: string
    client?: string
    type: 'E-commerce' | 'Product Design' | 'Marketing Website' | 'Design System'
    roles: string[]
    summary: string
    services: string[]
    year?: string
    featured?: boolean
    order?: number                    // deterministic display order; missing sorts last
    status?: 'draft' | 'published'    // omitted = published
    coverImage: string
    coverAlt: string
    liveUrl?: string
    repositoryUrl?: string
}

type CaseStudyFrontmatter = Project & {
    challenge: string
    outcome: string
    duration?: string
    team?: string
}
```

### Data Access Layer (`src/lib/projects.ts`)
The only supported way to read project data. Four functions, all reading the same MDX files:

- `getProjects({ includeDrafts? })` — the full published project collection, in editorial order (sorted by `order`). Used by `/work`.
- `getFeaturedProjects({ includeDrafts? })` — the published, `featured: true` subset, in the same editorial order as `getProjects()`. Used by the homepage's Featured Work section.
- `getProjectSlugs({ includeDrafts? })` — slugs for `generateStaticParams` on `/work/[slug]`.
- `getProjectBySlug(slug, { includeDrafts? })` — a single project plus its MDX body; used by `/work/[slug]`.

**Responsibility boundary**: `getProjects()` and `getFeaturedProjects()` decide *which* projects qualify and in what order — that's the data layer's job. *How many* are actually shown is a presentation decision made by the calling component: `FeaturedWorkSection` calls `getFeaturedProjects().slice(0, 3)` to cap the homepage at 3 cards. The loader itself has no concept of "3" — a future page that wants to show a different number of featured projects can call `getFeaturedProjects()` unmodified.

Homepage, `/work`, `/work/[slug]`, route metadata, and any future feature (sitemap, RSS, Open Graph image generation) must all read through this loader — project data must never be re-derived or duplicated elsewhere.

**Draft projects are excluded from every one of these functions by default.** A project is published unless its frontmatter explicitly sets `status: draft` — an omitted `status` always means published. `/work/[slug]` also sets `dynamicParams = false`, so a draft (or unknown) slug 404s instead of being rendered on demand. The `includeDrafts: true` option exists only for internal/development tooling and is never used by any public page.

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
