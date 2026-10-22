import Link from 'next/link'
import { localizedPath, type Locale } from '@/lib/i18n'

export function LandingCta({
    lang,
    heading,
    body,
    primaryCta
}: {
    lang: Locale
    heading: string
    body: string
    primaryCta: { label: string; href: string }
}) {
    return (
        <section className="space-y-6 border-t border-white/10 pt-12 text-center">
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">{heading}</h2>
            <p className="mx-auto max-w-xl text-white/70">{body}</p>
            <Link
                href={localizedPath(lang, primaryCta.href)}
                data-tracking="landing_cta_discuss_project"
                className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
                {primaryCta.label}
            </Link>
        </section>
    )
}
