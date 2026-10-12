# 01 - SEO & Geo Guidelines

This playbook defines the standards for Search Engine Optimization (SEO) and Generative AI Optimization (GAIO).

## 🌍 Metadata Standards
- **Page Titles**: Maximum 60 characters. Format: `Page Name | Client Name | Key Benefit`.
- **Descriptions**: Maximum 155 characters. Must include a primary keyword and a clear Call-to-Action (CTA).
- **Canonical URLs**: Every page must define a canonical URL in the `Metadata` object of the route to prevent duplicate content issues.
- **Open Graph (OG)**: Every project must have a default `opengraph-image.png` in `src/app/`.

## 📍 Geo-Targeting Rules
- Use JSON-LD (Schema.org) for Local Business data if the client has physical locations.
- Implement sub-folders (e.g., `/en-us/`) only if explicitly required; otherwise, use `lang="en"` on the `html` tag.

## 🤖 Generative AI Optimization (GAIO)
- **Natural Language**: Use semantic HTML (`<article>`, `<section>`, `<aside>`) to help AI scrapers and LLMs understand content hierarchy.
- **Structured Data**: Always implement `Article` or `Product` schema for MDX-driven case studies.
- **FAQ Schema**: If a page has more than 3 FAQs, implement JSON-LD FAQ schema.
- **One entity, linked by `@id`**: emit the site owner (`Person` or `Organization`) and `WebSite` once per page with stable `@id`s (`/#person`, `/#website`) and have every page/article node reference them, instead of repeating partial copies. Every value in the graph must be readable on the page (content modules, frontmatter); never invent schema-only claims.
- **Quotable answers**: each key page should carry at least one block an answer engine can lift verbatim (a FAQ with self-contained answers, or a label/value facts list), in every indexable language.
- **AI crawlers**: list the documented AI user agents explicitly in `robots.txt` with the intended policy, so the decision is recorded and survives later edits. Ship `/llms.txt` generated from the same content source as the pages.
- **Reference implementation**: `docs/seo-geo-entity-layer.md` in this repo.

## 🔗 Technical SEO
- **Sitemap**: Auto-generate `sitemap.xml` using `next-sitemap` or Next.js metadata API.
- **Robots.txt**: Ensure `robots.txt` is configured to allow crawling of the root but block any `/tmp` or development routes.
- **One host**: pick `www` or apex, redirect the other at the platform level, and make `siteUrl` (canonicals, OG, sitemap, JSON-LD, `Host:`) match the redirect target. Audit the live site with `curl -sI` after every domain change.
