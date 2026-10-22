import { GoogleAnalytics } from '@next/third-parties/google'
import '../app/globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { StructuredData } from '@/components/StructuredData'
import { GoogleAnalyticsPageViews } from '@/components/GoogleAnalyticsPageViews'
import { GoogleAnalyticsClickTracking } from '@/components/GoogleAnalyticsClickTracking'
import { Reveal } from '@/components/Reveal'
import { gaMeasurementId } from '@/lib/analytics-config'
import type { Locale } from '@/lib/i18n'
import { getUiContent } from '@/lib/ui-content'

// Runs before first paint and is the switch for every scroll-reveal rule in
// globals.css. Without it nothing is ever hidden, which is the behaviour we
// want when JavaScript is off or fails: a reader still gets the whole page,
// just without the motion. Doing it the other way round — hide in CSS, reveal
// in JS — turns any script failure into a blank site.
// Inline is deliberate and allowed: script-src carries 'unsafe-inline'
// (next.config.ts), while style-src does not, which is also why the reveal is
// driven by an attribute instead of an inline style.
const MOTION_FLAG = "document.documentElement.classList.add('js-motion')"

// The document shell shared by every locale page (via src/app/[lang]/layout.tsx)
// and the global static 404 (src/app/not-found.tsx). Extracted so both can
// render the exact same <html>/<body>, header, and footer without either one
// depending on the other's route segment. `lang` is required by every
// caller — the not-found page passes a literal 'en' since Next.js 16.2
// cannot serve a curl-visible localized 404 (see src/app/not-found.tsx).
export function SiteShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
    const { shell } = getUiContent(lang)

    return (
        <html lang={lang}>
            <body className="min-h-dvh">
                {/* First thing in the body, so it blocks parsing of everything
                    below it and lands before any of that can paint. */}
                <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
                <Reveal />
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
                >
                    {shell.skipToMain}
                </a>
                <StructuredData lang={lang} />
                <SiteHeader lang={lang} />
                <main
                    id="main-content"
                    tabIndex={-1}
                    className="mx-auto max-w-5xl px-4 pb-24 pt-12 focus:outline-none md:pb-32"
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
