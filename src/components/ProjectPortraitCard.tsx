import Link from 'next/link'
import type { CaseStudyFrontmatter } from '@/lib/projects'
import { localizedPath, type Locale } from '@/lib/i18n'
import { CapabilityChips } from '@/components/CapabilityChips'
import { ProjectCardPreview } from '@/components/ProjectCardPreview'

// Inner content of the portrait project card used by the home carousel and
// the /work index: 9:16 preview, one non-wrapping row of chips, and a
// two-line title slot (line-clamp + min-height) so cards line up whatever
// the title length. The title link overlays the whole card, so the wrapper
// that renders this must be `group relative` with the shared card classes.
export const PROJECT_CARD_CLASS = 'group relative flex flex-col rounded-2xl border border-white/10 bg-black p-5 transition hover:bg-white/5'

export function ProjectPortraitCardBody({
    lang,
    project,
    tracking,
    tabbable = true
}: {
    lang: Locale
    project: CaseStudyFrontmatter
    // data-tracking value for the card link.
    tracking: string
    // false for aria-hidden clones (the carousel's looping copies).
    tabbable?: boolean
}) {
    return (
        <>
            <ProjectCardPreview lang={lang} project={project} aspect="portrait" />
            <div className="flex flex-col gap-3">
                <div className="flex h-7 shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap [&>*]:shrink-0">
                    <CapabilityChips lang={lang} capabilities={project.capabilities} />
                </div>
                <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-7 tracking-tight group-hover:text-white">
                    <Link
                        href={localizedPath(lang, `/work/${project.slug}`)}
                        data-tracking={tracking}
                        tabIndex={tabbable ? undefined : -1}
                        className="static outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-white/30"
                    >
                        {project.title}
                    </Link>
                </h3>
            </div>
        </>
    )
}
