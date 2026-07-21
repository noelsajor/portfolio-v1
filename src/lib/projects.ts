import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const PROJECTS_DIR = path.join(process.cwd(), 'src', 'content', 'case-studies')

/** Filenames starting with `_` are internal templates, never exposed to visitors. */
function isTemplateSlug(slug: string): boolean {
    return slug.startsWith('_')
}

export type GalleryItem = {
    id: string
    status?: 'pending' | 'ready'
    src?: string
    alt?: string
}

export type Project = {
    slug: string
    title: string
    client?: string
    type: 'E-commerce' | 'Product Design' | 'Marketing Website' | 'Design System'
    roles: string[]
    summary: string
    services: string[]
    year?: string
    featured?: boolean
    /** Deterministic display order across the homepage and /work. Lower sorts first; missing sorts last. */
    order?: number
    /** Defaults to 'published' when omitted. 'draft' projects are excluded from getProjects() unless includeDrafts is set. */
    status?: 'draft' | 'published'
    coverImage: string
    coverAlt: string
    liveUrl?: string
    repositoryUrl?: string
    /** Optional industry/sector label shown alongside other project metadata. */
    industry?: string
    /** Optional SEO overrides for the case study route; falls back to title/summary when omitted. */
    seoTitle?: string
    seoDescription?: string
    /** Optional supporting images beyond the cover image. Entries without a real `src` render as a pending placeholder. */
    gallery?: GalleryItem[]
}

export type CaseStudyFrontmatter = Project & {
    challenge: string
    outcome: string
    duration?: string
    team?: string
}

export type CaseStudy = {
    frontmatter: CaseStudyFrontmatter
    content: string
}

function isPublished(project: Project): boolean {
    return (project.status ?? 'published') === 'published'
}

function readProjectFile(slug: string): CaseStudy | null {
    const fullPath = path.join(PROJECTS_DIR, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) return null

    const file = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(file)

    return {
        frontmatter: { ...(data as Omit<CaseStudyFrontmatter, 'slug'>), slug },
        content
    }
}

function readAllProjects(): CaseStudy[] {
    if (!fs.existsSync(PROJECTS_DIR)) return []
    return fs
        .readdirSync(PROJECTS_DIR)
        .filter((f) => f.endsWith('.mdx') && !isTemplateSlug(f))
        .map((f) => f.replace(/\.mdx$/, ''))
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
