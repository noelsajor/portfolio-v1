import Link from 'next/link'
import type { Metadata } from 'next'
import { buildPageMetadata, siteConfig } from '@/lib/site-config'
import { getProjects } from '@/lib/projects'
import { resumeContent as resumeContentEn } from '@/content/en/static-pages'
import { resumeContent as resumeContentEs } from '@/content/es/static-pages'
import { DEFAULT_LOCALE, isLocale, localizedPath } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    return buildPageMetadata({
        title: 'Resume',
        description:
            'Jose Leon — Multidisciplinary Designer & Front-End Production Specialist. Skills, experience, and selected work for recruiters and hiring managers.',
        path: '/resume',
        lang
    })
}

const linkClass =
    'rounded-sm text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30'

export default async function ResumePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const resumeContent = lang === 'es' ? resumeContentEs : resumeContentEn
    const { skillGroups, experience } = resumeContent
    const projects = getProjects(lang)

    return (
        <div className="space-y-12">
            <header className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">{resumeContent.eyebrow}</p>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{resumeContent.name}</h1>
                <p className="max-w-2xl text-lg text-white/80">{resumeContent.title}</p>
                <p className="max-w-2xl text-white/70">{resumeContent.intro}</p>
                {/* PR 5: CTA buttons with href/download/data-tracking attributes — left as JSX; localize in place when real Spanish copy lands */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                        href={`mailto:${siteConfig.email}`}
                        className="inline-flex w-fit items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                        data-tracking="resume_email_cta"
                    >
                        Reach out about a role
                    </Link>
                    <Link
                        href="/resume.pdf"
                        download="Jose-Leon-Resume.pdf"
                        className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                        data-tracking="resume_download_cta"
                    >
                        Download CV
                    </Link>
                </div>
            </header>

            <section className="space-y-4">
                <h2 className="text-lg font-semibold">{resumeContent.skillsHeading}</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                    {skillGroups.map((group) => (
                        <div key={group.title} className="space-y-2">
                            <h3 className="text-sm font-semibold text-white/90">{group.title}</h3>
                            <ul className="flex flex-wrap gap-2 text-sm text-white/70">
                                {group.skills.map((skill) => (
                                    <li key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-lg font-semibold">{resumeContent.experienceHeading}</h2>
                <ul className="space-y-5">
                    {experience.map((role) => (
                        <li key={role.title} className="space-y-1">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <p className="font-semibold text-white">{role.title}</p>
                                <p className="text-sm text-white/60">{role.period}</p>
                            </div>
                            <p className="text-sm text-white/80">{role.role}</p>
                            <p className="text-sm text-white/70">{role.detail}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {projects.length > 0 ? (
                <section className="space-y-3">
                    <h2 className="text-lg font-semibold">{resumeContent.selectedWorkHeading}</h2>
                    <ul className="space-y-2 text-sm">
                        {projects.map((project) => (
                            <li key={project.slug}>
                                <Link href={localizedPath(lang, `/work/${project.slug}`)} className={linkClass}>
                                    {project.title} — {project.summary}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                        <Link href={localizedPath(lang, '/work')} className={linkClass}>
                            {resumeContent.seeAllWorkLabel}
                        </Link>
                        <Link href={siteConfig.sameAs.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            {resumeContent.githubLabel}
                        </Link>
                    </div>
                </section>
            ) : null}

            <section className="space-y-3">
                <h2 className="text-lg font-semibold">{resumeContent.getInTouchHeading}</h2>
                <p className="text-white/70">{resumeContent.getInTouchIntro}</p>
                {/* PR 5: contains a data-tracking mailto Link — left as JSX; localize in place when real Spanish copy lands */}
                <Link href={`mailto:${siteConfig.email}`} className={linkClass} data-tracking="resume_email_link">
                    {siteConfig.email}
                </Link>
            </section>
        </div>
    )
}
