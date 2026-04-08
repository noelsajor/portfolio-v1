# 05 - Backend & Content Architecture

This playbook defines how data is stored, fetched, and validated.

## 📁 Content Management (MDX Model)
- **Source of Truth**: All long-form content is stored in `src/content/`.
- **Media Assets**: Images for content must be stored in `public/content/` or a managed CDN (like Sanity/Cloudinary).
- **Versioning**: Content changes must be committed to Git for full traceability.

## 💾 Data Modeling
- **TypeScript First**: Every data entity must have a corresponding TypeScript interface/type in `src/data/`.
- **Validation**: Frontmatter in `.mdx` files must be parsed and validated using `gray-matter` or `zod` to prevent runtime crashes.

## 🔌 API & Fetching
- **Server-Side Fetching**: Use Next.js `fetch` with appropriate caching strategies.
- **Error Handling**: Wrap all data fetching logic in `try/catch` blocks. Return a fallback UI or `notFound()` if critical data is missing.
- **Rate Limiting**: If connecting to external APIs (e.g., Shopify, HubSpot), implement basic rate-limit aware fetching.

## ☁️ Headless CMS Integration (Optional)
If migrating from local MDX to a Headless CMS (Sanity, Strapi, Contentful):
1.  Mirror local MDX schemas to the CMS fields.
2.  Use the CMS Webhooks to trigger Vercel builds on content publish.
3.  Implement Draft Mode to allow clients to preview content before going live.
