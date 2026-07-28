import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site-config'
import { getProjects } from '@/lib/projects'

// No `priority` or `changeFrequency` on any entry, deliberately: Google's own
// documentation states it does not use either field for crawling or ranking
// decisions, and Bing's usage is unclear at best. Including them would just
// be asserting a confidence about crawler behavior this project doesn't
// actually have. `lastModified` is different — Google does use it, but only
// stays useful as long as it's trustworthy, so it's included only where a
// real, verifiable date exists (see getProjects()'s `updatedAt`) and omitted
// everywhere else rather than filled in with the build date.
export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: absoluteUrl('/') },
        { url: absoluteUrl('/about') },
        { url: absoluteUrl('/work') },
        { url: absoluteUrl('/contact') },
        { url: absoluteUrl('/resume') }
    ]

    // getProjects() (not getProjectSlugs()) so updatedAt is available here —
    // same published-only, schema-validated data the rest of the app reads,
    // not a second source of truth.
    const projectRoutes: MetadataRoute.Sitemap = getProjects().map((project) => ({
        url: absoluteUrl(`/work/${project.slug}`),
        ...(project.updatedAt ? { lastModified: project.updatedAt } : {})
    }))

    return [...staticRoutes, ...projectRoutes]
}
