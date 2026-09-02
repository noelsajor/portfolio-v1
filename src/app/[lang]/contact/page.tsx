import Link from 'next/link'
import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { buildPageMetadata, siteConfig } from '@/lib/site-config'
import { contactContent as contactContentEn } from '@/content/en/static-pages'
import { contactContent as contactContentEs } from '@/content/es/static-pages'
import { DEFAULT_LOCALE, isLocale, localizedPath } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    return buildPageMetadata({
        title: 'Contact',
        description:
            'Tell me what your team is building. Get in touch about freelance projects, agency production support, Shopify work, or front-end implementation.',
        path: '/contact',
        lang
    })
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const contactContent = lang === 'es' ? contactContentEs : contactContentEn

    return (
        <div className="space-y-12">
            <div className="space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{contactContent.heading}</h1>
                <p className="max-w-2xl text-white/70">{contactContent.intro}</p>
                {/* PR 5: contains inline interactive elements — left as JSX; localize in place when real Spanish copy lands */}
                <p className="max-w-2xl text-sm text-white/50">
                    Recruiter or hiring manager? See my{' '}
                    <Link
                        href={localizedPath(lang, '/resume')}
                        className="rounded-sm underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                        resume
                    </Link>{' '}
                    instead.
                </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
                <ContactForm lang={lang} />

                {/* PR 5: address links carry data-tracking attributes — left as JSX; localize in place when real Spanish copy lands */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold">{contactContent.otherChannelsHeading}</h2>
                    <address className="not-italic space-y-3">
                        <Link
                            className="block text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
                            href={`mailto:${siteConfig.email}`}
                            data-tracking="contact_email_link"
                        >
                            {siteConfig.email}
                        </Link>
                        <Link
                            className="block text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
                            href={siteConfig.sameAs.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tracking="contact_linkedin_link"
                        >
                            LinkedIn
                        </Link>
                    </address>
                </div>
            </div>
        </div>
    )
}
