import type { Metadata } from 'next'
import Image from 'next/image'
import { buildPageMetadata } from '@/lib/site-config'
import { aboutContent as aboutContentEn } from '@/content/en/static-pages'
import { aboutContent as aboutContentEs } from '@/content/es/static-pages'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { JsonLd } from '@/components/JsonLd'
import { buildPageNode } from '@/lib/page-schema'
import { FeaturedWorkSection } from '@/components/home/FeaturedWorkSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { FinalCTASection } from '@/components/home/FinalCTASection'

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
    const { metadata } = aboutContent

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
        <div className="page-sections">
            <JsonLd nodes={jsonLd} />
            {/* Heading / portrait / paragraphs, in that DOM order. On mobile they
                stack that way, so the face arrives right after the heading rather
                than below four paragraphs. On md+ the explicit row and column
                placement puts heading and paragraphs in the left column and runs
                the portrait down the right. Grayscale is applied in CSS, not baked
                into the file, so the Person node in the JSON-LD still serves a
                colour photo, which is what a knowledge panel wants. */}
            <div className="grid gap-6 md:grid-cols-[1fr_20rem] md:items-start md:gap-10">
                <h1 className="text-3xl font-semibold tracking-tight md:col-start-1 md:row-start-1 md:text-4xl">
                    {aboutContent.heading}
                </h1>
                <Image
                    src="/images/noelsajor-portrait.webp"
                    alt={aboutContent.portraitAlt}
                    width={1200}
                    height={1500}
                    priority
                    className="h-auto w-full max-w-[20rem] rounded-2xl border border-white/10 grayscale md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-none"
                />
                <div className="space-y-6 md:col-start-1 md:row-start-2">
                    {aboutContent.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="max-w-2xl text-white/70">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>

            {/* The conversion path the home uses, reused: proof, social proof, next step.
                The En resumen facts block is gone from the UI; aboutContent.facts stays
                in the content module because llms.txt still serves it to crawlers. */}
            <FeaturedWorkSection lang={lang} />
            <TestimonialsSection lang={lang} />
            <FinalCTASection lang={lang} />
        </div>
    )
}
