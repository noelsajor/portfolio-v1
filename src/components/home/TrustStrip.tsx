import { homeContent } from '@/content/home'

export function TrustStrip() {
    const { points } = homeContent.trustStrip

    return (
        <section aria-label="Experience summary" className="border-y border-white/10 py-6">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-center text-sm text-white/70">
                {points.map((point) => (
                    <li key={point}>{point}</li>
                ))}
            </ul>
        </section>
    )
}
