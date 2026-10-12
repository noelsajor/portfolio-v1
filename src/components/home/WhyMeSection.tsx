import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import type { Locale } from '@/lib/i18n'

// "Highlighted column" comparison: the first option (me) sits inside a raised
// card that spans every row; the other options are plain text columns with
// dashed row separators. A single CSS grid keeps rows aligned across the
// four columns even when cell heights differ; the card itself is a grid
// item spanning all rows behind the cells. Below md the same data stacks
// per option, with the highlighted option as the one card.
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

export function WhyMeSection({ lang }: { lang: Locale }) {
    const homeContent = lang === 'es' ? homeContentEs : homeContentEn
    const { whyMe } = homeContent
    const { criterionLabel, options, highlightTagline, rows, note } = whyMe.comparison
    const rowCount = (rows.length + 1) as keyof typeof GRID_ROWS // header row + one per criterion

    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{whyMe.heading}</h2>

            {/* md+: aligned grid with the first option as a raised card */}
            <div className={['relative hidden gap-x-7 md:grid md:grid-cols-[11rem_1.3fr_1fr_1fr]', GRID_ROWS[rowCount]].join(' ')}>
                {/* Card behind the highlighted column */}
                <div
                    aria-hidden="true"
                    className="col-start-2 row-span-full row-start-1 -mx-6 -my-5 rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_30px_60px_-30px_rgba(255,255,255,0.15)]"
                />

                {/* Header row */}
                <p className="col-start-1 row-start-1 self-end pb-4 text-xs font-semibold uppercase tracking-widest text-white/45">
                    {criterionLabel}
                </p>
                <div className="relative col-start-2 row-start-1 pb-4">
                    <span className="inline-block rounded-full border border-white/25 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-white/80">
                        {options[0]}
                    </span>
                    <p className="mt-3 text-lg font-semibold leading-snug tracking-tight text-white">{highlightTagline}</p>
                </div>
                {options.slice(1).map((option, index) => (
                    <p
                        key={option}
                        className={['relative row-start-1 self-end pb-4 text-lg font-semibold tracking-tight text-white/70', COL_START[index + 1]].join(' ')}
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
                            className={['col-start-1 border-t border-dashed border-white/15 py-4 text-sm font-semibold text-white', rowClass].join(' ')}
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
                                        ? 'border-t border-white/15 text-white'
                                        : 'border-t border-dashed border-white/15 text-white/55'
                                ].join(' ')}
                            >
                                {cell}
                            </p>
                        ))
                    ]
                })}
            </div>

            {/* < md: one block per option, the highlighted one as a card */}
            <div className="space-y-6 md:hidden">
                {options.map((option, optionIndex) => (
                    <section
                        key={option}
                        className={
                            optionIndex === 0
                                ? 'rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5'
                                : 'px-1'
                        }
                    >
                        {optionIndex === 0 ? (
                            <>
                                <span className="inline-block rounded-full border border-white/25 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-white/80">
                                    {option}
                                </span>
                                <p className="mt-3 text-lg font-semibold leading-snug tracking-tight text-white">{highlightTagline}</p>
                            </>
                        ) : (
                            <h3 className="text-lg font-semibold tracking-tight text-white/70">{option}</h3>
                        )}
                        <dl className="mt-2">
                            {rows.map((row) => (
                                <div
                                    key={`${option}-${row.label}`}
                                    className={[
                                        'py-3',
                                        optionIndex === 0 ? 'border-t border-white/15' : 'border-t border-dashed border-white/15'
                                    ].join(' ')}
                                >
                                    <dt className="text-[11px] font-semibold uppercase tracking-widest text-white/45">{row.label}</dt>
                                    <dd className={['mt-1 text-sm leading-relaxed', optionIndex === 0 ? 'text-white' : 'text-white/60'].join(' ')}>
                                        {row.cells[optionIndex]}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                ))}
            </div>

            <p className="max-w-3xl text-sm leading-relaxed text-white/60">{note}</p>
        </section>
    )
}
