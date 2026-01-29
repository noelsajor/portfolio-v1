import Link from 'next/link'
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'

type Params = { params: { slug: string } }

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export default function CaseStudyPage({ params }: Params) {
    const project = projects.find((p) => p.slug === params.slug)
    if (!project) return notFound()

    return (
        <div className="space-y-10">
            <Link href="/work" className="text-sm font-semibold text-white/70 hover:text-white">
                ← Back to work
            </Link>

            <header className="space-y-3">
                <p className="text-xs font-semibold tracking-wide text-white/70">{project.type}</p>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{project.name}</h1>
                <p className="text-white/70">{project.role}</p>
                <p className="max-w-2xl text-white/70">{project.summary}</p>
            </header>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold">Case study content coming next</h2>
                <p className="mt-2 text-sm text-white/70">
                    In Phase 2 we’ll add: context → problem → strategy → designs → Shopify implementation → outcome.
                </p>
            </section>
        </div>
    )
}
