import type { Metadata, Viewport } from 'next'
import { SiteShell } from '@/components/SiteShell'
import { defaultOgImage, siteConfig } from '@/lib/site-config'
import { buildVerificationMetadata } from '@/lib/analytics-config'
import { DEFAULT_LOCALE, isLocale, LOCALES } from '@/lib/i18n'

// Locale-independent defaults only. Canonical, alternates.languages, and
// openGraph (url/locale/title/description/images) are all locale-dependent
// (PR 4 — see buildLocaleMetadataFields in site-config.ts) and are
// therefore set per-page via each page's own generateMetadata, never here:
// a page-level `openGraph`/`alternates` key replaces the whole object from
// this layout rather than merging into it, so defining locale-specific
// values at both levels would just make the layout's copies dead weight
// that's easy to forget to update.
//
// `robots` stays here as the site-wide index:true/follow:true default.
// buildLocaleMetadataFields only returns a `robots` override for
// non-indexable locales (currently /es/*) — an indexable page's
// generateMetadata omits `robots` entirely, so it inherits this default
// rather than needing to restate it on every page.
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
    ...buildVerificationMetadata(),
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

export function generateStaticParams() {
    return LOCALES.map((lang) => ({ lang }))
}

// Only the params generateStaticParams() returns above (en, es) can ever
// reach this layout: with dynamicParams = false, any other /:lang/* value
// (e.g. /fr/*, or an unmatched path under a real locale — see
// src/app/not-found.tsx) is unmatched at the routing level and Next serves
// the static global 404 instead of rendering this layout at all. `lang` is
// therefore guaranteed valid here; the isLocale check below is only for
// TypeScript narrowing (Next types route params as plain `string`), and
// DEFAULT_LOCALE is a type-checker fallback, not a real runtime path.
export const dynamicParams = false

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang: rawLang } = await params
    const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    return <SiteShell lang={lang}>{children}</SiteShell>
}
