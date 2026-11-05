import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import { mdxComponents } from '@/components/mdx/mdx-components'
import { getPostBySlug, getPostSlugs, getPostTranslations } from '@/lib/posts'
import { absoluteUrl, defaultOgImage, siteConfig } from '@/lib/site-config'
import { DEFAULT_LOCALE, LOCALES, isLocale, localizedPath, type Locale } from '@/lib/i18n'
import { JsonLd } from '@/components/JsonLd'
import { buildBreadcrumbTrail, localizedAbsoluteUrl } from '@/lib/page-schema'
import { buildArticleSchema, buildWebPageSchema } from '@/lib/structured-data'

// Per-locale params, which is the blog's central difference from
// work/[slug]. Case studies share one slug catalog across locales and let
// Next multiply it against the parent [lang] params. Posts do not: an
// English-only post must generate /en/blog/<slug> and NOT /es/blog/<slug>,
// so this returns explicit { lang, slug } pairs instead of bare slugs.
export function generateStaticParams() {
    return LOCALES.flatMap((lang) => getPostSlugs(lang).map((slug) => ({ lang, slug })))
}

// Only the pairs above are servable; anything else 404s rather than being
// rendered on demand.
export const dynamicParams = false

/** Canonical plus the hreflang alternates that are actually safe to emit.
 *
 *  buildLocaleMetadataFields() in site-config.ts is not used here on
 *  purpose: it emits an alternate for every INDEXABLE_LOCALE unconditionally,
 *  which is correct for pages that exist in both locales by construction
 *  (/about, /work/<slug>) and wrong for posts, where /es/blog/<slug> may not
 *  exist at all. An hreflang pointing at a 404 is worse than no hreflang. */
function buildPostAlternates(lang: Locale, slug: string, translationKey: string | undefined) {
    const canonical = localizedAbsoluteUrl(lang, `/blog/${slug}`)
    const translations = getPostTranslations(translationKey)

    const languages: Record<string, string> = {}
    for (const locale of LOCALES) {
        const counterpart = locale === lang ? slug : translations[locale]
        if (counterpart) languages[locale] = localizedAbsoluteUrl(locale, `/blog/${counterpart}`)
    }

    // x-default only makes sense once there is more than one version to
    // choose between; it points at the default locale when that one exists.
    const hasPair = Object.keys(languages).length > 1
    if (hasPair && languages[DEFAULT_LOCALE]) languages['x-default'] = languages[DEFAULT_LOCALE]

    return { canonical, languages, hasPair }
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
    const { lang: rawLang, slug } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
    const post = getPostBySlug(slug, lang)
    if (!post) return {}

    const { frontmatter } = post
    const { canonical, languages } = buildPostAlternates(lang, slug, frontmatter.translationKey)

    const ogImage = frontmatter.coverImage
        ? {
              url: absoluteUrl(frontmatter.coverImage),
              width: 1200,
              height: 630,
              alt: frontmatter.coverAlt ?? frontmatter.title
          }
        : defaultOgImage

    return {
        title: frontmatter.title,
        description: frontmatter.description,
        alternates: { canonical, languages },
        openGraph: {
            type: 'article',
            url: canonical,
            siteName: siteConfig.name,
            title: `${frontmatter.title} | ${siteConfig.name}`,
            description: frontmatter.description,
            publishedTime: frontmatter.publishedAt,
            ...(frontmatter.updatedAt ? { modifiedTime: frontmatter.updatedAt } : {}),
            images: [ogImage]
        },
        twitter: { card: 'summary_large_image', images: [ogImage.url] }
    }
}

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ lang: string; slug: string }>
}) {
    const { lang: rawLang, slug } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    const post = getPostBySlug(slug, lang)
    if (!post) return notFound()

    const { frontmatter, content } = post
    const pageUrl = localizedAbsoluteUrl(lang, `/blog/${slug}`)

    const jsonLd = [
        buildWebPageSchema({
            lang,
            url: pageUrl,
            name: frontmatter.title,
            description: frontmatter.description,
            // No /blog index exists yet, so the trail stops at the post
            // rather than pointing a crumb at a route that would 404.
            breadcrumb: buildBreadcrumbTrail(lang, [
                { name: frontmatter.title, path: `/blog/${slug}` }
            ]),
            dateModified: frontmatter.updatedAt ?? frontmatter.publishedAt
        }),
        buildArticleSchema({
            lang,
            url: pageUrl,
            headline: frontmatter.title,
            description: frontmatter.description,
            ...(frontmatter.coverImage
                ? {
                      image: {
                          url: absoluteUrl(frontmatter.coverImage),
                          width: 1200,
                          height: 630,
                          alt: frontmatter.coverAlt
                      }
                  }
                : {}),
            dateModified: frontmatter.updatedAt ?? frontmatter.publishedAt,
            keywords: ['Shopify', 'Performance', 'Core Web Vitals', 'Shopify theme']
        })
    ]

    const published = new Date(`${frontmatter.publishedAt}T00:00:00Z`).toLocaleDateString(
        lang === 'es' ? 'es-ES' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }
    )

    return (
        <div className="space-y-10">
            <JsonLd nodes={jsonLd} />

            <header className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    <time dateTime={frontmatter.publishedAt}>{published}</time>
                </p>
                <h1 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
                    {frontmatter.title}
                </h1>
                <p className="max-w-2xl text-lg text-white/80">{frontmatter.description}</p>

                {/* The cover is the LCP element on this route, so it is
                    rendered eagerly with priority rather than lazily like the
                    in-body figures. */}
                {frontmatter.coverImage ? (
                    <figure className="mt-2">
                        <div className="overflow-hidden rounded-2xl border border-white/10">
                            <Image
                                src={frontmatter.coverImage}
                                alt={frontmatter.coverAlt ?? frontmatter.title}
                                width={1200}
                                height={630}
                                className="h-auto w-full"
                                priority
                            />
                        </div>
                        {frontmatter.coverCaption ? (
                            <figcaption className="mt-3 text-sm leading-relaxed text-white/60">
                                {frontmatter.coverCaption}
                            </figcaption>
                        ) : null}
                    </figure>
                ) : null}
            </header>

            {/* No `prose` class here: @tailwindcss/typography is not installed
                in this project, so `prose`/`prose-invert` would be inert. Every
                element is styled through mdxComponents instead. */}
            <article className="max-w-3xl">
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

            {frontmatter.relatedCaseStudy ? (
                <aside
                    data-reveal
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6"
                >
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                        {lang === 'es' ? 'Caso relacionado' : 'Related case study'}
                    </p>
                    <a
                        href={localizedPath(lang, `/work/${frontmatter.relatedCaseStudy}`)}
                        className="mt-1 inline-flex text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                        {lang === 'es'
                            ? 'Ver el caso de estudio completo'
                            : 'Read the full case study'}
                    </a>
                </aside>
            ) : null}
        </div>
    )
}
