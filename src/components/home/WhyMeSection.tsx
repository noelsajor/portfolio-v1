import { homeContent } from '@/content/home'

export function WhyMeSection() {
    const { whyMe } = homeContent

    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{whyMe.heading}</h2>

            <div className="space-y-6">
                {whyMe.reasons.map((reason) => (
                    <div key={reason.title} className="border-l-2 border-white/15 pl-5">
                        <h3 className="text-lg font-semibold tracking-tight">{reason.title}</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/70">{reason.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
