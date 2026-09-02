import type { Metadata, Viewport } from 'next'
import './globals.css'
import { defaultOgImage, siteConfig } from '@/lib/site-config'
import { buildVerificationMetadata } from '@/lib/analytics-config'

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

// Pass-through root layout. Next.js requires a layout.tsx at the top of
// app/, but the real document shell (<html lang>, providers, header,
// footer, analytics, structured data) now lives in src/app/[lang]/layout.tsx
// so `lang` can be set from the route param. This root layout renders no
// DOM of its own — it exists only so segments outside [lang] (the root
// not-found.tsx boundary, used when an invalid locale segment is requested)
// still have a layout to render under. `metadata`/`viewport` stay here:
// Next merges metadata from every layout/page in the tree into whichever
// <head> the eventual <html> render produces, so this doesn't require its
// own <html>/<body>.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
