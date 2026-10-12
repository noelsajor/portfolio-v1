import { localizedPath, type Locale } from '@/lib/i18n'
import { absoluteUrl } from '@/lib/site-config'
import { getUiContent } from '@/lib/ui-content'
import { buildWebPageSchema, PERSON_ID, type BreadcrumbItem, type JsonLd, type WebPageType } from '@/lib/structured-data'

// Glue between a route and the JSON-LD builders: resolves the localized
// absolute URL for a locale-agnostic path (same rule as
// buildLocaleMetadataFields in site-config.ts, so the WebPage `@id` always
// equals the page's canonical) and prefixes every breadcrumb trail with the
// localized "Home" crumb.

export function localizedAbsoluteUrl(lang: Locale, path: string): string {
    return absoluteUrl(localizedPath(lang, path))
}

/** `trail` is the crumbs AFTER home, each with a locale-agnostic path. */
export function buildBreadcrumbTrail(
    lang: Locale,
    trail: readonly { name: string; path: string }[]
): BreadcrumbItem[] {
    const { shell } = getUiContent(lang)
    return [
        { name: shell.breadcrumbHome, url: localizedAbsoluteUrl(lang, '/') },
        ...trail.map((crumb) => ({ name: crumb.name, url: localizedAbsoluteUrl(lang, crumb.path) }))
    ]
}

/** The WebPage node for a top-level static page, with its breadcrumb. Pages
 *  about Jose himself pass `profile: true` to become a ProfilePage whose
 *  mainEntity is the site-wide Person node. */
export function buildPageNode({
    lang,
    path,
    title,
    description,
    type,
    profile = false,
    trail
}: {
    lang: Locale
    path: string
    title: string
    description: string
    type?: WebPageType
    profile?: boolean
    /** Breadcrumb crumbs after Home. Omit for the home page itself. */
    trail?: readonly { name: string; path: string }[]
}): JsonLd {
    return buildWebPageSchema({
        lang,
        url: localizedAbsoluteUrl(lang, path),
        name: title,
        description,
        type: type ?? (profile ? 'ProfilePage' : 'WebPage'),
        ...(profile ? { mainEntity: { '@id': PERSON_ID } } : {}),
        ...(trail ? { breadcrumb: buildBreadcrumbTrail(lang, trail) } : {})
    })
}
