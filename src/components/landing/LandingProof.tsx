import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/projects'

export function LandingProof({ heading }: { heading: string }) {
    const projects = getFeaturedProjects()

    if (projects.length === 0) return null

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{heading}</h2>
            <ul role="list" className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                    <li key={project.slug} className="h-full">
                        <Link
                            href={`/work/${project.slug}`}
                            data-tracking={`landing_proof_${project.slug}`}
                            className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                            <p className="text-xs font-semibold tracking-wide text-white/70">{project.type}</p>
                            <h3 className="mt-2 text-lg font-semibold tracking-tight">{project.title}</h3>
                            <p className="mt-2 text-sm text-white/70">{project.summary}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
