import { Search, PenTool, Code2, Sparkles, type LucideIcon } from 'lucide-react'
import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import type { Locale } from '@/lib/i18n'

const STEP_ICONS: Record<string, LucideIcon> = {
    Understand: Search,
    Design: PenTool,
    Implement: Code2,
    Refine: Sparkles
}

export function ProcessSection({ lang }: { lang: Locale }) {
    const homeContent = lang === 'es' ? homeContentEs : homeContentEn
    const { process } = homeContent

    return (
        <section className="space-y-8">
            <div className="space-y-4">
                {process.label ? <p className="text-sm font-semibold tracking-wide text-white/70">{process.label}</p> : null}
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{process.heading}</h2>
            </div>

            {/* md+: a 3-row grid (cards above / connector row / cards below) that every step
                subgrids into. Both outer rows are 1fr, so they share the height of the tallest
                card and the horizontal line at 50% always runs through the connector row; the
                section grows with its content instead of relying on a fixed height. */}
            <div className="relative">
                <span aria-hidden="true" className="absolute bottom-0 left-0.5 top-0 w-px bg-white/15 md:hidden" />
                <span aria-hidden="true" className="absolute left-0 top-1/2 hidden h-px w-full bg-white/15 md:block" />

                <ol role="list" className="relative space-y-6 md:grid md:grid-cols-4 md:grid-rows-[1fr_8rem_1fr] md:space-y-0">
                    {process.steps.map((step, index) => {
                        const Icon = STEP_ICONS[step.title]
                        const isTopStep = index % 2 === 0

                        return (
                            <li key={step.number} className="relative pl-5 md:row-span-3 md:grid md:grid-rows-subgrid md:px-3">
                                <span
                                    aria-hidden="true"
                                    className="absolute left-0.5 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white/70 md:hidden"
                                />
                                <span aria-hidden="true" className="relative hidden md:row-start-2 md:block">
                                    <span className="absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
                                    <span className={`absolute left-1/2 h-16 w-px -translate-x-1/2 bg-white/20 ${isTopStep ? 'top-0' : 'bottom-0'}`} />
                                </span>

                                <article
                                    className={`space-y-3 rounded-2xl border border-white/10 bg-black p-5 ${
                                        isTopStep ? 'md:row-start-1 md:self-end' : 'md:row-start-3 md:self-start'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold tracking-widest text-white/40">{step.number}</span>
                                        {Icon ? <Icon aria-hidden="true" className="h-5 w-5 text-white/70" /> : null}
                                    </div>
                                    <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                                    <p className="text-sm leading-relaxed text-white/70">{step.description}</p>
                                </article>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}
