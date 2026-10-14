'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Case-study gallery with a click-to-enlarge lightbox.
//
// Built on the native <dialog> rather than a hand-rolled overlay, which hands
// the browser four things that are easy to get wrong by hand: Escape to close,
// focus trapped inside while open, the rest of the page made inert, and a real
// ::backdrop to paint. Tailwind's `backdrop:` variant styles that pseudo
// element, so there are still no inline styles anywhere — the site's CSP is
// `style-src 'self'`.
//
// Only the active image is mounted. A closed dialog is display:none, so the
// others would not load anyway, and this keeps one <img> in the tree instead
// of one per gallery item.

export type GalleryItem = {
    id: string
    src: string
    alt?: string
}

export type GalleryLabels = {
    open: string
    close: string
    previous: string
    next: string
    /** Carries the placeholders {current} and {total}. */
    counter: string
}

export function ProjectGallery({ items, labels }: { items: GalleryItem[]; labels: GalleryLabels }) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [index, setIndex] = useState<number | null>(null)
    const active = index === null ? null : items[index]

    const close = useCallback(() => dialogRef.current?.close(), [])
    const step = useCallback(
        (delta: number) => setIndex((current) => (current === null ? null : (current + delta + items.length) % items.length)),
        [items.length]
    )

    // showModal() cannot be an attribute, so opening is an effect on the index.
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        if (index !== null && !dialog.open) dialog.showModal()
    }, [index])

    // Arrow keys page through. Escape is the browser's own and arrives as the
    // dialog's close event below, so it is deliberately not handled here.
    useEffect(() => {
        if (index === null) return
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') step(1)
            if (event.key === 'ArrowLeft') step(-1)
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [index, step])

    return (
        <>
            {/* Columns, not a grid: gallery images mix landscape and portrait
                (e.g. mobile screenshots) sources, and a grid forces row-pairing
                that leaves awkward gaps next to a tall image. Columns let each
                item flow to its own natural height instead. */}
            <div className="columns-1 gap-4 md:columns-2">
                {items.map((item, i) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`${labels.open}: ${item.alt ?? item.id}`}
                        className="mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl border border-white/10 transition hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                        <Image src={item.src} alt={item.alt ?? item.id} width={960} height={540} className="h-auto w-full" />
                    </button>
                ))}
            </div>

            <dialog
                ref={dialogRef}
                onClose={() => setIndex(null)}
                // A click that lands on the dialog element itself is a click on the
                // backdrop: the image and the controls are children and stop there.
                onClick={(event) => {
                    if (event.target === dialogRef.current) close()
                }}
                aria-label={labels.open}
                className="max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/95 open:fixed open:inset-0 open:flex open:h-full open:w-full open:items-center open:justify-center"
            >
                {active ? (
                    <div className="relative flex w-[min(94vw,80rem)] flex-col gap-3 p-4">
                        {/* The image runs at the full width of the dialog and the box
                            scrolls when it is taller than the viewport. Most of this
                            gallery is screenshots of pages, and shrinking a full-page
                            capture to fit the height makes it unreadable, which defeats
                            the point of opening it. A landscape image fits without
                            scrolling and behaves as before. */}
                        <div className="max-h-[80vh] overflow-y-auto overscroll-contain rounded-lg">
                            <Image src={active.src} alt={active.alt ?? active.id} width={1920} height={1080} className="h-auto w-full" />
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm text-white/60">
                                {labels.counter.replace('{current}', String((index ?? 0) + 1)).replace('{total}', String(items.length))}
                            </p>

                            {items.length > 1 ? (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => step(-1)}
                                        aria-label={labels.previous}
                                        className="rounded-full border border-white/20 p-2 text-white/80 transition hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                    >
                                        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => step(1)}
                                        aria-label={labels.next}
                                        className="rounded-full border border-white/20 p-2 text-white/80 transition hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                    >
                                        <ChevronRight aria-hidden="true" className="h-5 w-5" />
                                    </button>
                                </div>
                            ) : null}
                        </div>

                        <button
                            type="button"
                            onClick={close}
                            aria-label={labels.close}
                            className="absolute right-6 top-6 rounded-full bg-black/70 p-2 text-white/80 transition hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        >
                            <X aria-hidden="true" className="h-5 w-5" />
                        </button>
                    </div>
                ) : null}
            </dialog>
        </>
    )
}
