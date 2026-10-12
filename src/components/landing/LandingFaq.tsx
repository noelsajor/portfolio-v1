import { ChevronDown } from 'lucide-react'

// Accordion built on native <details>/<summary>: no client JS, keyboard and
// screen-reader behaviour for free, and the answer text stays in the
// server-rendered HTML (the FAQPage JSON-LD mirrors the same items). The
// first item is open by default; the rest start collapsed.
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
            <div className="divide-y divide-white/10 border-t border-white/10">
                {items.map((item, index) => (
                    <details key={item.question} open={index === 0} className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-semibold text-white [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm">
                            <span>{item.question}</span>
                            <ChevronDown
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-white/50 transition-transform duration-200 group-open:rotate-180"
                            />
                        </summary>
                        <p className="pb-6 text-sm leading-relaxed text-white/70">{item.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    )
}
