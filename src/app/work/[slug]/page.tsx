import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import { mdxComponents } from '@/components/mdx/mdx-components'
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects'
import { absoluteUrl, defaultOgImage, siteConfig } from '@/lib/site-config'
import { SegmentBadge } from '@/components/SegmentBadge'
import { Chip } from '@/components/Chip'

export function generateStaticParams() {
    return getProjectSlugs().map((slug) => ({ slug }))
}

// Only slugs returned by generateStaticParams are servable — an unknown or
// template slug 404s instead of being rendered on demand.
export const dynamicParams = false

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const data = getProjectBySlug(slug)
    if (!data) return {}

    const { frontmatter } = data
    const description = frontmatter.seoDescription ?? frontmatter.summary
    const url = absoluteUrl(`/work/${slug}`)

    // Existing seoTitle values already end in " | Jose Leon" (authored before
    // the root layout had a title template). Strip that suffix for the page
    // `title` so the template doesn't append it twice; Open Graph/Twitter
    // don't use the template, so they keep the full authored title as-is.
    const fullTitle = frontmatter.seoTitle ?? frontmatter.title
    const shortTitle = fullTitle.replace(/\s*\|\s*Jose Leon\s*$/, '')

    // Falls back to the default site-wide OG image until a real, approved
    // per-project cover image exists (see coverImage/coverAlt in the schema).
    const ogImage = frontmatter.coverImage
        ? { url: absoluteUrl(frontmatter.coverImage), width: 1200, height: 630, alt: frontmatter.coverAlt ?? fullTitle }
        : defaultOgImage

    return {
        title: shortTitle,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: 'article',
            url,
            siteName: siteConfig.name,
            title: fullTitle,
            description,
            locale: siteConfig.locale,
            images: [ogImage]
        },
        // No title/description here — see the matching comment in
        // buildPageMetadata() (site-config.ts): Next's Metadata API fills
        // these from openGraph automatically when omitted.
        twitter: {
            card: 'summary_large_image',
            images: [ogImage.url]
        }
    }
}

export default async function CaseStudyPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const data = getProjectBySlug(slug)
    if (!data) return notFound()

    const { frontmatter, content } = data
    const readyGalleryItems = (frontmatter.gallery ?? []).filter(
        (item): item is typeof item & { src: string } => item.status === 'ready' && Boolean(item.src)
    )

    return (
        <div className="space-y-10">
            <Link
                href="/work"
                className="rounded-sm text-sm font-semibold text-white/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
                <span aria-hidden="true">←</span> Back to work
            </Link>

            <header className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                    <Chip variant="primary">{frontmatter.type}</Chip>
                    <SegmentBadge segment={frontmatter.segment} />
                    {frontmatter.industry ? (
                        <p className="text-xs font-semibold tracking-wide text-white/70">{frontmatter.industry}</p>
                    ) : null}
                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{frontmatter.title}</h1>
                        {frontmatter.liveUrl ? (
                            <Link
                                href={frontmatter.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus:outline-none focus:ring-2 focus:ring-white/30"
                            >
                                Visit live site
                                <span aria-hidden="true">↗</span>
                                <span className="sr-only"> (opens in a new tab)</span>
                            </Link>
                        ) : null}

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">The Problem</p>
                                <p className="mt-1 text-sm text-white/80">{frontmatter.challenge}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">The Solution</p>
                                <p className="mt-1 text-sm text-white/80">{frontmatter.outcome}</p>
                            </div>
                            {frontmatter.duration ? (
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Timeline</p>
                                    <p className="mt-1 text-sm text-white/80">{frontmatter.duration}</p>
                                </div>
                            ) : null}
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">My Role</p>
                                <p className="mt-1 text-sm text-white/80">{frontmatter.roles.join(' · ')}</p>
                                {frontmatter.team ? <p className="mt-1 text-xs text-white/60">{frontmatter.team}</p> : null}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 lg:self-start">
                        <p className="text-sm font-semibold text-white/80">Want to ask me a question?</p>
                        <div className="flex flex-wrap gap-2">
                            <Chip variant="primary" href="#challenge">
                                What problem was this solving?
                            </Chip>
                            <Chip variant="primary" href="#my-contributions">
                                What was your role here?
                            </Chip>
                            <Chip variant="primary" href="#outcome">
                                How did you define success?
                            </Chip>
                            <Chip variant="primary" href="#solution">
                                What was your approach?
                            </Chip>
                        </div>
                    </div>
                </div>

                {frontmatter.coverImage ? (
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                        <Image
                            src={frontmatter.coverImage}
                            alt={frontmatter.coverAlt ?? frontmatter.title}
                            width={1600}
                            height={900}
                            className="h-auto w-full"
                            priority
                        />
                    </div>
                ) : null}

                <p className="max-w-2xl text-lg text-white/80">{frontmatter.summary}</p>
            </header>

            <article className="prose prose-invert max-w-none">
                <MDXRemote
                    source={content}
                    components={mdxComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
                        }
                    }}
                />
            </article>

            {readyGalleryItems.length > 0 ? (
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Gallery</h2>
                    {/* Columns, not a grid: gallery images mix landscape and
                        portrait (e.g. mobile screenshots) sources, and a grid
                        forces row-pairing that leaves awkward gaps next to a
                        tall image. Columns let each item flow to its own
                        natural height instead. */}
                    <div className="columns-1 gap-4 md:columns-2">
                        {readyGalleryItems.map((item) => (
                            <div
                                key={item.id}
                                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt ?? item.id}
                                    width={960}
                                    height={540}
                                    className="h-auto w-full"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}
        </div>
    )
}
