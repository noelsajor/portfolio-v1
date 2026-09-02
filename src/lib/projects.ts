import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { projectFrontmatterSchema, type ProjectFrontmatter, type GalleryItem } from './project-schema'
import { DEFAULT_LOCALE, type Locale } from './i18n'

// The slug catalog (getProjectSlugs) always reads from `en` — see the
// comment above getProjectSlugs() for why that's locale-independent by
// design. Per-file content resolution goes through resolveProjectFilePath()
// below instead, which falls back to `en` per slug when no `es` file exists
// yet (see src/content/es/case-studies/.gitkeep — no Spanish MDX exists as
// of PR 5, so every slug currently falls back to English content).
const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content')
const PROJECTS_DIR = path.join(CONTENT_ROOT, 'en', 'case-studies')

/** Filenames starting with `_` are internal templates, never exposed to visitors. */
function isTemplateSlug(slug: string): boolean {
    return slug.startsWith('_')
}

// Lowercase, digits, single hyphens between segments — the same shape as the
// real slugs today ("brand-website-build", "d2c-wellness-storefront", etc). Nothing currently enforced this:
// any filename produced a "valid" slug and therefore a servable URL, so a
// typo'd or inconsistently-cased filename (e.g. "My Project!.mdx") would
// have silently shipped an ugly, non-canonical /work/... URL.
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

function assertValidSlug(slug: string, filename: string): void {
    if (!SLUG_PATTERN.test(slug)) {
        throw new Error(
            `Invalid case-study filename "${filename}": derived slug "${slug}" must be lowercase letters, digits, and single hyphens only (e.g. "example-project.mdx").`
        )
    }
}

export type { GalleryItem, ProjectFrontmatter }
// `slug` is added here, not in the schema — it's derived from the
// filename, never authored in frontmatter, so it isn't part of what
// gets validated.
export type CaseStudyFrontmatter = ProjectFrontmatter & { slug: string }

export type CaseStudy = {
    frontmatter: CaseStudyFrontmatter
    content: string
}

function isPublished(project: CaseStudyFrontmatter): boolean {
    return (project.status ?? 'published') === 'published'
}

/** Resolves the on-disk path for a single slug's content in `lang`, falling
 *  back to `en` when no locale-specific file exists yet. Per-file fallback
 *  (not per-directory) is deliberate: a future PR can translate case
 *  studies one at a time by dropping a matching .mdx into
 *  src/content/es/case-studies/ without needing every slug translated at
 *  once. */
function resolveProjectFilePath(lang: Locale, slug: string): string {
    const localizedPath = path.join(CONTENT_ROOT, lang, 'case-studies', `${slug}.mdx`)
    if (fs.existsSync(localizedPath)) return localizedPath
    return path.join(CONTENT_ROOT, 'en', 'case-studies', `${slug}.mdx`)
}

/** Content is external, untrusted input: this is the only place frontmatter
 *  is parsed, and every field is validated here before anything else in the
 *  app can see it. A malformed file throws immediately with the filename,
 *  slug, failing field(s), and a human-readable reason — the build/dev
 *  server fails loudly rather than silently publishing or dropping bad data. */
function readProjectFile(lang: Locale, slug: string): CaseStudy | null {
    const fullPath = resolveProjectFilePath(lang, slug)
    const filename = path.basename(fullPath)
    if (!fs.existsSync(fullPath)) return null

    const file = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(file)

    const result = projectFrontmatterSchema.safeParse(data)
    if (!result.success) {
        const reasons = result.error.issues
            .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
            .join('\n')
        throw new Error(`Invalid case-study frontmatter in "${filename}" (slug: "${slug}"):\n${reasons}`)
    }

    return {
        frontmatter: { ...result.data, slug },
        content
    }
}

function readAllProjects(lang: Locale): CaseStudy[] {
    return getProjectSlugs({ includeDrafts: true })
        .map((slug) => readProjectFile(lang, slug))
        .filter((file): file is CaseStudy => Boolean(file))
}

/** Slugs eligible for static generation. Drafts are excluded by default so
 *  they are never built as public routes.
 *
 *  Deliberately lang-independent: the catalog of *which* slugs are
 *  published is the same across every locale ("stable slugs across
 *  locales" — see docs/bilingual-seo-migration-plan.md). Only the content
 *  behind each slug varies by locale (via readProjectFile's fallback), not
 *  the set of slugs itself. This keeps work/[slug]/page.tsx's
 *  generateStaticParams() — getProjectSlugs().map((slug) => ({ slug })) —
 *  lang-independent too, so Next.js can multiply it against the parent
 *  [lang] static params (7 slugs × 2 locales = 14 pages) without this
 *  function needing to know about lang at all. */
export function getProjectSlugs({ includeDrafts = false }: { includeDrafts?: boolean } = {}): string[] {
    if (!fs.existsSync(PROJECTS_DIR)) return []
    return fs
        .readdirSync(PROJECTS_DIR)
        .filter((f) => f.endsWith('.mdx') && !isTemplateSlug(f))
        .map((f) => {
            const slug = f.replace(/\.mdx$/, '')
            assertValidSlug(slug, f)
            return slug
        })
        .map((slug) => readProjectFile(DEFAULT_LOCALE, slug))
        .filter((file): file is CaseStudy => Boolean(file))
        .filter((file) => includeDrafts || isPublished(file.frontmatter))
        .map((file) => file.frontmatter.slug)
}

export function getProjects(
    lang: Locale = DEFAULT_LOCALE,
    { includeDrafts = false }: { includeDrafts?: boolean } = {}
): CaseStudyFrontmatter[] {
    return readAllProjects(lang)
        .map((file) => file.frontmatter)
        .filter((project) => includeDrafts || isPublished(project))
        .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
}

/** Featured projects, in the same publication + ordering contract as getProjects(). Callers decide how many to display. */
export function getFeaturedProjects(
    lang: Locale = DEFAULT_LOCALE,
    { includeDrafts = false }: { includeDrafts?: boolean } = {}
): CaseStudyFrontmatter[] {
    return getProjects(lang, { includeDrafts }).filter((project) => project.featured === true)
}

/** Same publication contract as getProjects()/getProjectSlugs(): drafts excluded unless includeDrafts is set. */
export function getProjectBySlug(
    slug: string,
    lang: Locale = DEFAULT_LOCALE,
    { includeDrafts = false }: { includeDrafts?: boolean } = {}
): CaseStudy | null {
    if (isTemplateSlug(slug)) return null

    const file = readProjectFile(lang, slug)
    if (!file) return null
    if (!includeDrafts && !isPublished(file.frontmatter)) return null

    return file
}
