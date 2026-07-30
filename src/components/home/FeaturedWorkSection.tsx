import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/projects'
import { homeContent } from '@/content/home'
import { SegmentBadge } from '@/components/SegmentBadge'
import { Chip } from '@/components/Chip'

export function FeaturedWorkSection() {
    const { featuredWork } = homeContent
    const featured = getFeaturedProjects().slice(0, 3)

    return (
        <section className="space-y-6">
            <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{featuredWork.heading}</h2>
                <Link
                    href={featuredWork.viewAllHref}
                    data-tracking="view_all_work"
                    className="text-sm font-semibold text-white/70 hover:text-white"
                >
                    {featuredWork.viewAllLabel}
                </Link>
            </div>

            {featured.length > 0 ? (
                <ul role="list" className="grid gap-4 md:grid-cols-2">
                    {featured.map((project) => (
                        <li key={project.slug} className="h-full">
                            <Link
                                href={`/work/${project.slug}`}
                                data-tracking={`project_card_${project.slug}`}
                                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <Chip variant="primary">{project.type}</Chip>
                                            <SegmentBadge segment={project.segment} />
                                        </div>
                                        <p className="text-xs text-white/60">{project.roles.join(' · ')}</p>
                                    </div>
                                    <h3 className="text-lg font-semibold tracking-tight group-hover:text-white">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-white/70">{project.summary}</p>
                                    <p className="pt-2 text-sm font-semibold text-white/70 group-hover:text-white">
                                        {featuredWork.projectCtaLabel} <span aria-hidden="true">→</span>
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-white/60">{featuredWork.emptyStateMessage}</p>
            )}
        </section>
    )
}
