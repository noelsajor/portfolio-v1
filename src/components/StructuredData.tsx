import { siteConfig } from '@/lib/site-config'
import type { Locale } from '@/lib/i18n'
import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import { resumeContent as resumeContentEn } from '@/content/en/static-pages'
import { resumeContent as resumeContentEs } from '@/content/es/static-pages'

// PR 4: `WebSite.description` and `Person.jobTitle` are the fields Phase 8
// (docs/bilingual-seo-migration-plan.md) calls out as genuinely locale-
// specific — both are rendered from page-visible text elsewhere on the
// site. PR 11: they now read that text from the content modules themselves
// (home metadata description, resume title) instead of a parallel copy, so
// the Spanish copy PRs localize JSON-LD for free.
const localizedDescription: Record<Locale, string> = {
    en: homeContentEn.metadata.description,
    es: homeContentEs.metadata.description
}

const localizedJobTitle: Record<Locale, string> = {
    en: resumeContentEn.title,
    es: resumeContentEs.title
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
