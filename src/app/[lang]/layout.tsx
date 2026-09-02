import { notFound } from 'next/navigation'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { StructuredData } from '@/components/StructuredData'
import { GoogleAnalyticsPageViews } from '@/components/GoogleAnalyticsPageViews'
import { GoogleAnalyticsClickTracking } from '@/components/GoogleAnalyticsClickTracking'
import { gaMeasurementId } from '@/lib/analytics-config'
import { isLocale, LOCALES } from '@/lib/i18n'

export function generateStaticParams() {
    return LOCALES.map((lang) => ({ lang }))
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params
    if (!isLocale(lang)) {
        notFound()
    }

    return (
        <html lang={lang}>
            <body className="min-h-dvh">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
                >
                    Skip to main content
                </a>
                <StructuredData />
                <SiteHeader />
                <main
                    id="main-content"
                    tabIndex={-1}
                    className="mx-auto max-w-5xl px-4 py-12 focus:outline-none"
                >
                    {children}
                </main>
                <SiteFooter />
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
