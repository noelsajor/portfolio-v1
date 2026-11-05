import Link from 'next/link'
import type { Metadata } from 'next'

import { getPosts } from '@/lib/posts'
import { buildPageMetadata } from '@/lib/site-config'
import { DEFAULT_LOCALE, isLocale, localizedPath } from '@/lib/i18n'
import { getUiContent } from '@/lib/ui-content'
import { JsonLd } from '@/components/JsonLd'
import { buildPageNode, localizedAbsoluteUrl } from '@/lib/page-schema'
import { buildItemListSchema } from '@/lib/structured-data'

// The index exists in BOTH locales even when one has no posts, rendering an
// empty state instead. That is not cosmetic: the language switch in the
// header swaps the locale segment of whatever path you are on, so a Spanish
// reader on an English-only post needs /es/blog to be a real page. Without
// it the switch has nowhere to land.
//
// Unlike the post route, this page CAN use buildPageMetadata(): /blog exists
// in every locale by construction, so the unconditional hreflang alternates
// it emits are all valid.

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const { blog } = getUiContent(lang)

    return buildPageMetadata({
        title: blog.metaTitle,
        description: blog.metaDescription,
        path: '/blog',
        lang
    })
}

export default async function BlogIndexPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const { blog } = getUiContent(lang)
    const posts = getPosts(lang)

    const jsonLd = [
        buildPageNode({
            lang,
            path: '/blog',
            title: blog.metaTitle,
            description: blog.metaDescription,
            type: 'CollectionPage',
            trail: [{ name: blog.metaTitle, path: '/blog' }]
        }),
        ...(posts.length > 0
            ? [
                  buildItemListSchema({
                      name: blog.metaTitle,
                      items: posts.map((post) => ({
                          name: post.title,
                          url: localizedAbsoluteUrl(lang, `/blog/${post.slug}`)
                      }))
                  })
              ]
            : [])
    ]

    const dateFormat = new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    })

    return (
        <div className="space-y-10">
            <JsonLd nodes={jsonLd} />

            <header className="space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{blog.heading}</h1>
                <p className="max-w-2xl text-lg text-white/80">{blog.intro}</p>
            </header>

            {posts.length === 0 ? (
                <p className="text-white/60">{blog.empty}</p>
            ) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link
                                data-reveal
                                href={localizedPath(lang, `/blog/${post.slug}`)}
                                data-tracking={`blog_card_${post.slug}`}
                                className="group block rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-200 hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 md:p-6"
                            >
                                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                                    <time dateTime={post.publishedAt}>
                                        {dateFormat.format(new Date(`${post.publishedAt}T00:00:00Z`))}
                                    </time>
                                </p>
                                <h2 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
                                    {post.title}
                                </h2>
                                <p className="mt-3 max-w-2xl leading-relaxed text-white/70">{post.description}</p>
                                <span className="mt-4 inline-block text-sm text-white/60 underline decoration-white/20 underline-offset-4 group-hover:decoration-white/60">
                                    {blog.readingSuffix}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
