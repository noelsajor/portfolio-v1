import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/site-config'
import { aboutContent as aboutContentEn } from '@/content/en/static-pages'
import { aboutContent as aboutContentEs } from '@/content/es/static-pages'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    return buildPageMetadata({
        title: 'About',
        description:
            'Multidisciplinary designer and front-end production specialist — product design, UI/UX, Shopify, and front-end implementation.',
        path: '/about',
        lang
    })
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const aboutContent = lang === 'es' ? aboutContentEs : aboutContentEn

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{aboutContent.heading}</h1>
            {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-2xl text-white/70">
                    {paragraph}
                </p>
            ))}
        </div>
    )
}
