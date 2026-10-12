# SEO + GEO entity layer

Companion to `docs/bilingual-seo-migration-plan.md` and `docs/best-practices/01-seo-geo-guidelines.md`. This pass sits on top of the finished bilingual migration (PRs #4-#25 on `dev`): the migration made `/en` and `/es` independently indexable; this layer tells search engines and AI answer engines *who* the site is about and *what* it offers, in both languages, and fixes the one host-level defect found in the live-site audit.

Scope: one PR against `dev`, `feat/seo-geo-entity-layer`. No English page copy changed except two additive blocks (home FAQ, About "At a glance"), which exist in Spanish too. Nothing goes to `main` until the user asks for a production release.

## Audit of the live site (2026-10-12, `main`, English only)

| Finding | Severity | Fixed here |
|---|---|---|
| Visitors and crawlers are redirected to `www.noelsajor.com`, but every canonical, `og:url`, sitemap `<loc>` and `Sitemap:` line said `noelsajor.com`. Google sees two hosts per page and may pick the apex as canonical while the content lives on `www`. | High | Yes: `siteConfig.siteUrl` and `author.url` are now `https://www.noelsajor.com`; everything derives from them. `robots.txt` also emits `Host:`. |
| JSON-LD was two thin nodes (`Person` with name/url/jobTitle/sameAs, `WebSite` with name/url/description), not linked by `@id`, repeated per page. No `inLanguage`, no services, no page or article nodes, no breadcrumbs, no FAQ schema. | High | Yes: see "Structured data" below. |
| The brand name on the site is `Jose Leon` while the domain, email and every profile are `noelsajor`. Nothing told machines these are the same entity. | Medium | Yes: `Person.alternateName = "noelsajor"` plus `sameAs` and `email`. |
| No explicit robots rules for AI crawlers. They were allowed by the wildcard, but nothing recorded that as intentional. | Low | Yes: explicit allow for 14 documented AI user agents in `src/app/robots.ts`. |
| No `/llms.txt`. | Low | Yes: `src/app/llms.txt/route.ts`, built from the content modules. |
| No short, quotable "who is this / what do they do / how do I start" answers. Pages explain the offer well in prose, but AI engines prefer self-contained Q&A they can lift verbatim. | Medium | Yes: home FAQ (5 Q&A, EN/ES) and About "At a glance" facts list (6 pairs, EN/ES), both also in JSON-LD. |
| Metadata (titles, descriptions, OG/Twitter, robots index/follow, sitemap, hreflang, x-default, `og:locale`) | Already correct on `dev` | No change. |

## Structured data

All builders live in `src/lib/structured-data.ts`; the route glue (localized URLs, breadcrumbs) in `src/lib/page-schema.ts`; one `<JsonLd nodes={[...]} />` per page renders a single `@graph`.

Two site-wide nodes, rendered by `SiteShell` on every page, referenced everywhere else by `@id`:

- `Person` `https://www.noelsajor.com/#person`: name, `alternateName` (handle), url, email, `jobTitle` (resume title, localized), `description` (first About paragraph, localized), `knowsAbout` (from `siteConfig.knowsAbout`, tool/discipline names kept in English in both locales per the style guide), `knowsLanguage` `["en","es"]`, `sameAs`, and `hasOfferCatalog` with one `Service` per home-page service item (localized).
- `WebSite` `https://www.noelsajor.com/#website`: name, url, description (home metadata description, localized), `inLanguage`, `publisher` -> Person.

Per page:

| Route | Nodes |
|---|---|
| `/` | `ProfilePage` (mainEntity -> Person), `FAQPage` (5 items from `homeContent.faq`) |
| `/about` | `ProfilePage` (mainEntity -> Person), breadcrumb |
| `/resume` | `ProfilePage` (mainEntity -> Person), breadcrumb |
| `/contact` | `ContactPage`, breadcrumb |
| `/work` | `CollectionPage`, breadcrumb, `ItemList` of every published case study in that locale |
| `/for-agencies` | `WebPage`, breadcrumb, `FAQPage` (the page's existing 4 items) |
| `/work/[slug]` | `WebPage` with Home > Work > Title breadcrumb and `dateModified` (only when `updatedAt` is set), `Article` (headline, description, image from `coverImage`, `keywords` from `services` + `capabilities`, `about` from `industry`, author/publisher -> Person) |

Rules that keep it honest, enforced by construction:

1. Every value is read from a content module, frontmatter or `siteConfig`, so the graph cannot claim anything the visitor can't read on the page, and Spanish copy localizes it automatically.
2. Only verified profiles in `sameAs`; only skills the resume lists in `knowsAbout`.
3. No `address`, `areaServed`, `aggregateRating`, `Review` or `LocalBusiness`. The site does not state a location, testimonials are not turned into self-serving `Review` markup (Google ignores or penalizes that), and a freelancer without a stated physical address is not a `LocalBusiness`.

## GEO content

- `homeContent.faq` (EN/ES): five answers written to stand alone when quoted out of context, built only from facts already on the site (trust strip, resume skills, About paragraphs). Rendered by the existing `LandingFaq` component between "Why me" and the final CTA.
- `aboutContent.facts` (EN/ES): six label/value pairs rendered as a `<dl>` under the About paragraphs ("Role", "Focus", "Works with", "Collaboration", "Languages", "Experience").
- `/llms.txt`: per llmstxt.org. Header with name, tagline, email, profiles and sitemap; then one section per indexable locale with the home description, the About paragraphs, the facts list, the six pages with their meta descriptions, the four services, every published case study with its `seoDescription`, and all FAQ items. Regenerated at build time from the same modules; never hand-edit.
- `robots.txt`: explicit `Allow: /` + `Disallow: /api/` for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, meta-externalagent, Amazonbot, DuckAssistBot and CCBot. Same policy as the wildcard; it exists so a future "block bots" change can't silently drop the site from AI answers.

Spanish copy in this PR follows `docs/es-style-guide.md` (tú profesional, no em dashes, sentence case, brand names unchanged) and needs the usual editorial sign-off by the user before merge.

## How to verify (done for this PR, repeat after any change)

```bash
pnpm run verify
PORT=3123 pnpm start &
curl -s localhost:3123/robots.txt
curl -s localhost:3123/sitemap.xml | grep -c "<loc>"           # 26 = 13 pages x 2 locales
curl -s localhost:3123/llms.txt | grep -n "^## \|^### "
curl -s localhost:3123/es/about | grep -o '<link rel="alternate"[^>]*>'
curl -s localhost:3123/es/work/brand-website-build | grep -o '<script type="application/ld+json">.*</script>'
```

Results on this branch: `verify` green; no `https://noelsajor.com` (apex) string anywhere in rendered HTML, sitemap or llms.txt; every `/es` route has `<html lang="es">`, `inLanguage: "es"` on WebSite/WebPage/Article/FAQPage nodes, Spanish breadcrumb names (`Inicio`, `Sobre mí`, `Proyectos`, `CV`, `Para agencias`) and `og:locale` `es_US`.

External validators to run against the Vercel preview URL (they need a public URL):

- Google Rich Results Test: https://search.google.com/test/rich-results (expect Breadcrumbs, FAQ, Article, Profile page detected; FAQ rich results themselves are restricted by Google to government/health sites since 2023, the markup still feeds AI Overviews and other engines).
- Schema Markup Validator: https://validator.schema.org (expect zero errors; `ProfilePage` warnings about missing `dateCreated` are acceptable).

## After `dev` -> `main` (production), in this order

1. Vercel: confirm `noelsajor.com` is set to redirect to `www.noelsajor.com` (it already does today) and that `www` is the primary domain on the project.
2. Google Search Console: the property should be the Domain property `noelsajor.com` (covers apex, www, `/en`, `/es`). If only a URL-prefix property for the apex exists, add the Domain property.
3. Search Console: submit `https://www.noelsajor.com/sitemap.xml`; remove any old apex sitemap submission.
4. Search Console: URL inspection + "Request indexing" for `/en`, `/es`, `/en/for-agencies`, `/es/for-agencies`, `/en/about`, `/es/about`.
5. Bing Webmaster Tools: add the site (import from Search Console), submit the sitemap. Bing's index is what ChatGPT search and several other engines read.
6. Re-run the Rich Results Test on the production URLs of `/en`, `/es`, one case study per language.
7. Two to four weeks later, in Search Console > Performance, filter by page `/es/` to confirm Spanish impressions; in Indexing > Pages, confirm no "Duplicate, Google chose different canonical" entries for apex URLs.

## Deliberately not done (candidates for a later pass)

- Location. The site never states where Jose is based. Adding a city/country (`Person.address` or `homeLocation`, plus a line in About) helps "freelance Shopify developer in <place>" queries and local entity disambiguation, but it is a personal disclosure decision, not a technical one.
- A real headshot as `Person.image` (Google's Knowledge Panel and ProfilePage guidance both want one). Needs an approved asset.
- Per-locale OG image (`og-image.png` is English-only; see Slice 2 open decisions).
- `Review`/`aggregateRating` from the testimonials section: not added on purpose (see rule 3 above).
- `hreflang` for a Spain-specific variant (`es-ES`): the audience decision is `es_US`; a single `es` tag is correct for that.
