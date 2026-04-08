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

### 1. Static Project Data (`src/data/projects.ts`)
Used for quick previews and listing pages.
```typescript
type Project = {
    slug: string;
    name: string;
    type: 'Homepage' | 'PDP' | 'Collection' | 'CRO';
    role: string;
    summary: string;
    year?: string;
}
```

### 2. Case Studies (`src/content/case-studies/`)
Rich-text content stored as `.mdx` files. Frontmatter must follow the `Project` type structure for consistency.

## 🎨 Global Styles (Tailwind 4)
- **Entry Point**: `src/app/globals.css`
- **Theme Variables**: Use the `@theme` block in `globals.css` to define brand colors and typography.
- **Strict Rule**: Avoid hardcoded hex values in components; always use Tailwind theme tokens.
