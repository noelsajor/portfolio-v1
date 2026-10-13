import Link from 'next/link'
import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { buildPageMetadata } from '@/lib/site-config'
import { contactContent as contactContentEn } from '@/content/en/static-pages'
import { contactContent as contactContentEs } from '@/content/es/static-pages'
import { DEFAULT_LOCALE, isLocale, localizedPath } from '@/lib/i18n'
import { getUiContent } from '@/lib/ui-content'
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
    const { contactPage } = getUiContent(lang)
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
                {/* PR 11: sentence split around the inline <Link> so each locale can word it freely (see uiContent.contactPage) */}
                <p className="max-w-2xl text-sm text-white/50">
                    {contactPage.recruiterPrefix}
                    <Link
                        href={localizedPath(lang, '/resume')}
                        className="rounded-sm underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                        {contactPage.recruiterLink}
                    </Link>
                    {contactPage.recruiterSuffix}
                </p>
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
