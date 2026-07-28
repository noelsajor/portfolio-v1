import Link from 'next/link'
import { buildPageMetadata, siteConfig } from '@/lib/site-config'
import { getProjects } from '@/lib/projects'

export const metadata = buildPageMetadata({
    title: 'Resume',
    description:
        'Jose Leon — multidisciplinary designer and front-end developer. Background and selected work for recruiters and hiring managers.',
    path: '/resume'
})

const linkClass =
    'rounded-sm text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30'

export default function ResumePage() {
    const projects = getProjects()

    return (
        <div className="space-y-10">
            <header className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Resume</h1>
                <p className="max-w-2xl text-white/70">
                    For recruiters and hiring managers evaluating contract, short-term, or permanent roles.
                </p>
            </header>

            <section className="space-y-4">
                <p className="max-w-2xl text-white/80">
                    I&apos;m Jose Leon, a multidisciplinary designer and front-end developer with more than a decade of
                    experience across branding, UI/UX, e-commerce, digital products and web implementation.
                </p>
                <ul className="grid max-w-2xl gap-x-6 gap-y-2 text-sm text-white/70 sm:grid-cols-2">
                    <li>10+ years across design and digital production</li>
                    <li>Shopify, UI/UX and front-end execution</li>
                    <li>Remote experience with international teams</li>
                    <li>AI-assisted workflow, human-reviewed output</li>
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
                    <Link href="/work" className={`inline-block text-sm font-semibold ${linkClass}`}>
                        See all work →
                    </Link>
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
