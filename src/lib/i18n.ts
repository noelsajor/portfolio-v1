// Locale primitives for the bilingual (EN/ES) routing migration. This file
// is the single source of truth for which locales exist — route
// `generateStaticParams()`, the `[lang]` layout's `notFound()` guard, and
// (starting PR 2) the root locale-detection proxy all read from here rather
// than hardcoding locale lists.
export const LOCALES = ['en', 'es'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: string): value is Locale {
    return (LOCALES as readonly string[]).includes(value)
}
