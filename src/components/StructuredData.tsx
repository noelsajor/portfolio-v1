import { siteConfig } from '@/lib/site-config'

// Person + WebSite JSON-LD. sameAs only lists profiles that are verified
// real — never invent an account to fill out the schema.
export function StructuredData() {
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.author.name,
        url: siteConfig.siteUrl,
        jobTitle: 'Multidisciplinary Designer & Front-End Production Specialist',
        sameAs: Object.values(siteConfig.sameAs)
    }

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        description: siteConfig.description
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
