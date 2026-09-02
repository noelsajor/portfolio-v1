import Link from 'next/link'
import { homeContent } from '@/content/home'
import { localizedPath, type Locale } from '@/lib/i18n'

export function HeroSection({ lang }: { lang: Locale }) {
    const { hero } = homeContent

    return (
        <section className="space-y-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">{hero.eyebrow}</p>
            <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                {hero.headline.map((line) => (
                    <span key={line} className="block">
                        {line}
                    </span>
                ))}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">{hero.supportingText}</p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                    href={localizedPath(lang, hero.primaryCta.href)}
                    data-tracking="hero_work_with_me"
                    className="inline-flex w-fit items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                >
                    {hero.primaryCta.label}
                </Link>
                <Link
                    href={localizedPath(lang, hero.secondaryCta.href)}
                    data-tracking="hero_view_work"
                    className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                    {hero.secondaryCta.label}
                </Link>
            </div>

            <p className="text-sm text-white/60">{hero.availability}</p>
            <p className="text-sm text-white/50">
                <Link
                    href={localizedPath(lang, hero.recruiterNote.href)}
                    data-tracking="hero_recruiter_note"
                    className="rounded-sm underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                    {hero.recruiterNote.label}
                </Link>
            </p>
        </section>
    )
}
