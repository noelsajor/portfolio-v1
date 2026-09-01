import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PROJECT_CAPABILITIES } from '@/lib/project-schema'
import { getProjects } from '@/lib/projects'
import { buildPageMetadata } from '@/lib/site-config'
import { CapabilityChips } from '@/components/CapabilityChips'
import { ProjectCardPreview } from '@/components/ProjectCardPreview'

function capabilityId(capability: string): string {
    return `capability-${capability.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
}

export const metadata = buildPageMetadata({
    title: 'Work',
    description: 'Selected product design, front-end implementation and Shopify projects.',
    path: '/work'
})

export default function WorkPage() {
    const projects = getProjects()
    const projectSections = PROJECT_CAPABILITIES.map((capability) => ({
        capability,
        projects: projects.filter((project) => project.capabilities[0] === capability)
    })).filter((section) => section.projects.length > 0)

    return (
        <div className="space-y-10">
            <header className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Work</h1>
                <p className="max-w-2xl text-white/70">
                    A curated set of product design, Shopify, and front-end implementation projects — from brand systems
                    and marketing websites to e-commerce storefronts.
                </p>
            </header>

            {projectSections.length > 0 ? (
                <div className="space-y-10">
                    {projectSections.map((section) => (
                        <section key={section.capability} className="space-y-4" aria-labelledby={capabilityId(section.capability)}>
                            <h2 id={capabilityId(section.capability)} className="text-2xl font-semibold tracking-tight">
                                {section.capability}
                            </h2>
                            <ul role="list" className="grid gap-4 md:grid-cols-2">
                                {section.projects.map((project) => (
                                    <li
                                        key={project.slug}
                                        className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                                    >
                                        <ProjectCardPreview project={project} />
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <CapabilityChips capabilities={project.capabilities} />
                                            </div>
                                            <h3 className="text-xl font-semibold tracking-tight">
                                                <Link
                                                    href={`/work/${project.slug}`}
                                                    data-tracking={`portfolio_item_${project.slug}`}
                                                    className="static outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-white/30"
                                                >
                                                    {project.title}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-white/70">{project.summary}</p>
                                            <div className="flex flex-wrap items-center gap-4 pt-3">
                                                <p className="text-sm font-semibold text-white/70">
                                                    View case study <span aria-hidden="true">→</span>
                                                </p>
                                                {project.liveUrl ? (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        data-tracking={`portfolio_item_${project.slug}_live`}
                                                        className="relative z-10 inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                    >
                                                        Visit live site <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                                                        <span className="sr-only"> (opens in a new tab)</span>
                                                    </a>
                                                ) : null}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-white/60">No projects published yet.</p>
            )}
        </div>
    )
}
