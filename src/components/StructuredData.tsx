import { siteConfig } from '@/lib/site-config'
import type { Locale } from '@/lib/i18n'

// PR 4: `WebSite.description` and `Person.jobTitle` are the fields Phase 8
// (docs/bilingual-seo-migration-plan.md) calls out as genuinely locale-
// specific — both are rendered from page-visible text elsewhere on the
// site. Real Spanish copy lands in PR 5; until then both locales read the
// same English string on purpose (do not invent Spanish copy here) so this
// lookup only needs its `es` values swapped once that content exists.
const localizedDescription: Record<Locale, string> = {
    en: siteConfig.description,
    es: siteConfig.description
}

const localizedJobTitle: Record<Locale, string> = {
    en: 'Multidisciplinary Designer & Front-End Production Specialist',
    es: 'Multidisciplinary Designer & Front-End Production Specialist'
}

// Person + WebSite JSON-LD. sameAs only lists profiles that are verified
// real — never invent an account to fill out the schema.
export function StructuredData({ lang }: { lang: Locale }) {
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.author.name,
        url: siteConfig.siteUrl,
        jobTitle: localizedJobTitle[lang],
        sameAs: Object.values(siteConfig.sameAs)
    }

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        description: localizedDescription[lang]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    )
}
