import Image from 'next/image'
import type { CaseStudyFrontmatter } from '@/lib/projects'
import type { Locale } from '@/lib/i18n'
import { capabilityLabel, projectTypeLabel } from '@/lib/project-labels'

type ProjectCardPreviewProps = {
    lang: Locale
    project: CaseStudyFrontmatter
    // 'landscape' (16:9, the default) for card grids; 'portrait' (9:16) for
    // the home carousel, where three tall cards fit side by side.
    aspect?: 'landscape' | 'portrait'
}

const ASPECT = {
    landscape: { className: 'aspect-[16/9]', width: 960, height: 540, sizes: '(min-width: 768px) 50vw, 100vw' },
    portrait: { className: 'aspect-[9/16]', width: 540, height: 960, sizes: '(min-width: 768px) 33vw, 60vw' }
} as const

export function ProjectCardPreview({ lang, project, aspect = 'landscape' }: ProjectCardPreviewProps) {
    const primaryCapability = project.capabilities[0]
    const ratio = ASPECT[aspect]

    return (
        <div className="relative -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl border-b border-white/10 bg-zinc-950/80">
            {project.coverImage ? (
                <Image
                    src={project.coverImage}
                    alt={project.coverAlt ?? project.title}
                    width={ratio.width}
                    height={ratio.height}
                    sizes={ratio.sizes}
                    className={`${ratio.className} w-full object-cover transition duration-300 group-hover:scale-[1.02]`}
                />
            ) : (
                <div className={`relative flex ${ratio.className} min-h-40 flex-col justify-end overflow-hidden p-4`} aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02)_46%,rgba(255,255,255,0.08))]" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="relative space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{projectTypeLabel(lang, project.type)}</p>
                        <p className="max-w-48 text-lg font-semibold leading-tight text-white">{capabilityLabel(lang, primaryCapability)}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
