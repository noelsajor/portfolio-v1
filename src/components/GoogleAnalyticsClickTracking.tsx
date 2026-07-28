'use client'

import { useEffect } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

// Every trackable CTA sitewide already carries a `data-tracking="<id>"`
// attribute (nav links, hero/footer/resume/landing CTAs, project cards) —
// this was markup laid down ahead of wiring analytics. Rather than adding a
// one-off onClick to each of those elements, a single delegated listener
// picks up clicks anywhere in the document and reports the closest
// `data-tracking` ancestor's value as the event label. No sensitive form
// content is ever included — just the static id already present in markup.
export function GoogleAnalyticsClickTracking() {
    useEffect(() => {
        function onClick(event: MouseEvent) {
            const target = event.target
            if (!(target instanceof Element)) return

            const trackedElement = target.closest<HTMLElement>('[data-tracking]')
            if (!trackedElement) return

            sendGAEvent('event', 'cta_click', { cta_id: trackedElement.dataset.tracking })
        }

        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
    }, [])

    return null
}
