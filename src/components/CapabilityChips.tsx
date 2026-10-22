import { Chip } from '@/components/Chip'
import type { ProjectFrontmatter } from '@/lib/projects'
import type { Locale } from '@/lib/i18n'
import { capabilityLabel } from '@/lib/project-labels'

export function CapabilityChips({ lang, capabilities }: { lang: Locale; capabilities: ProjectFrontmatter['capabilities'] }) {
    return (
        <>
            {capabilities.map((capability, index) => (
                <Chip key={capability} variant={index === 0 ? 'primary' : 'secondary'}>
                    {capabilityLabel(lang, capability)}
                </Chip>
            ))}
        </>
    )
}
