import type { Metadata } from 'next'
import { PROJECT_CAPABILITIES } from '@/lib/project-schema'
import { getProjects } from '@/lib/projects'
import { buildPageMetadata } from '@/lib/site-config'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { PROJECT_CARD_CLASS, ProjectPortraitCardBody } from '@/components/ProjectPortraitCard'
import { workContent as workContentEn } from '@/content/en/static-pages'
import { workContent as workContentEs } from '@/content/es/static-pages'
import { capabilityLabel } from '@/lib/project-labels'
import { JsonLd } from '@/components/JsonLd'
import { buildPageNode, localizedAbsoluteUrl } from '@/lib/page-schema'
import { buildItemListSchema } from '@/lib/structured-data'

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
    const projects = getProjects(lang)
    const projectSections = PROJECT_CAPABILITIES.map((capability) => ({
        capability,
        projects: projects.filter((project) => project.capabilities[0] === capability)
    })).filter((section) => section.projects.length > 0)

    // CollectionPage + an ItemList of every published case study in this
    // locale, so the index is machine-readable as "these are the projects",
    // not only a wall of cards.
    const { metadata } = workContent
    const jsonLd = [
        buildPageNode({
            lang,
            path: '/work',
            title: metadata.title,
            description: metadata.description,
            type: 'CollectionPage',
            trail: [{ name: metadata.title, path: '/work' }]
        }),
        buildItemListSchema({
            name: metadata.title,
            items: projects.map((project) => ({
                name: project.title,
                url: localizedAbsoluteUrl(lang, `/work/${project.slug}`)
            }))
        })
    ]

    return (
        <div className="space-y-10">
            <JsonLd nodes={jsonLd} />
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
                            {/* Same portrait card as the home carousel, in a static grid. */}
                            <ul role="list" className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {section.projects.map((project) => (
                                    <li key={project.slug} className={PROJECT_CARD_CLASS}>
                                        <ProjectPortraitCardBody lang={lang} project={project} tracking={`portfolio_item_${project.slug}`} />
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
