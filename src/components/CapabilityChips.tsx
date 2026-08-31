import { Chip } from '@/components/Chip'
import type { ProjectFrontmatter } from '@/lib/projects'

export function CapabilityChips({ capabilities }: { capabilities: ProjectFrontmatter['capabilities'] }) {
    return (
        <>
            {capabilities.map((capability, index) => (
                <Chip key={capability} variant={index === 0 ? 'primary' : 'secondary'}>
                    {capability}
                </Chip>
            ))}
        </>
    )
}
