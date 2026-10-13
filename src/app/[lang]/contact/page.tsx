import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { buildPageMetadata } from '@/lib/site-config'
import { contactContent as contactContentEn } from '@/content/en/static-pages'
import { contactContent as contactContentEs } from '@/content/es/static-pages'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { JsonLd } from '@/components/JsonLd'
import { buildPageNode } from '@/lib/page-schema'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    const { metadata } = lang === 'es' ? contactContentEs : contactContentEn

    return buildPageMetadata({ ...metadata, path: '/contact', lang })
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const contactContent = lang === 'es' ? contactContentEs : contactContentEn
    const { metadata } = contactContent
    const jsonLd = [
        buildPageNode({
            lang,
            path: '/contact',
            title: metadata.title,
            description: metadata.description,
            type: 'ContactPage',
            trail: [{ name: metadata.title, path: '/contact' }]
        })
    ]

    return (
        <div className="space-y-12">
            <JsonLd nodes={jsonLd} />
            <div className="space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{contactContent.heading}</h1>
                <p className="max-w-2xl text-white/70">{contactContent.intro}</p>
            </div>

            {/* The form takes the freed width (the Otros canales column is gone;
                email and LinkedIn live in the footer on every page). Capped at
                3xl so single inputs keep a sane line length. */}
            <div className="max-w-3xl">
                <ContactForm lang={lang} />
            </div>
        </div>
    )
}
