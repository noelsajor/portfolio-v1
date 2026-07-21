import Link from 'next/link'
import { homeContent } from '@/content/home'

export function HeroSection() {
    const { hero } = homeContent

    return (
        <section className="space-y-6">
            <p className="text-sm font-semibold tracking-wide text-white/70">{hero.eyebrow}</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {hero.headline.map((line) => (
                    <span key={line} className="block">
                        {line}
                    </span>
                ))}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{hero.supportingText}</p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                    href={hero.primaryCta.href}
                    data-tracking="hero_view_work"
                    className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                    {hero.primaryCta.label}
                </Link>
                <Link
                    href={hero.secondaryCta.href}
                    data-tracking="hero_discuss_project"
                    className="inline-flex w-fit items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                    {hero.secondaryCta.label}
                </Link>
            </div>

            <p className="text-sm text-white/60">{hero.availability}</p>
        </section>
    )
}
