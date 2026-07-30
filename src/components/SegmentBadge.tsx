import type { ProjectFrontmatter } from '@/lib/projects'
import { Chip } from '@/components/Chip'

export function SegmentBadge({ segment }: { segment: ProjectFrontmatter['segment'] }) {
    if (!segment) return null

    return <Chip variant="secondary">{segment}</Chip>
}
