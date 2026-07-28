import { Search, PenTool, Code2, Sparkles, type LucideIcon } from 'lucide-react'
import { homeContent } from '@/content/home'

const STEP_ICONS: Record<string, LucideIcon> = {
    Understand: Search,
    Design: PenTool,
    Implement: Code2,
    Refine: Sparkles
}

export function ProcessSection() {
    const { process } = homeContent

    return (
        <section className="space-y-8">
            <div className="space-y-4">
                <p className="text-sm font-semibold tracking-wide text-white/70">{process.label}</p>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{process.heading}</h2>
            </div>

            <ol role="list" className="grid gap-x-8 gap-y-8 md:grid-cols-2">
                {process.steps.map((step) => {
                    const Icon = STEP_ICONS[step.title]

                    return (
                        <li key={step.number} className="space-y-2">
                            <div className="flex items-center gap-3">
                                {Icon ? <Icon aria-hidden="true" className="h-5 w-5 text-white/70" /> : null}
                                <p className="text-sm font-semibold text-white/50">{step.number}</p>
                            </div>
                            <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-white/70">{step.description}</p>
                        </li>
                    )
                })}
            </ol>
        </section>
    )
}
