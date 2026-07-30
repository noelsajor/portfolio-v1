import type { ProjectFrontmatter } from '@/lib/projects'

export function SegmentBadge({ segment }: { segment: ProjectFrontmatter['segment'] }) {
    if (!segment) return null

    return (
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/60">
            {segment}
        </span>
    )
}
