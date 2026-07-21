import Link from 'next/link'
import { getProjects } from '@/lib/projects'

export const metadata = {
    title: 'Work — Jose Leon',
    description: 'Selected Shopify and e-commerce case studies.'
}

export default function WorkPage() {
    const projects = getProjects()

    return (
        <div className="space-y-10">
            <header className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Work</h1>
                <p className="max-w-2xl text-white/70">
                    A curated set of Shopify and e-commerce projects focused on conversion, clarity, and scalable implementation.
                </p>
            </header>

            {projects.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {projects.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/work/${project.slug}`}
                            data-tracking={`portfolio_item_${project.slug}`}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                            <div className="space-y-2">
                                <p className="text-xs font-semibold tracking-wide text-white/70">{project.type}</p>
                                <h2 className="text-xl font-semibold tracking-tight">{project.title}</h2>
                                <p className="text-sm text-white/70">{project.summary}</p>
                                <p className="text-sm font-semibold text-white/70">View case study →</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-white/60">No projects published yet.</p>
            )}
        </div>
    )
}
