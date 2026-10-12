import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'
import { localizedPath, type Locale } from '@/lib/i18n'
import { getUiContent } from '@/lib/ui-content'
import { ProjectCarousel } from '@/components/home/ProjectCarousel'

export function FeaturedWorkSection({ lang }: { lang: Locale }) {
    const homeContent = lang === 'es' ? homeContentEs : homeContentEn
    const { featuredWork } = homeContent
    const { links, carousel } = getUiContent(lang)

    // Every published case study, featured ones first (then the usual
    // `order`), so the carousel has enough cards to be worth scrolling.
    const projects = [...getProjects(lang)].sort((a, b) => Number(b.featured === true) - Number(a.featured === true))

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

            {projects.length > 0 ? (
                <ProjectCarousel
                    lang={lang}
                    projects={projects}
                    labels={{
                        ariaLabel: carousel.ariaLabel,
                        previous: carousel.previous,
                        next: carousel.next,
                        projectCta: featuredWork.projectCtaLabel,
                        visitLiveSite: links.visitLiveSite,
                        opensInNewTab: links.opensInNewTab
                    }}
                />
            ) : (
                <p className="text-sm text-white/60">{featuredWork.emptyStateMessage}</p>
            )}
        </section>
    )
}
