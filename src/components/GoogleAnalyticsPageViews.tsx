'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

// <GoogleAnalytics>'s own `gtag('config', gaId)` call already sends one
// automatic page_view for the very first load — App Router client-side
// navigations after that don't trigger a new one on their own (confirmed via
// a real browser: navigating between pages produced zero additional
// `/g/collect` page_view requests). This component fires the missing
// page_view for every navigation after the first, without duplicating it.
export function GoogleAnalyticsPageViews() {
    const pathname = usePathname()
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        sendGAEvent('event', 'page_view', {
            page_path: pathname,
            page_location: window.location.href,
            page_title: document.title
        })
    }, [pathname])

    return null
}
