import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { StructuredData } from '@/components/StructuredData'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [siteConfig.author],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.siteUrl
  },
  openGraph: {
    type: 'website',
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale
    // No `images` entry: no real Open Graph image asset exists yet.
    // Add one here once a production social-preview image is available.
  },
  twitter: {
    // `summary` (not `summary_large_image`) because no image is set above —
    // upgrade the card type once an Open Graph image exists.
    card: 'summary',
    title: siteConfig.title,
    description: siteConfig.description
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
      </body>
    </html>
  )
}
