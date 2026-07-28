import { homeContent } from '@/content/home'

export function WhyMeSection() {
    const { whyMe } = homeContent

    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{whyMe.heading}</h2>

            <ul role="list" className="grid gap-x-8 gap-y-10 md:grid-cols-3">
                {whyMe.reasons.map((reason) => (
                    <li key={reason.title} className="space-y-3">
                        <h3 className="text-lg font-semibold tracking-tight">{reason.title}</h3>
                        <p className="text-sm leading-relaxed text-white/70">{reason.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
