import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import type { Locale } from '@/lib/i18n'

// Comparison table (me vs several freelancers vs an agency). Desktop renders
// a real <table> with the first option column highlighted; below md the same
// data stacks as one card per row, so nothing scrolls sideways on a phone.
export function WhyMeSection({ lang }: { lang: Locale }) {
    const homeContent = lang === 'es' ? homeContentEs : homeContentEn
    const { whyMe } = homeContent
    const { criterionLabel, options, rows, note } = whyMe.comparison

    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{whyMe.heading}</h2>

            {/* md+: table */}
            <div className="hidden overflow-hidden rounded-2xl border border-white/10 md:block">
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th scope="col" className="w-[22%] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-white/50">
                                {criterionLabel}
                            </th>
                            {options.map((option, index) => (
                                <th
                                    key={option}
                                    scope="col"
                                    className={[
                                        'px-5 py-4 text-base font-semibold tracking-tight',
                                        index === 0 ? 'bg-white/5 text-white' : 'text-white/70'
                                    ].join(' ')}
                                >
                                    {option}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.label} className="border-b border-white/10 last:border-b-0">
                                <th scope="row" className="px-5 py-4 align-top font-semibold text-white">
                                    {row.label}
                                </th>
                                {row.cells.map((cell, index) => (
                                    <td
                                        key={`${row.label}-${options[index]}`}
                                        className={[
                                            'px-5 py-4 align-top leading-relaxed',
                                            index === 0 ? 'bg-white/5 text-white' : 'text-white/60'
                                        ].join(' ')}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* < md: one card per criterion */}
            <ul role="list" className="space-y-4 md:hidden">
                {rows.map((row) => (
                    <li key={row.label} className="rounded-2xl border border-white/10 p-5">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50">{row.label}</h3>
                        <dl className="mt-3 space-y-3">
                            {row.cells.map((cell, index) => (
                                <div key={`${row.label}-${options[index]}`} className={index === 0 ? '-mx-5 bg-white/5 px-5 py-3' : ''}>
                                    <dt className={['text-sm font-semibold', index === 0 ? 'text-white' : 'text-white/70'].join(' ')}>
                                        {options[index]}
                                    </dt>
                                    <dd className={['mt-1 text-sm leading-relaxed', index === 0 ? 'text-white/90' : 'text-white/60'].join(' ')}>
                                        {cell}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </li>
                ))}
            </ul>

            <p className="max-w-3xl text-sm leading-relaxed text-white/60">{note}</p>
        </section>
    )
}
