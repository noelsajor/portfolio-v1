import { GoogleAnalytics } from '@next/third-parties/google'
import '../app/globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { StructuredData } from '@/components/StructuredData'
import { GoogleAnalyticsPageViews } from '@/components/GoogleAnalyticsPageViews'
import { GoogleAnalyticsClickTracking } from '@/components/GoogleAnalyticsClickTracking'
import { gaMeasurementId } from '@/lib/analytics-config'
import type { Locale } from '@/lib/i18n'

// The document shell shared by every locale page (via src/app/[lang]/layout.tsx)
// and the global static 404 (src/app/not-found.tsx). Extracted so both can
// render the exact same <html>/<body>, header, and footer without either one
// depending on the other's route segment. `lang` is required by every
// caller — the not-found page passes a literal 'en' since Next.js 16.2
// cannot serve a curl-visible localized 404 (see src/app/not-found.tsx).
export function SiteShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
    return (
        <html lang={lang}>
            <body className="min-h-dvh">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
                >
                    Skip to main content
                </a>
                <StructuredData lang={lang} />
                <SiteHeader lang={lang} />
                <main
                    id="main-content"
                    tabIndex={-1}
                    className="mx-auto max-w-5xl px-4 py-12 focus:outline-none"
                >
                    {children}
                </main>
                <SiteFooter lang={lang} />
                {process.env.NODE_ENV === 'production' && gaMeasurementId ? (
                    <>
                        <GoogleAnalytics gaId={gaMeasurementId} />
                        <GoogleAnalyticsPageViews />
                        <GoogleAnalyticsClickTracking />
                    </>
                ) : null}
            </body>
        </html>
    )
}
