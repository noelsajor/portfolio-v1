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

## 🔗 Technical SEO
- **Sitemap**: Auto-generate `sitemap.xml` using `next-sitemap` or Next.js metadata API.
- **Robots.txt**: Ensure `robots.txt` is configured to allow crawling of the root but block any `/tmp` or development routes.
