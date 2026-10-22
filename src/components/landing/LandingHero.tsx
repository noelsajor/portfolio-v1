import Link from 'next/link'
import { localizedPath, type Locale } from '@/lib/i18n'

export function LandingHero({
    lang,
    eyebrow,
    headline,
    body,
    primaryCta
}: {
    lang: Locale
    eyebrow: string
    headline: string
    body: string
    primaryCta: { label: string; href: string }
}) {
    return (
        <section className="space-y-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">{eyebrow}</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{headline}</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/70">{body}</p>
            <Link
                href={localizedPath(lang, primaryCta.href)}
                data-tracking="landing_hero_cta"
                className="inline-flex w-fit items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
            >
                {primaryCta.label}
            </Link>
        </section>
    )
}
