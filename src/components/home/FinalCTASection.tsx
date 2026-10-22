import Link from 'next/link'
import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import { localizedPath, type Locale } from '@/lib/i18n'

export function FinalCTASection({ lang }: { lang: Locale }) {
    const homeContent = lang === 'es' ? homeContentEs : homeContentEn
    const { finalCTA } = homeContent

    return (
        // Raised panel so the closing CTA reads as its own moment: a soft
        // radial glow over white/5, inside the usual card border. Colors stay
        // in the site's white-on-black language.
        <section className="space-y-6 rounded-2xl border border-white/10 bg-white/5 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)] px-6 py-16 text-center md:py-20">
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">{finalCTA.heading}</h2>
            <p className="mx-auto max-w-xl text-white/70">{finalCTA.body}</p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                    href={localizedPath(lang, finalCTA.primaryCta.href)}
                    data-tracking="final_cta_discuss_project"
                    className="inline-flex w-fit items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                >
                    {finalCTA.primaryCta.label}
                </Link>
                {finalCTA.secondaryLink.label ? (
                    <Link
                        href={localizedPath(lang, finalCTA.secondaryLink.href)}
                        data-tracking="final_cta_email"
                        className="text-sm font-semibold text-white/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                        {finalCTA.secondaryLink.label}
                    </Link>
                ) : null}
            </div>
        </section>
    )
}
