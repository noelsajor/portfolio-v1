import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/site-config'
import { aboutContent as aboutContentEn } from '@/content/en/static-pages'
import { aboutContent as aboutContentEs } from '@/content/es/static-pages'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { JsonLd } from '@/components/JsonLd'
import { buildPageNode } from '@/lib/page-schema'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    const { metadata } = lang === 'es' ? aboutContentEs : aboutContentEn

    return buildPageMetadata({ ...metadata, path: '/about', lang })
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const aboutContent = lang === 'es' ? aboutContentEs : aboutContentEn
    const { metadata, facts } = aboutContent

    // ProfilePage (Google's documented type for an "about the author" page)
    // whose mainEntity is the site-wide Person node from SiteShell.
    const jsonLd = [
        buildPageNode({
            lang,
            path: '/about',
            title: metadata.title,
            description: metadata.description,
            profile: true,
            trail: [{ name: metadata.title, path: '/about' }]
        })
    ]

    return (
        <div className="space-y-10">
            <JsonLd nodes={jsonLd} />
            <div className="space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{aboutContent.heading}</h1>
                {aboutContent.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="max-w-2xl text-white/70">
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* GEO block: the same facts as the prose, as label/value pairs
                (see aboutContent.facts). A definition list so the pairing is
                explicit in the markup, not only visually. */}
            <section aria-labelledby="about-facts-heading" className="space-y-4">
                <h2 id="about-facts-heading" className="text-xl font-semibold tracking-tight md:text-2xl">
                    {facts.heading}
                </h2>
                <dl className="grid gap-x-8 gap-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:grid-cols-2 md:p-6">
                    {facts.items.map((item) => (
                        <div key={item.label} className="space-y-1">
                            <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">{item.label}</dt>
                            <dd className="text-sm text-white/80">{item.value}</dd>
                        </div>
                    ))}
                </dl>
            </section>
        </div>
    )
}
