import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/site-config'
import { forAgenciesContent as forAgenciesContentEn } from '@/content/en/for-agencies'
import { forAgenciesContent as forAgenciesContentEs } from '@/content/es/for-agencies'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { LandingHero } from '@/components/landing/LandingHero'
import { LandingFeatureList } from '@/components/landing/LandingFeatureList'
import { LandingProof } from '@/components/landing/LandingProof'
import { LandingTextBlock } from '@/components/landing/LandingTextBlock'
import { LandingFaq } from '@/components/landing/LandingFaq'
import { LandingCta } from '@/components/landing/LandingCta'
import { JsonLd } from '@/components/JsonLd'
import { buildPageNode, localizedAbsoluteUrl } from '@/lib/page-schema'
import { buildFaqSchema } from '@/lib/structured-data'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    const { metadata } = lang === 'es' ? forAgenciesContentEs : forAgenciesContentEn

    return buildPageMetadata({ ...metadata, path: '/for-agencies', lang })
}

export default async function ForAgenciesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const forAgenciesContent = lang === 'es' ? forAgenciesContentEs : forAgenciesContentEn
    const { metadata, hero, problems, services, process, proof, assurance, faq, cta } = forAgenciesContent

    // The page's own FAQ (4 items) as FAQPage — per docs/best-practices/
    // 01-seo-geo-guidelines.md ("more than 3 FAQs").
    const jsonLd = [
        buildPageNode({
            lang,
            path: '/for-agencies',
            title: metadata.title,
            description: metadata.description,
            trail: [{ name: metadata.title, path: '/for-agencies' }]
        }),
        buildFaqSchema({ lang, url: localizedAbsoluteUrl(lang, '/for-agencies'), items: faq.items })
    ]

    return (
        <div className="page-sections">
            <JsonLd nodes={jsonLd} />
            <LandingHero lang={lang} {...hero} />
            <LandingFeatureList label={problems.label} heading={problems.heading} items={problems.items} />
            <LandingFeatureList label={services.label} heading={services.heading} items={services.items} />
            <LandingProof lang={lang} heading={proof.heading} />
            <LandingFeatureList label={process.label} heading={process.heading} items={process.steps} numbered />
            <LandingTextBlock heading={assurance.heading} body={assurance.body} />
            <LandingFaq heading={faq.heading} items={faq.items} />
            <LandingCta lang={lang} {...cta} />
        </div>
    )
}
