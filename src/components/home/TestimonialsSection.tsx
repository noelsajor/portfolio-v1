import { Quote } from 'lucide-react'
import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import type { Locale } from '@/lib/i18n'

// ~18s per card, so the pace stays steady as reviews are added. Literal
// classes (not a template string) so Tailwind's scanner emits them; counts
// beyond the map reuse the slowest entry.
const MARQUEE_DURATION: Record<number, string> = {
    2: '[animation-duration:36s]',
    3: '[animation-duration:54s]',
    4: '[animation-duration:72s]',
    5: '[animation-duration:90s]',
    6: '[animation-duration:108s]',
    7: '[animation-duration:126s]',
    8: '[animation-duration:144s]'
}

function Cards({ items }: { items: ReadonlyArray<{ readonly quote: string; readonly name: string; readonly role: string }> }) {
    return (
        <>
            {items.map((item) => (
                <li
                    key={item.name}
                    className="flex w-[19rem] flex-none flex-col gap-4 rounded-2xl border border-white/10 bg-black p-5 md:w-[26rem]"
                >
                    <Quote aria-hidden="true" className="h-5 w-5 text-white/40" />
                    <blockquote className="flex-1 text-sm leading-relaxed text-white/70">{item.quote}</blockquote>
                    <footer className="border-t border-white/10 pt-4">
                        <p className="text-sm font-semibold text-white">{item.name}</p>
                        <p className="text-sm text-white/55">{item.role}</p>
                    </footer>
                </li>
            ))}
        </>
    )
}

// Client testimonials from LinkedIn recommendations. The row drifts right-to-left in a
// seamless loop: the cards render twice (second copy aria-hidden) and the
// track slides by half its width; CSS lives in globals.css (.marquee-*),
// since the CSP rules out inline styles. Hover pauses it, and with reduced
// motion the row becomes a plain hand-scrollable list.
export function TestimonialsSection({ lang }: { lang: Locale }) {
    const homeContent = lang === 'es' ? homeContentEs : homeContentEn
    const { testimonials } = homeContent
    const duration = MARQUEE_DURATION[Math.min(Math.max(testimonials.items.length, 2), 8)]

    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{testimonials.heading}</h2>

            <div className="marquee -mx-4 overflow-hidden px-4 [mask-image:linear-gradient(to_right,transparent,black_3rem,black_calc(100%-3rem),transparent)] md:mx-0 md:px-0">
                {/* No gap on the track: each copy carries its own trailing pr-4, so each spans exactly half and the -50% jump is invisible. */}
                <div className={`marquee-track flex w-max ${duration}`}>
                    <ul role="list" className="flex gap-4 pr-4">
                        <Cards items={testimonials.items} />
                    </ul>
                    {/* Second copy makes the loop seamless; hidden from assistive tech. */}
                    <ul aria-hidden="true" className="marquee-clone flex gap-4 pr-4">
                        <Cards items={testimonials.items} />
                    </ul>
                </div>
            </div>

        </section>
    )
}
