import type { Locale } from '@/lib/i18n'

// Shared between the client form and the server route so the two can never
// drift — the server treats these as the only valid values.
export const SUPPORT_TYPES = [
    'Design production',
    'Shopify support',
    'UI/UX',
    'Front-end implementation',
    'White-label agency support',
    'Other'
] as const

export const TIMELINES = [
    'As soon as possible',
    'Within 2–4 weeks',
    'Within 1–3 months',
    'Ongoing support',
    'Exploring options'
] as const

// PR 5: display labels only — the underlying values above stay the
// validation source of truth (unchanged, still what the <option value>
// and the server both read). `es` values are identical placeholders until
// real Spanish copy lands.
export const SUPPORT_TYPE_LABELS: Record<Locale, Record<(typeof SUPPORT_TYPES)[number], string>> = {
    en: {
        'Design production': 'Design production',
        'Shopify support': 'Shopify support',
        'UI/UX': 'UI/UX',
        'Front-end implementation': 'Front-end implementation',
        'White-label agency support': 'White-label agency support',
        Other: 'Other'
    },
    es: {
        'Design production': 'Design production',
        'Shopify support': 'Shopify support',
        'UI/UX': 'UI/UX',
        'Front-end implementation': 'Front-end implementation',
        'White-label agency support': 'White-label agency support',
        Other: 'Other'
    }
}

export const TIMELINE_LABELS: Record<Locale, Record<(typeof TIMELINES)[number], string>> = {
    en: {
        'As soon as possible': 'As soon as possible',
        'Within 2–4 weeks': 'Within 2–4 weeks',
        'Within 1–3 months': 'Within 1–3 months',
        'Ongoing support': 'Ongoing support',
        'Exploring options': 'Exploring options'
    },
    es: {
        'As soon as possible': 'As soon as possible',
        'Within 2–4 weeks': 'Within 2–4 weeks',
        'Within 1–3 months': 'Within 1–3 months',
        'Ongoing support': 'Ongoing support',
        'Exploring options': 'Exploring options'
    }
}
