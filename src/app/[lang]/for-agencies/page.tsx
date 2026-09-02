import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/site-config'
import { forAgenciesContent } from '@/content/for-agencies'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { LandingHero } from '@/components/landing/LandingHero'
import { LandingFeatureList } from '@/components/landing/LandingFeatureList'
import { LandingProof } from '@/components/landing/LandingProof'
import { LandingTextBlock } from '@/components/landing/LandingTextBlock'
import { LandingFaq } from '@/components/landing/LandingFaq'
import { LandingCta } from '@/components/landing/LandingCta'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    return buildPageMetadata({
        title: 'For Agencies',
        description:
            'White-label design, Shopify, and front-end production support for agencies with more work than available capacity.',
        path: '/for-agencies',
        lang
    })
}

export default async function ForAgenciesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const { hero, problems, services, process, assurance, faq, cta } = forAgenciesContent

    return (
        <div className="space-y-16">
            <LandingHero lang={lang} {...hero} />
            <LandingFeatureList label={problems.label} heading={problems.heading} items={problems.items} />
            <LandingFeatureList label={services.label} heading={services.heading} items={services.items} />
            <LandingProof lang={lang} heading="Selected proof" />
            <LandingFeatureList label={process.label} heading={process.heading} items={process.steps} numbered />
            <LandingTextBlock heading={assurance.heading} body={assurance.body} />
            <LandingFaq heading={faq.heading} items={faq.items} />
            <LandingCta lang={lang} {...cta} />
        </div>
    )
}
