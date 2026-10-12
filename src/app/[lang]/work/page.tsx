import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { PROJECT_CAPABILITIES } from '@/lib/project-schema'
import { getProjects } from '@/lib/projects'
import { buildPageMetadata } from '@/lib/site-config'
import { DEFAULT_LOCALE, isLocale, localizedPath } from '@/lib/i18n'
import { CapabilityChips } from '@/components/CapabilityChips'
import { ProjectCardPreview } from '@/components/ProjectCardPreview'
import { workContent as workContentEn } from '@/content/en/static-pages'
import { workContent as workContentEs } from '@/content/es/static-pages'
import { getUiContent } from '@/lib/ui-content'
import { capabilityLabel } from '@/lib/project-labels'

function capabilityId(capability: string): string {
    return `capability-${capability.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    const { metadata } = lang === 'es' ? workContentEs : workContentEn

    return buildPageMetadata({ ...metadata, path: '/work', lang })
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const workContent = lang === 'es' ? workContentEs : workContentEn
    const { work, links } = getUiContent(lang)
    const projects = getProjects(lang)
    const projectSections = PROJECT_CAPABILITIES.map((capability) => ({
        capability,
        projects: projects.filter((project) => project.capabilities[0] === capability)
    })).filter((section) => section.projects.length > 0)

    return (
        <div className="space-y-10">
            <header className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{workContent.heading}</h1>
                <p className="max-w-2xl text-white/70">{workContent.intro}</p>
            </header>

            {projectSections.length > 0 ? (
                <div className="space-y-10">
                    {projectSections.map((section) => (
                        <section key={section.capability} className="space-y-4" aria-labelledby={capabilityId(section.capability)}>
                            <h2 id={capabilityId(section.capability)} className="text-2xl font-semibold tracking-tight">
                                {capabilityLabel(lang, section.capability)}
                            </h2>
                            <ul role="list" className="grid gap-4 md:grid-cols-2">
                                {section.projects.map((project) => (
                                    <li
                                        key={project.slug}
                                        className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                                    >
                                        <ProjectCardPreview lang={lang} project={project} />
                                        <div className="flex flex-1 flex-col gap-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <CapabilityChips lang={lang} capabilities={project.capabilities} />
                                            </div>
                                            <h3 className="text-xl font-semibold tracking-tight">
                                                <Link
                                                    href={localizedPath(lang, `/work/${project.slug}`)}
                                                    data-tracking={`portfolio_item_${project.slug}`}
                                                    className="static outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-white/30"
                                                >
                                                    {project.title}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-white/70">{project.summary}</p>
                                            <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                                                <Link
                                                    href={localizedPath(lang, `/work/${project.slug}`)}
                                                    data-tracking={`portfolio_item_${project.slug}`}
                                                    className="relative z-10 inline-flex w-fit items-center justify-center gap-1 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                                                >
                                                    {`${work.viewCaseStudy} `}
                                                    <span aria-hidden="true">→</span>
                                                </Link>
                                                {project.liveUrl ? (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        data-tracking={`portfolio_item_${project.slug}_live`}
                                                        className="relative z-10 inline-flex w-fit items-center justify-center gap-1 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                                    >
                                                        {`${links.visitLiveSite} `}
                                                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                                                        <span className="sr-only">{links.opensInNewTab}</span>
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
                <p className="text-sm text-white/60">{workContent.emptyStateMessage}</p>
            )}
        </div>
    )
}
