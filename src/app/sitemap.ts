import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site-config'
import { getProjects } from '@/lib/projects'
import { INDEXABLE_LOCALES, type Locale } from '@/lib/i18n'

// PR 4: only locales in INDEXABLE_LOCALES get sitemap entries — /es/*
// currently renders English fallback copy and must stay out of the sitemap
// (and out of hreflang) until real Spanish content ships. See
// docs/bilingual-seo-migration-plan.md Phase 7 and the INDEXABLE_LOCALES
// comment in src/lib/i18n.ts. Bare "/" itself is still never emitted — it's
// a redirect-only route (Phase 6 canonical rule table), not indexed
// content; the locale homepage `/${lang}` is real content and is included.
const STATIC_PATHS = ['/', '/about', '/work', '/contact', '/resume', '/for-agencies']

function localizedUrl(lang: Locale, path: string): string {
    return absoluteUrl(`/${lang}${path === '/' ? '' : path}`)
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
        STATIC_PATHS.map((path) => ({ url: localizedUrl(lang, path) }))
    )

    // getProjects() (not getProjectSlugs()) so updatedAt is available here —
    // same published-only, schema-validated data the rest of the app reads,
    // not a second source of truth. PR 5: getProjects() now takes an
    // optional `lang` (defaulting to DEFAULT_LOCALE, 'en') — left as a
    // no-args call here on purpose, since INDEXABLE_LOCALES is `['en']`
    // only, so the sitemap should only ever emit English URLs anyway.
    const projects = getProjects()
    const projectRoutes: MetadataRoute.Sitemap = INDEXABLE_LOCALES.flatMap((lang) =>
        projects.map((project) => ({
            url: localizedUrl(lang, `/work/${project.slug}`),
            ...(project.updatedAt ? { lastModified: project.updatedAt } : {})
        }))
    )

    return [...staticRoutes, ...projectRoutes]
}
