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
                <p className="text-sm font-semibold tracking-wide text-white/70">{process.label}</p>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{process.heading}</h2>
            </div>

            <div className="relative">
                <span aria-hidden="true" className="absolute bottom-0 left-0.5 top-0 w-px bg-white/15 md:hidden" />
                <span aria-hidden="true" className="absolute left-0 top-1/2 hidden h-px w-full bg-white/15 md:block" />

                <ol role="list" className="relative space-y-6 md:grid md:min-h-[34rem] md:grid-cols-4 md:space-y-0">
                    {process.steps.map((step, index) => {
                        const Icon = STEP_ICONS[step.title]
                        const isTopStep = index % 2 === 0

                        return (
                            <li
                                key={step.number}
                                className="relative pl-5 md:min-h-[34rem] md:px-3 md:pl-0"
                            >
                                <span aria-hidden="true" className="absolute left-0.5 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white/70 md:left-1/2 md:top-1/2 md:z-10 md:h-3 md:w-3 md:-translate-x-1/2 md:-translate-y-1/2" />
                                <span
                                    aria-hidden="true"
                                    className={`absolute left-1/2 hidden h-16 w-px -translate-x-1/2 bg-white/20 md:block ${
                                        isTopStep ? 'top-1/2 -translate-y-full' : 'top-1/2'
                                    }`}
                                />

                                <article
                                    className={`space-y-3 rounded-2xl border border-white/10 bg-black p-5 md:absolute md:left-3 md:right-3 ${
                                        isTopStep ? 'md:bottom-[calc(50%+4rem)]' : 'md:top-[calc(50%+4rem)]'
                                    }`}
                                >
                                    <div className="flex items-center">
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
