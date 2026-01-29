import Link from 'next/link'
import { projects } from '@/data/projects'

export default function HomePage() {
  const featured = projects.slice(0, 3)

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-6">
        <p className="text-sm font-semibold tracking-wide text-white/70">Senior UI/UX + Shopify Front-end</p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          I design and build conversion-driven Shopify experiences.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          I help e-commerce teams improve clarity, trust, and purchase confidence—turning complex products into
          simple, high-performing journeys across mobile and desktop.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/work"
            className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            View work
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Contact
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Selected work</h2>
          <Link href="/work" className="text-sm font-semibold text-white/70 hover:text-white">
            See all
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold tracking-wide text-white/70">{p.type}</p>
                  <p className="text-xs text-white/60">{p.role}</p>
                </div>
                <h3 className="text-lg font-semibold tracking-tight group-hover:text-white">{p.name}</h3>
                <p className="text-sm leading-relaxed text-white/70">{p.summary}</p>
                <p className="pt-2 text-sm font-semibold text-white/70 group-hover:text-white">
                  View case study →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
