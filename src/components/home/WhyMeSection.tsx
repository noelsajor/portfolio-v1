import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import type { Locale } from '@/lib/i18n'

// "Highlighted column" comparison: the first option (me) sits inside a raised
// card that spans every row; the other options are plain text columns with
// dashed row separators. A single CSS grid keeps rows aligned across the
// four columns even when cell heights differ; the card itself is a grid
// item spanning all rows behind the cells. Below md the very same grid is
// kept (so the row-by-row comparison survives) inside a horizontal scroller
// that bleeds into the page gutter, with the criterion column sticky so the
// reader always knows which row they are on.
//
// No inline styles anywhere: the site's CSP is `style-src 'self'`, so grid
// placement has to come from static Tailwind classes. The lookups below
// hold the literal class names so Tailwind's scanner emits them.
const ROW_START = ['row-start-2', 'row-start-3', 'row-start-4', 'row-start-5', 'row-start-6', 'row-start-7', 'row-start-8', 'row-start-9'] as const
const COL_START = ['col-start-2', 'col-start-3', 'col-start-4'] as const
const GRID_ROWS = {
    4: 'grid-rows-[repeat(4,auto)]',
    5: 'grid-rows-[repeat(5,auto)]',
    6: 'grid-rows-[repeat(6,auto)]',
    7: 'grid-rows-[repeat(7,auto)]',
    8: 'grid-rows-[repeat(8,auto)]',
    9: 'grid-rows-[repeat(9,auto)]'
} as const
// Below md the criterion column stays put while the option columns scroll
// under it. The scroller only bleeds into the right gutter, so its left edge
// (where the column sticks) is the page gutter and nothing shows through on
// the left; the soft right shadow keeps the column readable over the cells
// passing underneath.
const STICKY_LABEL = 'sticky left-0 z-20 bg-black shadow-[8px_0_12px_-8px_#000] md:static md:left-auto md:shadow-none'

export function WhyMeSection({ lang }: { lang: Locale }) {
    const homeContent = lang === 'es' ? homeContentEs : homeContentEn
    const { whyMe } = homeContent
    const { criterionLabel, options, highlightTagline, rows, note, scrollHint } = whyMe.comparison
    const rowCount = (rows.length + 1) as keyof typeof GRID_ROWS // header row + one per criterion

    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{whyMe.heading}</h2>

            {/* Below md this is a horizontal scroller; its vertical padding gives the card's -my-5 overhang room, since overflow-x clips the y axis too. On md+ it is a plain wrapper. */}
            <div className="max-md:-mr-4 max-md:overflow-x-auto max-md:py-5 max-md:pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className={['relative grid min-w-[42rem] grid-cols-[7rem_14rem_10.5rem_10.5rem] md:min-w-0 md:grid-cols-[11rem_1.3fr_1fr_1fr]', GRID_ROWS[rowCount]].join(' ')}>
                    {/* Card behind the highlighted column */}
                    <div
                        aria-hidden="true"
                        className="col-start-2 row-span-full row-start-1 -my-5 rounded-2xl border border-white/10 bg-black"
                    />

                    {/* Header row */}
                    <p
                        className={[
                            // flex + items-end (not self-end) and the -mt-5/pt-5 overhang: the cell fills the whole header row, card overhang included, so when sticky it covers what scrolls under it.
                            'col-start-1 row-start-1 -mt-5 flex items-end pb-4 pr-5 pt-5 text-xs font-semibold uppercase tracking-widest text-white/45 md:mt-0 md:pt-0',
                            STICKY_LABEL
                        ].join(' ')}
                    >
                        {criterionLabel}
                    </p>
                    <div className="relative col-start-2 row-start-1 px-5 pb-4">
                        <span className="inline-block rounded-full border border-white/25 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-white/80">
                            {options[0]}
                        </span>
                        <p className="mt-3 text-lg font-semibold leading-snug tracking-tight text-white">{highlightTagline}</p>
                    </div>
                    {options.slice(1).map((option, index) => (
                        <p
                            key={option}
                            className={['relative row-start-1 self-end px-5 pb-4 text-lg font-semibold tracking-tight text-white/70', COL_START[index + 1]].join(' ')}
                        >
                            {option}
                        </p>
                    ))}

                    {/* Criterion rows */}
                    {rows.map((row, rowIndex) => {
                        const rowClass = ROW_START[rowIndex]
                        return [
                            <p
                                key={`${row.label}-label`}
                                className={[
                                    'col-start-1 border-t border-dashed border-white/15 py-4 pr-5 text-sm font-semibold text-white',
                                    STICKY_LABEL,
                                    rowClass
                                ].join(' ')}
                            >
                                {row.label}
                            </p>,
                            ...row.cells.map((cell, cellIndex) => (
                                <p
                                    key={`${row.label}-${options[cellIndex]}`}
                                    className={[
                                        'relative py-4 text-sm leading-relaxed',
                                        rowClass,
                                        COL_START[cellIndex],
                                        cellIndex === 0
                                            ? 'px-5 border-t border-white/10 text-white'
                                            : 'px-5 border-t border-dashed border-white/15 text-white/55'
                                    ].join(' ')}
                                >
                                    {cell}
                                </p>
                            ))
                        ]
                    })}
                </div>
            </div>
            <p className="text-xs text-white/40 md:hidden" aria-hidden="true">
                {scrollHint}
            </p>

            <p className="max-w-3xl text-sm leading-relaxed text-white/60">{note}</p>
        </section>
    )
}
