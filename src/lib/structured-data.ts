import { absoluteUrl, defaultOgImage, siteConfig } from '@/lib/site-config'
import type { Locale } from '@/lib/i18n'

// JSON-LD builders. Every node here is written for two readers at once:
// Google's structured-data parser (rich results, entity reconciliation in
// the Knowledge Graph) and the retrieval layer of AI search engines
// (ChatGPT search, Perplexity, Google AI Overviews, Claude), which lean on
// typed, linked entities to answer "who is X and what do they do" without
// guessing. Two rules keep the output trustworthy:
//
// 1. Every value comes from copy the visitor can already read on the page
//    (content modules, frontmatter, siteConfig). Nothing is invented for
//    the schema — if a claim is not on the site, it is not in the graph.
// 2. Stable `@id`s. The Person and WebSite nodes are referenced from every
//    page via `@id` instead of being repeated, so crawlers see ONE Jose
//    Leon entity across /en and /es rather than a near-duplicate per page.
//
// Keep this file free of React: it is also imported by the llms.txt route.

export type JsonLd = Record<string, unknown>

export const PERSON_ID = absoluteUrl('/#person')
export const WEBSITE_ID = absoluteUrl('/#website')

// `inLanguage` takes a BCP 47 tag; the site's locale codes already are one.
function inLanguage(lang: Locale): string {
    return lang
}

export function buildPersonSchema({
    lang,
    jobTitle,
    description,
    services
}: {
    lang: Locale
    jobTitle: string
    description: string
    /** Localized service names/descriptions, rendered as an OfferCatalog so
     *  the entity carries what it sells, not only what it is. */
    services: readonly { title: string; description: string }[]
}): JsonLd {
    return {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: siteConfig.author.name,
        // Both legal forms, so a search for either resolves to this entity
        // instead of splitting the person's authority across two names.
        alternateName: [siteConfig.legalName, 'Jose Leon'],
        url: siteConfig.siteUrl,
        email: `mailto:${siteConfig.email}`,
        jobTitle,
        description,
        knowsAbout: siteConfig.knowsAbout,
        knowsLanguage: siteConfig.knowsLanguage,
        sameAs: Object.values(siteConfig.sameAs),
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: jobTitle,
            inLanguage: inLanguage(lang),
            itemListElement: services.map((service) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: service.title,
                    serviceType: service.title,
                    description: service.description,
                    provider: { '@id': PERSON_ID }
                }
            }))
        }
    }
}

export function buildWebSiteSchema({ lang, description }: { lang: Locale; description: string }): JsonLd {
    return {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        description,
        inLanguage: inLanguage(lang),
        publisher: { '@id': PERSON_ID }
    }
}

export type BreadcrumbItem = { name: string; url: string }

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]): JsonLd {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    }
}

// Schema.org WebPage subtypes Google documents or that carry obvious
// meaning for a retrieval model. `ProfilePage` is the one Google has a
// dedicated structured-data guide for (About / Resume), the rest are
// semantic hints only.
export type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ProfilePage'

export function buildWebPageSchema({
    lang,
    url,
    name,
    description,
    type = 'WebPage',
    breadcrumb,
    mainEntity,
    dateModified
}: {
    lang: Locale
    url: string
    name: string
    description: string
    type?: WebPageType
    breadcrumb?: readonly BreadcrumbItem[]
    /** `{ '@id': PERSON_ID }` for pages whose subject is Jose himself
     *  (home, about, resume) — this is what makes a ProfilePage valid. */
    mainEntity?: JsonLd
    dateModified?: string
}): JsonLd {
    return {
        '@type': type,
        '@id': url,
        url,
        name,
        description,
        inLanguage: inLanguage(lang),
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        primaryImageOfPage: { '@type': 'ImageObject', url: defaultOgImage.url, width: defaultOgImage.width, height: defaultOgImage.height },
        ...(mainEntity ? { mainEntity } : {}),
        ...(dateModified ? { dateModified } : {}),
        ...(breadcrumb ? { breadcrumb: buildBreadcrumbSchema(breadcrumb) } : {})
    }
}

export function buildFaqSchema({
    lang,
    url,
    items
}: {
    lang: Locale
    /** The page the FAQ lives on; the node gets `${url}#faq` as its @id. */
    url: string
    items: readonly { question: string; answer: string }[]
}): JsonLd {
    return {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: inLanguage(lang),
        isPartOf: { '@id': url },
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer }
        }))
    }
}

// Case studies are long-form, authored, dated editorial pages — `Article`
// (per docs/best-practices/01-seo-geo-guidelines.md, which asks for Article
// on MDX case studies). `author` and `publisher` both resolve to the Person
// node: this is a founder-led portfolio, there is no separate organization.
export function buildArticleSchema({
    lang,
    url,
    headline,
    description,
    image,
    dateModified,
    keywords,
    about
}: {
    lang: Locale
    url: string
    headline: string
    description: string
    image?: { url: string; width: number; height: number; alt?: string }
    dateModified?: string
    keywords?: readonly string[]
    /** Free-text subject such as the project's industry. */
    about?: string
}): JsonLd {
    const img = image ?? defaultOgImage
    return {
        '@type': 'Article',
        '@id': `${url}#article`,
        mainEntityOfPage: { '@id': url },
        headline,
        description,
        inLanguage: inLanguage(lang),
        image: { '@type': 'ImageObject', url: img.url, width: img.width, height: img.height },
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
        ...(dateModified ? { dateModified } : {}),
        ...(keywords && keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
        ...(about ? { about: { '@type': 'Thing', name: about } } : {})
    }
}

export function buildItemListSchema({
    name,
    items
}: {
    name: string
    items: readonly { name: string; url: string }[]
}): JsonLd {
    return {
        '@type': 'ItemList',
        name,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: item.url
        }))
    }
}

// One @context, many nodes. Emitting a single `@graph` per page (instead of
// N separate <script> tags) is what lets the `@id` references above resolve
// inside one document.
export function buildGraph(nodes: readonly JsonLd[]): JsonLd {
    return { '@context': 'https://schema.org', '@graph': nodes }
}

// `<` is the only character that can break out of a <script> block;
// escaping it (plus the two JS line terminators JSON allows but scripts
// don't) is the standard safe-serialization for inline JSON-LD. All of the
// data is first-party, so this is defense in depth, not a live threat.
export function serializeJsonLd(data: JsonLd): string {
    return JSON.stringify(data)
        .replace(/</g, '\\u003c')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')
}
