'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CaseStudyFrontmatter } from '@/lib/projects'
import { localizedPath, type Locale } from '@/lib/i18n'
import { CapabilityChips } from '@/components/CapabilityChips'
import { ProjectCardPreview } from '@/components/ProjectCardPreview'

type Labels = {
    ariaLabel: string
    previous: string
    next: string
}

// Horizontal carousel for the home's featured projects. The track is a
// native scroll container with scroll-snap, so swipe, trackpad and keyboard
// scrolling work without JavaScript. On md+ exactly three portrait cards
// fill the row, so nothing is cut at the edges.
//
// The carousel loops: the list is rendered COPIES times, the view starts on
// the middle copy, and once scrolling settles near either outer copy the
// track jumps silently by one set width (identical cards and gaps, so the
// jump is invisible). That is also why there is never an empty edge: the
// list can be scrolled backwards from the first card too. Only the
// middle copy is exposed to assistive tech; the clones are aria-hidden
// and unfocusable. All styling is static Tailwind classes (the site's CSP
// blocks inline styles). Cards share the markup and card style of every
// other card grid.
const COPIES = 3
const REAL_COPY = 1

export function ProjectCarousel({ lang, projects, labels }: { lang: Locale; projects: CaseStudyFrontmatter[]; labels: Labels }) {
    const trackRef = useRef<HTMLUListElement>(null)
    const count = projects.length

    // Distance between a card and the same card in the next copy.
    const setWidth = () => {
        const track = trackRef.current
        if (!track || track.children.length <= count) return 0
        const a = track.children[0] as HTMLElement
        const b = track.children[count] as HTMLElement
        return b.offsetLeft - a.offsetLeft
    }

    useEffect(() => {
        const track = trackRef.current
        if (!track) return
        const width = setWidth()
        if (!width) return
        track.scrollLeft = width * REAL_COPY

        let timer: number | undefined
        const normalize = () => {
            const w = setWidth()
            if (!w) return
            if (track.scrollLeft < w * 0.5) track.scrollLeft += w
            else if (track.scrollLeft > w * 2.5) track.scrollLeft -= w
        }
        const onScroll = () => {
            window.clearTimeout(timer)
            timer = window.setTimeout(normalize, 120)
        }
        track.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.clearTimeout(timer)
            track.removeEventListener('scroll', onScroll)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    function scrollByCard(direction: 1 | -1) {
        const track = trackRef.current
        const first = track?.firstElementChild as HTMLElement | null
        if (!track || !first) return
        const gap = parseFloat(getComputedStyle(track).columnGap || '0')
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        track.scrollBy({
            left: direction * (first.offsetWidth + gap),
            behavior: reduceMotion ? 'auto' : 'smooth'
        })
    }

    const arrowClass =
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30'

    return (
        <div className="space-y-4" role="region" aria-roledescription="carousel" aria-label={labels.ariaLabel}>
            {/* Three portrait cards fill the row on md+. Below md the track bleeds into the page gutter and scroll-padding keeps the snapped card aligned with it, with ~20% of the next card peeking. */}
            <ul
                ref={trackRef}
                role="list"
                className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:scroll-pl-0"
            >
                {Array.from({ length: COPIES }, (_, copy) => copy).flatMap((copy) =>
                    projects.map((project) => {
                        const clone = copy !== REAL_COPY
                        return (
                            <li
                                key={`${copy}-${project.slug}`}
                                aria-hidden={clone || undefined}
                                className="group relative flex w-[80%] flex-none snap-start flex-col rounded-2xl border border-white/10 bg-black p-5 transition hover:bg-white/5 sm:w-[46%] md:w-[calc((100%-2rem)/3)]"
                            >
                                <ProjectCardPreview lang={lang} project={project} aspect="portrait" />
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-lg font-semibold tracking-tight group-hover:text-white">
                                        <Link
                                            href={localizedPath(lang, `/work/${project.slug}`)}
                                            data-tracking={`project_card_${project.slug}`}
                                            tabIndex={clone ? -1 : undefined}
                                            className="static outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-white/30"
                                        >
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <CapabilityChips lang={lang} capabilities={project.capabilities} />
                                    </div>
                                </div>
                            </li>
                        )
                    })
                )}
            </ul>

            <div className="hidden justify-end gap-2 md:flex">
                <button type="button" onClick={() => scrollByCard(-1)} aria-label={labels.previous} className={arrowClass}>
                    <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => scrollByCard(1)} aria-label={labels.next} className={arrowClass}>
                    <ChevronRight aria-hidden="true" className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}
