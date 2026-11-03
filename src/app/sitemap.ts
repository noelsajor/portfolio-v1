import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site-config'
import { getProjects } from '@/lib/projects'
import { DEFAULT_LOCALE, INDEXABLE_LOCALES, type Locale } from '@/lib/i18n'

// Every locale in INDEXABLE_LOCALES gets its own entries. Both 'en' and
// 'es' are in it: the earlier restriction to English existed only while
// /es/* still rendered English fallback copy, and the Spanish content is
// real now (docs/bilingual-seo-migration-plan.md Phase 7, and the
// INDEXABLE_LOCALES comment in src/lib/i18n.ts). Bare "/" is still never
// emitted: it is a redirect-only route that picks a locale per visitor
// (Phase 6 canonical rule table), so it has no content of its own to
// index. The locale homepage `/${lang}` is the real page and is listed.
const STATIC_PATHS = ['/', '/about', '/work', '/contact', '/resume', '/for-agencies']

function localizedUrl(lang: Locale, path: string): string {
    return absoluteUrl(`/${lang}${path === '/' ? '' : path}`)
}

// PR 22: every entry carries the same hreflang set the page <head> emits
// (one per indexable locale plus x-default -> DEFAULT_LOCALE), so the
// sitemap and the pages never disagree about which URLs are alternates of
// each other. Only emitted once more than one locale is indexable; with a
// single locale there is nothing to be an alternate of.
function alternatesFor(path: string): { alternates: { languages: Record<string, string> } } | Record<string, never> {
    if (INDEXABLE_LOCALES.length < 2) return {}
    return {
        alternates: {
            languages: {
                ...Object.fromEntries(INDEXABLE_LOCALES.map((locale) => [locale, localizedUrl(locale, path)])),
                'x-default': localizedUrl(DEFAULT_LOCALE, path)
            }
        }
    }
}

// No `priority` or `changeFrequency` on any entry, deliberately: Google's own
// documentation states it does not use either field for crawling or ranking
// decisions, and Bing's usage is unclear at best. Including them would just
// be asserting a confidence about crawler behavior this project doesn't
// actually have. `lastModified` is different — Google does use it, but only
// stays useful as long as it's trustworthy, so it's included only where a
// real, verifiable date exists (see getProjects()'s `updatedAt`) and omitted
// everywhere else rather than filled in with the build date.
export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = INDEXABLE_LOCALES.flatMap((lang) =>
        STATIC_PATHS.map((path) => ({ url: localizedUrl(lang, path), ...alternatesFor(path) }))
    )

    // getProjects() (not getProjectSlugs()) so updatedAt is available here:
    // the same published-only, schema-validated data the rest of the app
    // reads, rather than a second source of truth. It is read once, in the
    // default locale, and the result is mapped over every indexable locale.
    // That is safe because the only two things taken from it are
    // locale-independent and CI says so: the slug catalogs must be identical
    // across locales, and `updatedAt` is in LOCALE_INDEPENDENT_FIELDS, both
    // checked by scripts/validate-content.ts. Reading per locale would be a
    // second trip for facts that are required to be the same.
    const projects = getProjects()
    const projectRoutes: MetadataRoute.Sitemap = INDEXABLE_LOCALES.flatMap((lang) =>
        projects.map((project) => ({
            url: localizedUrl(lang, `/work/${project.slug}`),
            ...alternatesFor(`/work/${project.slug}`),
            ...(project.updatedAt ? { lastModified: project.updatedAt } : {})
        }))
    )

    return [...staticRoutes, ...projectRoutes]
}
