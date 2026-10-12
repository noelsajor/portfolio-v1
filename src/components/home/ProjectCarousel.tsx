'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { CaseStudyFrontmatter } from '@/lib/projects'
import { localizedPath, type Locale } from '@/lib/i18n'
import { CapabilityChips } from '@/components/CapabilityChips'
import { ProjectCardPreview } from '@/components/ProjectCardPreview'

type Labels = {
    ariaLabel: string
    previous: string
    next: string
    projectCta: string
    visitLiveSite: string
    opensInNewTab: string
}

// Horizontal carousel for the home's featured projects. The track is a
// native scroll container with scroll-snap, so swipe, trackpad and keyboard
// scrolling work without JavaScript; a gradient mask on the track's edges
// dissolves the side cards into the background. The only client logic is
// the arrow buttons (scroll one card) and their disabled state at either
// end. All styling is static Tailwind classes (the site's CSP blocks inline
// styles). Cards share the markup and card style of every other card grid.
export function ProjectCarousel({
    lang,
    projects,
    labels
}: {
    lang: Locale
    projects: CaseStudyFrontmatter[]
    labels: Labels
}) {
    const trackRef = useRef<HTMLUListElement>(null)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    useEffect(() => {
        const track = trackRef.current
        if (!track) return
        const update = () => {
            const max = track.scrollWidth - track.clientWidth
            setAtStart(track.scrollLeft <= 2)
            setAtEnd(track.scrollLeft >= max - 2)
        }
        update()
        track.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        return () => {
            track.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
        }
    }, [])

    function scrollByCard(direction: 1 | -1) {
        const track = trackRef.current
        const first = track?.firstElementChild as HTMLElement | null
        if (!track || !first) return
        const gap = parseFloat(getComputedStyle(track).columnGap || '0')
        track.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: 'smooth' })
    }

    const arrowClass =
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:cursor-default disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white/70'

    return (
        <div className="space-y-4" role="region" aria-roledescription="carousel" aria-label={labels.ariaLabel}>
            {/* Mask fades the edges on md+ so side cards dissolve into the page; below md one card fills the width and the next one peeks. */}
            <div className="-mx-4 md:[mask-image:linear-gradient(to_right,transparent,black_6rem,black_calc(100%-6rem),transparent)]">
                <ul
                    ref={trackRef}
                    role="list"
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-[calc(50%-17rem)]"
                >
                    {projects.map((project) => (
                        <li
                            key={project.slug}
                            className="group relative flex w-[85%] flex-none snap-center flex-col rounded-2xl border border-white/10 bg-black p-5 transition hover:bg-white/5 sm:w-[70%] md:w-[34rem]"
                        >
                            <ProjectCardPreview lang={lang} project={project} />
                            <div className="flex flex-1 flex-col gap-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <CapabilityChips lang={lang} capabilities={project.capabilities} />
                                </div>
                                <h3 className="text-lg font-semibold tracking-tight group-hover:text-white">
                                    <Link
                                        href={localizedPath(lang, `/work/${project.slug}`)}
                                        data-tracking={`project_card_${project.slug}`}
                                        className="static outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-white/30"
                                    >
                                        {project.title}
                                    </Link>
                                </h3>
                                <p className="text-sm leading-relaxed text-white/70">{project.summary}</p>
                                <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                                    <Link
                                        href={localizedPath(lang, `/work/${project.slug}`)}
                                        data-tracking={`project_card_${project.slug}`}
                                        className="relative z-10 inline-flex w-fit items-center justify-center gap-1 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                                    >
                                        {`${labels.projectCta} `}
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                    {project.liveUrl ? (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            data-tracking={`project_card_${project.slug}_live`}
                                            className="relative z-10 inline-flex w-fit items-center justify-center gap-1 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                        >
                                            {`${labels.visitLiveSite} `}
                                            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                                            <span className="sr-only">{labels.opensInNewTab}</span>
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="hidden justify-end gap-2 md:flex">
                <button type="button" onClick={() => scrollByCard(-1)} disabled={atStart} aria-label={labels.previous} className={arrowClass}>
                    <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => scrollByCard(1)} disabled={atEnd} aria-label={labels.next} className={arrowClass}>
                    <ChevronRight aria-hidden="true" className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}
