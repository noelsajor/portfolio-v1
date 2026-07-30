# Portfolio (portfolio-v1)

Jose Leon's personal portfolio — a Next.js site with real client case studies (some anonymized at client request), a production contact form, and a hardened deployment configuration.

This repository doubles as a reusable "Agency Master Operation Template": the same architecture, SOPs (`docs/best-practices/`), and rebrand workflow (`docs/first-kick-prompt-template.md`) can bootstrap a new client site. That template usage is documented separately — everything in this README describes the repository as it exists today, running as a real, deployed portfolio.

## Core Documentation

- **[Master Architecture Guide](docs/master-architecture-guide.md)** — routes, components, the content schema/validation pipeline, and site configuration. The authoritative technical reference; this README doesn't repeat it.
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** — Vercel setup, environment variables, and the security/analytics/rate-limiting configuration that depends on them.
- **[Production Checklist](docs/production-checklist.md)** — tracked, not-yet-done launch tasks (domain DNS, real analytics IDs, dependency advisories).
- **[Best-Practices SOPs](docs/best-practices/)** — SEO, UI/UX, security, and analytics playbooks, primarily for the template-reuse workflow.
- **[Client Handoff Manual](docs/client-handoff-manual.md)** — non-technical instructions, written for a future non-developer client of a templated site, not for this repository's actual owner/maintainer.

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: MDX case studies, validated at load time with Zod (`src/lib/project-schema.ts`)
- **Email**: Resend (contact form)
- **Rate limiting**: Upstash Redis + `@upstash/ratelimit` (contact form)
- **Analytics**: Google Analytics 4 (`@next/third-parties`), optional and production-only
- **Deployment**: Vercel

## Local Development

### Prerequisites

- Node.js 20.9+ (required by Next.js 16 — see `engines` in `package.json`)
- pnpm (see `packageManager` in `package.json` for the exact version)

### Setup

```bash
pnpm install
pnpm dev
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in what you need. Every variable is optional in local development — the app runs (contact form included, via Resend's sandbox sender) without any of them configured. See `.env.example` for what each one does and [Deployment Guide](DEPLOYMENT_GUIDE.md) for production requirements (in particular, `CONTACT_FROM_EMAIL` is required once deployed to production).

### Quality Control

```bash
pnpm lint          # Lint
pnpm typecheck     # Type check
pnpm build         # Production build
pnpm validate:content  # MDX frontmatter validation scenarios
pnpm verify        # All four, in sequence
```

## Project Structure

```
src/
  app/            Routes (App Router) — pages, the contact API route, robots.ts, sitemap.ts
  components/     UI components (PascalCase.tsx) — layout, home sections, MDX, forms
  content/        MDX case studies (src/content/case-studies/) and homepage copy (home.ts)
  lib/            Config, data access, and validation modules (kebab-case.ts) —
                  site-config.ts, project-schema.ts, projects.ts, rate-limiter.ts, email-config.ts
scripts/          One-off scripts (currently just validate-content.ts)
docs/             Architecture guide, deployment guide, SOPs, case-study source drafts
```

See the [Master Architecture Guide](docs/master-architecture-guide.md) for what each module actually does.

## Content Workflow

Case studies live in `src/content/case-studies/` as MDX files, validated against a Zod schema on every read — invalid frontmatter fails the dev server or build loudly, not silently.

To add a project: copy `_template.mdx`, rename it to the project's slug (lowercase, hyphenated — e.g. `my-project.mdx`), fill in the fields it documents, and set `status: draft` until it's ready to publish. Run `pnpm validate:content` or `pnpm dev` to check it. Full field-by-field documentation is in the [Master Architecture Guide](docs/master-architecture-guide.md) under "Content & Data Schema".

## Deployment

Production deploys from `main`; `dev` is the working branch. See the [Deployment Guide](DEPLOYMENT_GUIDE.md) for Vercel setup, required environment variables, and the security/analytics configuration.

---

© 2026 Jose Leon.
