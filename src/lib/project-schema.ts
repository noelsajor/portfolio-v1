import { z } from 'zod'

// The single source of truth for what a case-study MDX file's frontmatter
// is allowed to contain. Every field here reflects the current real
// content in src/content/case-studies/ (see iotek.mdx, nuud.mdx,
// _template.mdx) — nothing here is speculative.
//
// `.strict()`: unknown frontmatter keys are rejected. Both real case
// studies today use exactly this field set with no extension fields, so
// there's no legitimate case yet for allowing arbitrary extra keys —
// a stray/misspelled field should fail loudly instead of silently being
// ignored. If a future project genuinely needs a one-off field, extend
// this schema explicitly rather than loosening it to passthrough/strip.

export const PROJECT_TYPES = ['E-commerce', 'Product Design', 'Marketing Website', 'Design System'] as const

const galleryItemSchema = z
    .object({
        id: z.string().min(1, 'gallery item id is required'),
        status: z.enum(['pending', 'ready']).optional(),
        src: z.string().min(1).optional(),
        alt: z.string().min(1).optional()
    })
    .strict()

// Plain YYYY-MM-DD, not a full ISO datetime — this is a manually-authored
// field (see updatedAt below), and a bare date is what a content author can
// actually reason about and keep accurate without inventing a time-of-day.
const isoDateSchema = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be a YYYY-MM-DD date')
    .refine((value) => !Number.isNaN(Date.parse(value)), 'must be a real calendar date')

export const projectFrontmatterSchema = z
    .object({
        // Required — every current case study authors these.
        title: z.string().min(1, 'title is required'),
        type: z.enum(PROJECT_TYPES),
        roles: z.array(z.string().min(1)).min(1, 'at least one role is required'),
        summary: z.string().min(1, 'summary is required'),
        services: z.array(z.string().min(1)).min(1, 'at least one service is required'),
        challenge: z.string().min(1, 'challenge is required'),
        outcome: z.string().min(1, 'outcome is required'),

        // Optional — present on some but not all current case studies.
        client: z.string().min(1).optional(),
        // Intentionally a free-text string, not a date/number — the project
        // stores readable values like "2025", never an ISO date.
        year: z.string().min(1).optional(),
        featured: z.boolean().optional(),
        order: z.number().optional(),
        status: z.enum(['draft', 'published']).optional(),
        liveUrl: z.string().url('liveUrl must be a valid URL').optional(),
        repositoryUrl: z.string().url('repositoryUrl must be a valid URL').optional(),
        industry: z.string().min(1).optional(),
        seoTitle: z.string().min(1).optional(),
        seoDescription: z.string().min(1).optional(),
        // Optional and paired (see the refine below), unlike the original
        // design: neither field has a real UI consumer yet, and requiring
        // both forced content authors to fill them with fake placeholder
        // text ("TODO: placeholder...") just to satisfy the schema before a
        // real cover image existed. gallery items already solved this exact
        // problem correctly (optional src/alt) — this brings coverImage in
        // line with that same honest-when-not-ready pattern.
        coverImage: z.string().min(1).optional(),
        coverAlt: z.string().min(1).optional(),
        gallery: z.array(galleryItemSchema).optional(),
        // Intentionally a free-text string ("~6-7 months (2025)"), not a
        // structured duration — the project stores human-readable ranges.
        duration: z.string().min(1).optional(),
        team: z.string().min(1).optional(),
        // The date this case study's content was last meaningfully revised —
        // update it by hand when you materially edit a published case study
        // (not for typo fixes). Optional and omitted by default: a project
        // with no updatedAt simply has no lastModified entry in the sitemap,
        // which is more accurate than guessing. Never set this to "today" or
        // the build date — it must reflect a real edit.
        updatedAt: isoDateSchema.optional()
    })
    .strict()
    .refine((project) => Boolean(project.coverImage) === Boolean(project.coverAlt), {
        message: 'coverImage and coverAlt must both be set, or both omitted — never a real image with no alt text, or alt text with no image',
        path: ['coverAlt']
    })

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>
export type GalleryItem = z.infer<typeof galleryItemSchema>
