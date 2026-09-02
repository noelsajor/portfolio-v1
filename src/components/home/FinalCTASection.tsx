import Link from 'next/link'
import { homeContent } from '@/content/home'
import { localizedPath, type Locale } from '@/lib/i18n'

export function FinalCTASection({ lang }: { lang: Locale }) {
    const { finalCTA } = homeContent

    return (
        <section className="space-y-6 text-center">
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">{finalCTA.heading}</h2>
            <p className="mx-auto max-w-xl text-white/70">{finalCTA.body}</p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                    href={localizedPath(lang, finalCTA.primaryCta.href)}
                    data-tracking="final_cta_discuss_project"
                    className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                    {finalCTA.primaryCta.label}
                </Link>
                <Link
                    href={localizedPath(lang, finalCTA.secondaryLink.href)}
                    data-tracking="final_cta_email"
                    className="text-sm font-semibold text-white/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                    {finalCTA.secondaryLink.label}
                </Link>
            </div>
        </section>
    )
}
