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
//
// `data-tracking="language_switch"` is the one special-cased id: the
// LanguageSwitch links (src/components/LanguageSwitch.tsx) also carry
// `data-from-locale`/`data-to-locale`, and reporting those needs a distinct
// `language_switch` event rather than the generic `cta_click`/`cta_id`
// shape every other tracked element uses.
export function GoogleAnalyticsClickTracking() {
    useEffect(() => {
        function onClick(event: MouseEvent) {
            const target = event.target
            if (!(target instanceof Element)) return

            const trackedElement = target.closest<HTMLElement>('[data-tracking]')
            if (!trackedElement) return

            const trackingId = trackedElement.dataset.tracking

            if (trackingId === 'language_switch') {
                sendGAEvent('event', 'language_switch', {
                    from_locale: trackedElement.dataset.fromLocale,
                    to_locale: trackedElement.dataset.toLocale
                })
                return
            }

            sendGAEvent('event', 'cta_click', { cta_id: trackingId })
        }

        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
    }, [])

    return null
}
