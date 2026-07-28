export function LandingFeatureList({
    label,
    heading,
    items,
    numbered = false
}: {
    label: string
    heading: string
    items: readonly { number?: string; title: string; description: string }[]
    numbered?: boolean
}) {
    const ListTag = numbered ? 'ol' : 'ul'

    return (
        <section className="space-y-8">
            <div className="space-y-4">
                <p className="text-sm font-semibold tracking-wide text-white/70">{label}</p>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{heading}</h2>
            </div>

            <ListTag role="list" className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                {items.map((item) => (
                    <li key={item.title} className="space-y-2 border-t border-white/10 pt-6">
                        {numbered && item.number ? <p className="text-sm font-semibold text-white/50">{item.number}</p> : null}
                        <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
                    </li>
                ))}
            </ListTag>
        </section>
    )
}
