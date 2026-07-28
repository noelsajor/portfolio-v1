export function LandingTextBlock({ heading, body }: { heading: string; body: string }) {
    return (
        <section className="space-y-4 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{heading}</h2>
            <p className="max-w-2xl text-white/70">{body}</p>
        </section>
    )
}
