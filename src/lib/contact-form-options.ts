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
// and the server both read). PR 11: Spanish labels per
// docs/es-style-guide.md section 5.
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
        'Design production': 'Producción de diseño',
        'Shopify support': 'Soporte Shopify',
        'UI/UX': 'UI/UX',
        'Front-end implementation': 'Implementación front-end',
        'White-label agency support': 'Soporte white-label para agencias',
        Other: 'Otro'
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
        'As soon as possible': 'Lo antes posible',
        'Within 2–4 weeks': 'En 2 a 4 semanas',
        'Within 1–3 months': 'En 1 a 3 meses',
        'Ongoing support': 'Soporte continuo',
        'Exploring options': 'Explorando opciones'
    }
}
