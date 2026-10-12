import { ArrowUpRight, Quote } from 'lucide-react'
import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import { siteConfig } from '@/lib/site-config'
import type { Locale } from '@/lib/i18n'
import { getUiContent } from '@/lib/ui-content'

// Client testimonials, sourced from LinkedIn recommendations (the link
// under the grid points at the originals). Cards use the shared card style.
export function TestimonialsSection({ lang }: { lang: Locale }) {
    const homeContent = lang === 'es' ? homeContentEs : homeContentEn
    const { testimonials } = homeContent
    const { links } = getUiContent(lang)

    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{testimonials.heading}</h2>

            <ul role="list" className="grid gap-4 md:grid-cols-3">
                {testimonials.items.map((item) => (
                    <li key={item.name} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black p-5 transition hover:bg-white/5">
                        <Quote aria-hidden="true" className="h-5 w-5 text-white/40" />
                        <blockquote className="flex-1 text-sm leading-relaxed text-white/70">{item.quote}</blockquote>
                        <footer className="border-t border-white/10 pt-4">
                            <p className="text-sm font-semibold text-white">{item.name}</p>
                            <p className="text-sm text-white/55">{item.role}</p>
                            <p className="mt-1 text-xs uppercase tracking-widest text-white/35">{item.context}</p>
                        </footer>
                    </li>
                ))}
            </ul>

            <a
                href={siteConfig.sameAs.linkedin}
                target="_blank"
                rel="noreferrer"
                data-tracking="testimonials_linkedin"
                className="inline-flex items-center gap-1 text-sm font-semibold text-white/70 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
                {testimonials.linkedinLabel}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">{links.opensInNewTab}</span>
            </a>
        </section>
    )
}
