import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { projectFrontmatterSchema, type ProjectFrontmatter, type GalleryItem } from './project-schema'

const PROJECTS_DIR = path.join(process.cwd(), 'src', 'content', 'case-studies')

/** Filenames starting with `_` are internal templates, never exposed to visitors. */
function isTemplateSlug(slug: string): boolean {
    return slug.startsWith('_')
}

// Lowercase, digits, single hyphens between segments — the same shape as the
// two real slugs today ("iotek", "nuud"). Nothing currently enforced this:
// any filename produced a "valid" slug and therefore a servable URL, so a
// typo'd or inconsistently-cased filename (e.g. "My Project!.mdx") would
// have silently shipped an ugly, non-canonical /work/... URL.
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

function assertValidSlug(slug: string, filename: string): void {
    if (!SLUG_PATTERN.test(slug)) {
        throw new Error(
            `Invalid case-study filename "${filename}": derived slug "${slug}" must be lowercase letters, digits, and single hyphens only (e.g. "nuud-pleasures.mdx").`
        )
    }
}

export type { GalleryItem, ProjectFrontmatter }
// Kept as aliases for the exact on-disk shape: every real case study is
// read as a full CaseStudyFrontmatter, so these two names have always
// described the same object. `slug` is added here, not in the schema —
// it's derived from the filename, never authored in frontmatter, so it
// isn't part of what gets validated.
export type Project = ProjectFrontmatter & { slug: string }
export type CaseStudyFrontmatter = ProjectFrontmatter & { slug: string }

export type CaseStudy = {
    frontmatter: CaseStudyFrontmatter
    content: string
}

function isPublished(project: CaseStudyFrontmatter): boolean {
    return (project.status ?? 'published') === 'published'
}

/** Content is external, untrusted input: this is the only place frontmatter
 *  is parsed, and every field is validated here before anything else in the
 *  app can see it. A malformed file throws immediately with the filename,
 *  slug, failing field(s), and a human-readable reason — the build/dev
 *  server fails loudly rather than silently publishing or dropping bad data. */
function readProjectFile(slug: string): CaseStudy | null {
    const filename = `${slug}.mdx`
    const fullPath = path.join(PROJECTS_DIR, filename)
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

function readAllProjects(): CaseStudy[] {
    if (!fs.existsSync(PROJECTS_DIR)) return []
    return fs
        .readdirSync(PROJECTS_DIR)
        .filter((f) => f.endsWith('.mdx') && !isTemplateSlug(f))
        .map((f) => {
            const slug = f.replace(/\.mdx$/, '')
            assertValidSlug(slug, f)
            return slug
        })
        .map((slug) => readProjectFile(slug))
        .filter((file): file is CaseStudy => Boolean(file))
}

/** Slugs eligible for static generation. Drafts are excluded by default so they are never built as public routes. */
export function getProjectSlugs({ includeDrafts = false }: { includeDrafts?: boolean } = {}): string[] {
    return readAllProjects()
        .filter((file) => includeDrafts || isPublished(file.frontmatter))
        .map((file) => file.frontmatter.slug)
}

export function getProjects({ includeDrafts = false }: { includeDrafts?: boolean } = {}): CaseStudyFrontmatter[] {
    return readAllProjects()
        .map((file) => file.frontmatter)
        .filter((project) => includeDrafts || isPublished(project))
        .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
}

/** Featured projects, in the same publication + ordering contract as getProjects(). Callers decide how many to display. */
export function getFeaturedProjects({ includeDrafts = false }: { includeDrafts?: boolean } = {}): CaseStudyFrontmatter[] {
    return getProjects({ includeDrafts }).filter((project) => project.featured === true)
}

/** Same publication contract as getProjects()/getProjectSlugs(): drafts excluded unless includeDrafts is set. */
export function getProjectBySlug(
    slug: string,
    { includeDrafts = false }: { includeDrafts?: boolean } = {}
): CaseStudy | null {
    if (isTemplateSlug(slug)) return null

    const file = readProjectFile(slug)
    if (!file) return null
    if (!includeDrafts && !isPublished(file.frontmatter)) return null

    return file
}
