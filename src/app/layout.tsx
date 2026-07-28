import type { Metadata, Viewport } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { StructuredData } from '@/components/StructuredData'
import { GoogleAnalyticsPageViews } from '@/components/GoogleAnalyticsPageViews'
import { defaultOgImage, siteConfig } from '@/lib/site-config'
import { buildVerificationMetadata, gaMeasurementId } from '@/lib/analytics-config'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [siteConfig.author],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.siteUrl
  },
  ...buildVerificationMetadata(),
  openGraph: {
    type: 'website',
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    images: [defaultOgImage.url]
    // No title/description: Next's Metadata API fills twitter:title/
    // twitter:description from openGraph automatically when omitted here
    // (verified via rendered output) — repeating them was duplicate logic.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: 'black-translucent'
  }
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
          </>
        ) : null}
      </body>
    </html>
  )
}
