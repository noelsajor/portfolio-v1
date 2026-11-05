import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'
import { DEFAULT_LOCALE, LOCALES, type Locale } from './i18n'

// Blog posts deliberately do NOT follow the case-study locale-parity
// contract (src/lib/projects.ts + the parity assertions in
// scripts/validate-content.ts). That contract exists because a case study is
// one piece of work described twice: the same slug must resolve in every
// locale, falling back to the English file until a translation lands.
//
// A post is not that. An English post about Shopify performance debt and a
// Spanish post about something else are two articles written for two
// audiences, not two renderings of one article. Keyword research across
// Venezuela, Mexico, Colombia and Spain returned no meaningful volume for
// these terms in Spanish, so translating this one would create a URL that
// nothing links to and nobody searches for.
//
// Hence: the slug catalog is per-locale and there is NO cross-locale
// fallback. If src/content/es/blog/<slug>.mdx does not exist, /es/blog/<slug>
// does not exist either. Posts that genuinely are counterparts opt in by
// sharing a `translationKey`, and only then does the route emit hreflang
// alternates between them (see generateMetadata in
// src/app/[lang]/blog/[slug]/page.tsx). Emitting an alternate that points at
// a page which does not exist is worse than emitting none at all.
const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content')

function postsDir(lang: Locale): string {
    return path.join(CONTENT_ROOT, lang, 'blog')
}

/** Filenames starting with `_` are internal templates, never exposed to visitors. */
function isTemplateSlug(slug: string): boolean {
    return slug.startsWith('_')
}

// Same shape the case-study slugs enforce: lowercase, digits, single hyphens.
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function assertValidSlug(slug: string, filename: string): void {
    if (!SLUG_PATTERN.test(slug)) {
        throw new Error(
            `Invalid blog post filename "${filename}": derived slug "${slug}" must be lowercase letters, digits, and single hyphens only (e.g. "my-post.mdx").`
        )
    }
}

export const postFrontmatterSchema = z.object({
    title: z.string().min(1),
    /** Used as the meta description and the OG/Twitter description. */
    description: z.string().min(1),
    publishedAt: z.string().regex(ISO_DATE, 'must be an ISO date (YYYY-MM-DD)'),
    updatedAt: z.string().regex(ISO_DATE, 'must be an ISO date (YYYY-MM-DD)').optional(),
    coverImage: z.string().min(1).optional(),
    coverAlt: z.string().min(1).optional(),
    /** Optional caption rendered under the cover as a <figcaption>. */
    coverCaption: z.string().min(1).optional(),
    /** Opt-in pairing with a post in another locale. Both sides must carry
     *  the same value before either page emits an hreflang alternate. */
    translationKey: z.string().min(1).optional(),
    /** Slug of a case study this post should link back to, for internal
     *  linking. Validated as a string here; the route does not assume the
     *  target exists. */
    relatedCaseStudy: z.string().min(1).optional(),
    status: z.enum(['draft', 'published']).default('published')
})

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema> & { slug: string }

export type Post = {
    frontmatter: PostFrontmatter
    content: string
    /** Always equal to the requested locale: posts never fall back. */
    locale: Locale
}

function isPublished(post: PostFrontmatter): boolean {
    return post.status === 'published'
}

/** Content is external, untrusted input: this is the only place post
 *  frontmatter is parsed, and every field is validated before anything else
 *  in the app can see it. A malformed file throws with the filename, slug and
 *  failing field, so the build fails loudly rather than shipping bad data. */
function readPostFile(lang: Locale, slug: string): Post | null {
    if (isTemplateSlug(slug)) return null

    const fullPath = path.join(postsDir(lang), `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) return null

    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
    const result = postFrontmatterSchema.safeParse(data)
    if (!result.success) {
        const reasons = result.error.issues
            .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
            .join('\n')
        throw new Error(`Invalid blog frontmatter in "${slug}.mdx" (${lang}):\n${reasons}`)
    }

    return { frontmatter: { ...result.data, slug }, content, locale: lang }
}

/** Slugs published in THIS locale. Unlike getProjectSlugs(), this is
 *  deliberately lang-dependent — see the file header. */
export function getPostSlugs(lang: Locale, { includeDrafts = false }: { includeDrafts?: boolean } = {}): string[] {
    const dir = postsDir(lang)
    if (!fs.existsSync(dir)) return []

    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.mdx') && !isTemplateSlug(f))
        .map((f) => {
            const slug = f.replace(/\.mdx$/, '')
            assertValidSlug(slug, f)
            return slug
        })
        .map((slug) => readPostFile(lang, slug))
        .filter((post): post is Post => Boolean(post))
        .filter((post) => includeDrafts || isPublished(post.frontmatter))
        .map((post) => post.frontmatter.slug)
}

export function getPostBySlug(
    slug: string,
    lang: Locale,
    { includeDrafts = false }: { includeDrafts?: boolean } = {}
): Post | null {
    const post = readPostFile(lang, slug)
    if (!post) return null
    if (!includeDrafts && !isPublished(post.frontmatter)) return null
    return post
}

/** Newest first. Used by a future /blog index; kept here so the index does
 *  not re-derive the ordering rule. */
export function getPosts(lang: Locale, { includeDrafts = false }: { includeDrafts?: boolean } = {}): PostFrontmatter[] {
    return getPostSlugs(lang, { includeDrafts })
        .map((slug) => readPostFile(lang, slug))
        .filter((post): post is Post => Boolean(post))
        .map((post) => post.frontmatter)
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

/** Every locale in which a counterpart of this post exists, keyed by locale.
 *  Returns only locales whose post carries the SAME translationKey, which is
 *  what makes it safe for the route to emit an hreflang alternate. A post
 *  with no translationKey is its own island and gets a self-referencing
 *  canonical with no alternates. */
export function getPostTranslations(translationKey: string | undefined): Partial<Record<Locale, string>> {
    if (!translationKey) return {}

    const found: Partial<Record<Locale, string>> = {}
    for (const locale of LOCALES) {
        for (const slug of getPostSlugs(locale)) {
            const post = readPostFile(locale, slug)
            if (post?.frontmatter.translationKey === translationKey) {
                found[locale] = slug
                break
            }
        }
    }
    return found
}

export { DEFAULT_LOCALE }
