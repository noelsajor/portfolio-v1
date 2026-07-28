import Link from 'next/link'
import { buildPageMetadata, siteConfig } from '@/lib/site-config'
import { getProjects } from '@/lib/projects'

export const metadata = buildPageMetadata({
    title: 'Resume',
    description:
        'Jose Leon — Multidisciplinary Designer & Front-End Production Specialist. Skills, experience, and selected work for recruiters and hiring managers.',
    path: '/resume'
})

const linkClass =
    'rounded-sm text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30'

const skillGroups = [
    {
        title: 'Design',
        skills: ['Figma', 'UI/UX Design', 'Responsive Design', 'Design Systems', 'Visual Design']
    },
    {
        title: 'Front End',
        skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'React', 'Next.js', 'Astro']
    },
    {
        title: 'Commerce',
        skills: ['Shopify Online Store 2.0', 'Liquid', 'Theme Customization', 'Product & Collection Templates', 'Metafields & Schema']
    },
    {
        title: 'Workflow',
        skills: [
            'Git & GitHub',
            'Accessibility-Aware Implementation',
            'Responsive QA',
            'AI-Assisted Production with Manual Review',
            'English and Spanish'
        ]
    }
]

const experience = [
    {
        title: 'iOTEK',
        role: 'UI/UX Design & Front-End Implementation (official title: Graphic Designer)',
        period: '2026 — ongoing, ~5–6 months to date',
        detail: 'Full-time remote. Brand identity system and bilingual production website for a multi-division IoT company.'
    },
    {
        title: 'NUUD Pleasures (via ASCENTMGMT)',
        role: 'Front-End Shopify Developer & UI/UX Designer',
        period: '2025, ~6–7 months',
        detail: 'Shopify storefront redesign for a direct-to-consumer brand relaunch.'
    }
]

export default function ResumePage() {
    const projects = getProjects()

    return (
        <div className="space-y-12">
            <header className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Resume</p>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Jose Leon</h1>
                <p className="max-w-2xl text-lg text-white/80">Multidisciplinary Designer &amp; Front-End Production Specialist</p>
                <p className="max-w-2xl text-white/70">
                    For recruiters and hiring managers evaluating contract, short-term, or permanent roles.
                </p>
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
                <h2 className="text-lg font-semibold">Skills</h2>
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
                <h2 className="text-lg font-semibold">Experience</h2>
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
                    <h2 className="text-lg font-semibold">Selected work</h2>
                    <ul className="space-y-2 text-sm">
                        {projects.map((project) => (
                            <li key={project.slug}>
                                <Link href={`/work/${project.slug}`} className={linkClass}>
                                    {project.title} — {project.summary}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                        <Link href="/work" className={linkClass}>
                            See all work →
                        </Link>
                        <Link href={siteConfig.sameAs.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            GitHub →
                        </Link>
                    </div>
                </section>
            ) : null}

            <section className="space-y-3">
                <h2 className="text-lg font-semibold">Get in touch</h2>
                <p className="text-white/70">Reach out directly about a role:</p>
                <Link href={`mailto:${siteConfig.email}`} className={linkClass} data-tracking="resume_email_link">
                    {siteConfig.email}
                </Link>
            </section>
        </div>
    )
}
