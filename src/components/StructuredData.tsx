import type { Locale } from '@/lib/i18n'
import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import { aboutContent as aboutContentEn, resumeContent as resumeContentEn } from '@/content/en/static-pages'
import { aboutContent as aboutContentEs, resumeContent as resumeContentEs } from '@/content/es/static-pages'
import { buildPersonSchema, buildWebSiteSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/JsonLd'

// Site-wide JSON-LD: the Person and WebSite nodes, rendered by SiteShell on
// every page in both locales. Everything locale-specific is read from the
// content modules the visitor already sees (PR 11 pattern) — home metadata
// description for WebSite.description, the resume title for
// Person.jobTitle, the first About paragraph for Person.description and
// the home services list for Person.hasOfferCatalog — so the Spanish copy
// PRs localize the entity for free and the graph can never say something
// the page doesn't.
//
// Page-level nodes (WebPage/ProfilePage, FAQPage, Article, ItemList) are
// emitted by each page through <JsonLd /> and link back to these two by
// `@id` (PERSON_ID / WEBSITE_ID in src/lib/structured-data.ts).
const CONTENT: Record<
    Locale,
    { description: string; jobTitle: string; bio: string; services: readonly { title: string; description: string }[] }
> = {
    en: {
        description: homeContentEn.metadata.description,
        jobTitle: resumeContentEn.title,
        bio: aboutContentEn.paragraphs[0],
        services: homeContentEn.services.items
    },
    es: {
        description: homeContentEs.metadata.description,
        jobTitle: resumeContentEs.title,
        bio: aboutContentEs.paragraphs[0],
        services: homeContentEs.services.items
    }
}

export function StructuredData({ lang }: { lang: Locale }) {
    const { description, jobTitle, bio, services } = CONTENT[lang]

    return (
        <JsonLd
            nodes={[
                buildPersonSchema({ lang, jobTitle, description: bio, services }),
                buildWebSiteSchema({ lang, description })
            ]}
        />
    )
}
