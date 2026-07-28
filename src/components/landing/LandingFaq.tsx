export function LandingFaq({
    heading,
    items
}: {
    heading: string
    items: readonly { question: string; answer: string }[]
}) {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{heading}</h2>
            <dl className="space-y-6">
                {items.map((item) => (
                    <div key={item.question} className="space-y-2 border-t border-white/10 pt-6">
                        <dt className="font-semibold text-white">{item.question}</dt>
                        <dd className="text-sm leading-relaxed text-white/70">{item.answer}</dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}
