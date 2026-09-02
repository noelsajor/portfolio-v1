import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import type { Locale } from '@/lib/i18n'

// PR 5: not currently rendered anywhere (no import in src/app/[lang]/page.tsx)
// — kept in sync with the other home/* components' lang-selection pattern
// anyway so it isn't left in a broken, half-migrated state if it's wired
// back in later.
export function TrustStrip({ lang }: { lang: Locale }) {
    const homeContent = lang === 'es' ? homeContentEs : homeContentEn
    const { points } = homeContent.trustStrip

    return (
        <section aria-label="Experience summary" className="border-y border-white/10 py-6">
            <ul
                role="list"
                className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-center text-sm text-white/70 md:gap-x-10"
            >
                {points.map((point) => (
                    <li key={point}>{point}</li>
                ))}
            </ul>
        </section>
    )
}
