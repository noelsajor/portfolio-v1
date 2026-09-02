import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getFeaturedProjects } from '@/lib/projects'
import { homeContent } from '@/content/home'
import { localizedPath, type Locale } from '@/lib/i18n'
import { CapabilityChips } from '@/components/CapabilityChips'
import { ProjectCardPreview } from '@/components/ProjectCardPreview'

export function FeaturedWorkSection({ lang }: { lang: Locale }) {
    const { featuredWork } = homeContent
    const featured = getFeaturedProjects().slice(0, 3)

    return (
        <section className="space-y-6">
            <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{featuredWork.heading}</h2>
                <Link
                    href={localizedPath(lang, featuredWork.viewAllHref)}
                    data-tracking="view_all_work"
                    className="text-sm font-semibold text-white/70 hover:text-white"
                >
                    {featuredWork.viewAllLabel}
                </Link>
            </div>

            {featured.length > 0 ? (
                <ul role="list" className="grid gap-4 md:grid-cols-2">
                    {featured.map((project) => (
                        <li
                            key={project.slug}
                            className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                        >
                            <ProjectCardPreview project={project} />
                            <div className="flex flex-1 flex-col gap-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <CapabilityChips capabilities={project.capabilities} />
                                </div>
                                <h3 className="text-lg font-semibold tracking-tight group-hover:text-white">
                                    <Link
                                        href={localizedPath(lang, `/work/${project.slug}`)}
                                        data-tracking={`project_card_${project.slug}`}
                                        className="static outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-white/30"
                                    >
                                        {project.title}
                                    </Link>
                                </h3>
                                <p className="text-sm leading-relaxed text-white/70">{project.summary}</p>
                                <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                                    <Link
                                        href={localizedPath(lang, `/work/${project.slug}`)}
                                        data-tracking={`project_card_${project.slug}`}
                                        className="relative z-10 inline-flex w-fit items-center justify-center gap-1 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                                    >
                                        {featuredWork.projectCtaLabel} <span aria-hidden="true">→</span>
                                    </Link>
                                    {project.liveUrl ? (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            data-tracking={`project_card_${project.slug}_live`}
                                            className="relative z-10 inline-flex w-fit items-center justify-center gap-1 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                        >
                                            Visit live site <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                                            <span className="sr-only"> (opens in a new tab)</span>
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-white/60">{featuredWork.emptyStateMessage}</p>
            )}
        </section>
    )
}
