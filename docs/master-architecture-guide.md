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
| `/` | `src/app/page.tsx` | Homepage / Hero + Featured Work. |
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
The only supported way to read project data. Three functions, all reading the same MDX files:

- `getProjects({ includeDrafts? })` — all projects, sorted by `order`; used by the homepage and `/work`.
- `getProjectSlugs({ includeDrafts? })` — slugs for `generateStaticParams` on `/work/[slug]`.
- `getProjectBySlug(slug, { includeDrafts? })` — a single project plus its MDX body; used by `/work/[slug]`.

Homepage, `/work`, `/work/[slug]`, route metadata, and any future feature (sitemap, RSS, Open Graph image generation) must all read through this loader — project data must never be re-derived or duplicated elsewhere.

**Draft projects are excluded from every one of these functions by default.** A project is published unless its frontmatter explicitly sets `status: draft` — an omitted `status` always means published. `/work/[slug]` also sets `dynamicParams = false`, so a draft (or unknown) slug 404s instead of being rendered on demand. The `includeDrafts: true` option exists only for internal/development tooling and is never used by any public page.

## 🎨 Global Styles (Tailwind 4)
- **Entry Point**: `src/app/globals.css`
- **Theme Variables**: Use the `@theme` block in `globals.css` to define brand colors and typography.
- **Strict Rule**: Avoid hardcoded hex values in components; always use Tailwind theme tokens.
