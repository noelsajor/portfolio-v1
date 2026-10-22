'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// One IntersectionObserver for the whole document, mounted once in SiteShell.
// It does exactly one thing: set `data-revealed` on an element the first time
// it enters the viewport. Every visual decision — distance, duration, easing,
// stagger — lives in globals.css under `@media (prefers-reduced-motion:
// no-preference)`.
//
// Why an attribute and not a style: the CSP is `style-src 'self'` plus one
// hash, so anything that assigned `element.style` would be blocked in
// production and silently do nothing. Toggling an attribute keeps the whole
// feature inside the stylesheet.
//
// The first child of `.page-sections` is skipped: it is above the fold, and
// CSS animates it on load so the hero is never blank while hydration runs.
const SELECTOR = '.page-sections > :not(:first-child), [data-reveal]'

export function Reveal() {
    const pathname = usePathname()

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (reduced.matches) return

        const targets = Array.from(document.querySelectorAll(SELECTOR)).filter(
            // A JsonLd <script> is a child of .page-sections on most pages and
            // has nothing to reveal; observing it is harmless but pointless.
            (node) => node.tagName !== 'SCRIPT' && !node.hasAttribute('data-revealed')
        )
        if (targets.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue
                    entry.target.setAttribute('data-revealed', '')
                    // Reveal once. Scrolling back up should not replay it, and
                    // an element that is done no longer needs watching.
                    observer.unobserve(entry.target)
                }
            },
            {
                // Bottom: fire a little before the element is fully in view, so
                // the motion reads as the section arriving rather than as a
                // late correction.
                //
                // Top: effectively unbounded, and that part is load-bearing. An
                // observer only reports threshold crossings, so an element the
                // viewport never touched — End key, a dragged scrollbar, a deep
                // anchor link — goes straight from below the fold to above it
                // without ever intersecting, and would stay hidden for the rest
                // of the session. Extending the root upwards makes "already
                // scrolled past" count as revealed too.
                rootMargin: '100000px 0px -12% 0px',
                threshold: 0.01
            }
        )

        for (const target of targets) observer.observe(target)
        return () => observer.disconnect()
        // Client-side navigation swaps the page under a layout that does not
        // remount, so the new route's sections need a fresh pass.
    }, [pathname])

    return null
}
