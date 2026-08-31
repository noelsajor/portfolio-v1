const VARIANT_STYLES = {
    // Primary: the main project classifier, usually a capability.
    primary: 'border-white/15 bg-white/10 text-white/80 text-xs',
    // Secondary: supporting metadata such as segment, type, or extra capabilities.
    secondary: 'border-white/10 bg-white/5 text-white/60 text-[10px]'
} as const

export function Chip({
    children,
    variant = 'secondary',
    href
}: {
    children: React.ReactNode
    variant?: keyof typeof VARIANT_STYLES
    // Same-page anchor (e.g. "#challenge") to render this chip as a link —
    // a plain <a>, not next/link, since these only ever target in-page
    // heading ids from rehype-slug, never a route.
    href?: string
}) {
    // No forced uppercase: authored labels like "Ecommerce Systems" and
    // "D2C" read better in their natural case than shouted.
    const className = `rounded-full border px-2.5 py-0.5 font-semibold tracking-wide ${VARIANT_STYLES[variant]}${
        href ? ' transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30' : ''
    }`

    if (href) {
        return (
            <a href={href} className={className}>
                {children}
            </a>
        )
    }

    return <span className={className}>{children}</span>
}
