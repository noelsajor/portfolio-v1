import Link from 'next/link'
import { homeContent } from '@/content/home'

export function AboutPreviewSection() {
    const { aboutPreview } = homeContent

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{aboutPreview.heading}</h2>
            <div className="max-w-2xl space-y-4 text-white/70">
                {aboutPreview.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </div>
            <Link
                href={aboutPreview.cta.href}
                data-tracking="about_preview_more"
                className="inline-flex w-fit items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
                {aboutPreview.cta.label}
            </Link>
        </section>
    )
}
