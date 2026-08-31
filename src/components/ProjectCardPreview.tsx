import Image from 'next/image'
import type { CaseStudyFrontmatter } from '@/lib/projects'

type ProjectCardPreviewProps = {
    project: CaseStudyFrontmatter
}

export function ProjectCardPreview({ project }: ProjectCardPreviewProps) {
    const primaryCapability = project.capabilities[0]

    return (
        <div className="relative -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl border-b border-white/10 bg-zinc-950/80">
            {project.coverImage ? (
                <Image
                    src={project.coverImage}
                    alt={project.coverAlt ?? project.title}
                    width={960}
                    height={540}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
            ) : (
                <div className="relative flex aspect-[16/9] min-h-40 flex-col justify-end overflow-hidden p-4" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02)_46%,rgba(255,255,255,0.08))]" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="relative space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{project.type}</p>
                        <p className="max-w-48 text-lg font-semibold leading-tight text-white">{primaryCapability}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
