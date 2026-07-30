const VARIANT_STYLES = {
    // Primary: the project's `type` (platform/deliverable category) — the
    // main classifier, so it reads slightly more prominent and matches the
    // text size the plain-text label used before this became a chip.
    primary: 'border-white/15 bg-white/10 text-white/80 text-xs',
    // Secondary: the `segment` (D2C/B2B) — a lighter-weight tag alongside it.
    secondary: 'border-white/10 bg-white/5 text-white/60 text-[10px]'
} as const

export function Chip({
    children,
    variant = 'secondary'
}: {
    children: React.ReactNode
    variant?: keyof typeof VARIANT_STYLES
}) {
    return (
        // No forced uppercase: `segment` values (D2C/B2B) are already
        // upper-case as authored data, and `type` values ("Marketing
        // Website") read better in their natural case than shouted.
        <span className={`rounded-full border px-2.5 py-0.5 font-semibold tracking-wide ${VARIANT_STYLES[variant]}`}>
            {children}
        </span>
    )
}
