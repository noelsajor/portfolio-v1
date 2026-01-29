export type Project = {
    slug: string
    name: string
    type: 'Homepage' | 'PDP' | 'Collection' | 'CRO'
    role: string
    summary: string
    year?: string
}

export const projects: Project[] = [
    {
        slug: 'shopify-homepage-rebuild',
        name: 'Shopify Homepage Rebuild',
        type: 'Homepage',
        role: 'UI/UX + Shopify Front-end',
        summary: 'Conversion-focused homepage layout with clear hierarchy, trust, and merchandising.'
    },
    {
        slug: 'pdp-clarity-upgrade',
        name: 'PDP Clarity Upgrade',
        type: 'PDP',
        role: 'UI/UX + Liquid Sections',
        summary: 'Improved product comprehension, variant UX, and add-to-cart flow for mobile.'
    },
    {
        slug: 'collection-merch-system',
        name: 'Collection Merch System',
        type: 'Collection',
        role: 'UX + UI System',
        summary: 'Filter/sort patterns and product-card hierarchy designed for fast scanning and AOV.'
    }
]
