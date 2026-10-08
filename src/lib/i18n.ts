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

// PR 4: Slice 1 (this migration pass) ships routes for every locale in
// LOCALES, but real translated content only exists for `en` — `/es/*`
// currently renders the same English copy until PR 5 lands. Gating
// indexing on this separate list (rather than LOCALES) is what lets
// canonical/hreflang/OG-locale metadata, robots, and the sitemap treat
// `/es/*` as not-yet-indexable without touching routing. See
// docs/bilingual-seo-migration-plan.md Phase 6/7 and the PR 4 "Slice 2
// unlock" note — flip a locale on here once its real content ships.
export const INDEXABLE_LOCALES: readonly Locale[] = ['en']

export function isIndexableLocale(locale: Locale): boolean {
    return (INDEXABLE_LOCALES as readonly string[]).includes(locale)
}

// PR 3: keeps internal navigation inside the active locale instead of
// relying on the legacy unprefixed → /en 301s in next.config.ts. `path` is
// always a site-relative path such as `/`, `/about`, `/work/foo`,
// `/contact#form`, or `/resume?x=1` — external URLs (http(s):, mailto:,
// tel:) and pure same-page hash links (`#main-content`) are left untouched,
// and a path that is already locale-prefixed is never double-prefixed (lets
// callers route every href through this helper unconditionally, even ones
// that already come out of localizedPath/swapLocaleInPath).
export function localizedPath(lang: Locale, path: string): string {
    if (
        path.startsWith('#') ||
        path.startsWith('http://') ||
        path.startsWith('https://') ||
        path.startsWith('mailto:') ||
        path.startsWith('tel:')
    ) {
        return path
    }

    const firstSegment = path.split('/').filter(Boolean)[0]
    if (firstSegment && isLocale(firstSegment)) {
        return path
    }

    if (path === '/') {
        return `/${lang}`
    }

    return `/${lang}${path}`
}

// Powers the header's LanguageSwitch: swaps the locale segment of the
// current URL for `target`, or prefixes it if there isn't one yet. `/` and
// `/_not-found` collapse to just `/${target}` rather than
// `/${target}/_not-found` — `/_not-found` is the pathname Next.js reports
// from usePathname() while rendering the static global 404 (src/app/not-
// found.tsx), which lives outside the `[lang]` segment entirely, so there is
// no per-locale equivalent path to preserve.
//
// Every route in this slice exists in both locales (same 7 case studies,
// mirrored content), so a plain segment swap never lands on a 404. Once PR 5
// allows a case study to exist in only one locale, this will need a
// fallback to `/{lang}/work` when the swapped path doesn't resolve.
export function swapLocaleInPath(pathname: string, target: Locale): string {
    const segments = pathname.split('/').filter(Boolean)
    const [first, ...rest] = segments

    if (first && isLocale(first)) {
        return `/${[target, ...rest].join('/')}`
    }

    if (pathname === '/' || pathname === '/_not-found') {
        return `/${target}`
    }

    return `/${[target, ...segments].join('/')}`
}
