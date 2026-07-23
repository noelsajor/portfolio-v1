import { homeContent } from '@/content/home'

export function ProcessSection() {
    const { process } = homeContent

    return (
        <section className="space-y-8">
            <div className="space-y-4">
                <p className="text-sm font-semibold tracking-wide text-white/70">{process.label}</p>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{process.heading}</h2>
            </div>

            <ol role="list" className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                {process.steps.map((step) => (
                    <li key={step.number} className="space-y-2 border-t border-white/10 pt-6">
                        <p className="text-sm font-semibold text-white/50">{step.number}</p>
                        <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-white/70">{step.description}</p>
                    </li>
                ))}
            </ol>
        </section>
    )
}
