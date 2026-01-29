import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import { mdxComponents } from '@/components/mdx/mdx-components'
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/mdx'

export function generateStaticParams() {
    return getCaseStudySlugs().map((slug) => ({ slug }))
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    const data = getCaseStudyBySlug(params.slug)
    if (!data) return notFound()

    const { frontmatter, content } = data

    return (
        <div className="space-y-10">
            <Link href="/work" className="text-sm font-semibold text-white/70 hover:text-white">
                ← Back to work
            </Link>

            <header className="space-y-2">
                <p className="text-xs font-semibold tracking-wide text-white/70">{frontmatter.type ?? 'Case Study'}</p>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{frontmatter.title}</h1>
                {frontmatter.role ? <p className="text-white/70">{frontmatter.role}</p> : null}
                {frontmatter.summary ? <p className="max-w-2xl text-white/70">{frontmatter.summary}</p> : null}
            </header>

            <article className="prose prose-invert max-w-none">
                <MDXRemote
                    source={content}
                    components={mdxComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [
                                rehypeSlug,
                                [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                            ]
                        }
                    }}
                />
            </article>
        </div>
    )
}
