import type { Metadata, Viewport } from 'next'
import { SiteShell } from '@/components/SiteShell'
import { defaultOgImage, siteConfig } from '@/lib/site-config'
import { buildVerificationMetadata } from '@/lib/analytics-config'
import { DEFAULT_LOCALE, isLocale, LOCALES } from '@/lib/i18n'

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
