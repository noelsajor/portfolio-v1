import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const CASE_STUDIES_DIR = path.join(process.cwd(), 'src', 'content', 'case-studies')

export type CaseStudyFrontmatter = {
    title: string
    type?: string
    role?: string
    summary?: string
    year?: string | number
}

export type CaseStudyFile = {
    slug: string
    frontmatter: CaseStudyFrontmatter
    content: string
}

export function getCaseStudySlugs() {
    if (!fs.existsSync(CASE_STUDIES_DIR)) return []
    return fs
        .readdirSync(CASE_STUDIES_DIR)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => f.replace(/\.mdx$/, ''))
}

export function getCaseStudyBySlug(slug: string): CaseStudyFile | null {
    const fullPath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) return null

    const file = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(file)

    return {
        slug,
        frontmatter: data as CaseStudyFrontmatter,
        content
    }
}
