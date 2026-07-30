import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import { buildPageMetadata } from '@/lib/site-config'
import { SegmentBadge } from '@/components/SegmentBadge'

export const metadata = buildPageMetadata({
    title: 'Work',
    description: 'Selected product design, front-end implementation and Shopify projects.',
    path: '/work'
})

export default function WorkPage() {
    const projects = getProjects()

    return (
        <div className="space-y-10">
            <header className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Work</h1>
                <p className="max-w-2xl text-white/70">
                    A curated set of product design, Shopify, and front-end implementation projects — from brand systems
                    and marketing websites to e-commerce storefronts.
                </p>
            </header>

            {projects.length > 0 ? (
                <ul role="list" className="grid gap-4 md:grid-cols-2">
                    {projects.map((project) => (
                        <li key={project.slug} className="h-full">
                            <Link
                                href={`/work/${project.slug}`}
                                data-tracking={`portfolio_item_${project.slug}`}
                                className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs font-semibold tracking-wide text-white/70">{project.type}</p>
                                        <SegmentBadge segment={project.segment} />
                                    </div>
                                    <h2 className="text-xl font-semibold tracking-tight">{project.title}</h2>
                                    <p className="text-sm text-white/70">{project.summary}</p>
                                    <p className="text-sm font-semibold text-white/70">
                                        View case study <span aria-hidden="true">→</span>
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-white/60">No projects published yet.</p>
            )}
        </div>
    )
}
