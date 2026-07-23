import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site-config'
import { getProjectSlugs } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: absoluteUrl('/'), priority: 1 },
        { url: absoluteUrl('/about'), priority: 0.8 },
        { url: absoluteUrl('/work'), priority: 0.8 },
        { url: absoluteUrl('/contact'), priority: 0.8 }
    ]

    const projectRoutes: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
        url: absoluteUrl(`/work/${slug}`),
        priority: 0.7
    }))

    return [...staticRoutes, ...projectRoutes]
}
