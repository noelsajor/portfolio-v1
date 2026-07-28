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
