import type { Metadata } from 'next'
import { INDEXABLE_LOCALES, isIndexableLocale, type Locale } from '@/lib/i18n'

// Single source of truth for the site's canonical production identity.
// Every canonical URL, Open Graph/Twitter tag, sitemap entry, robots rule,
// and JSON-LD block reads from this file — update siteUrl here once the
// production domain is live instead of hardcoding it elsewhere.
export const siteConfig = {
    name: 'Jose Leon',
    title: 'Jose Leon — Product Design & Front-End Implementation',
    description:
        'I help agencies and digital teams turn ideas into polished, production-ready websites and product experiences through product design, front-end development and Shopify implementation.',
    siteUrl: 'https://noelsajor.com',
    email: 'noelsajor@gmail.com',
    locale: 'en_US',
    keywords: [
        'Jose Leon',
        'Product Designer',
        'Front-End Developer',
        'Shopify Developer',
        'UI/UX Design',
        'Front-End Implementation'
    ],
    author: {
        name: 'Jose Leon',
        url: 'https://noelsajor.com'
    },
    // Verified real profiles only — do not add unconfirmed accounts.
    sameAs: {
        behance: 'https://www.behance.net/noelsajor',
        figma: 'https://www.figma.com/@noelsajor',
        github: 'https://github.com/noelsajor',
        linkedin: 'https://www.linkedin.com/in/noelsajor'
    }
}

export function absoluteUrl(path: string = ''): string {
    return new URL(path, siteConfig.siteUrl).toString()
}

// Default social-sharing image, generated via scripts/generate-og-image.tsx.
// Per-page metadata can override `openGraph.images`/`twitter.images` once a
// real, approved page-specific asset exists — see buildPageMetadata below.
export const defaultOgImage = {
    url: absoluteUrl('/og-image.png'),
    width: 1200,
    height: 630,
    alt: siteConfig.title
}

// PR 4: Open Graph locale codes per docs/bilingual-seo-migration-plan.md
// line ~79 ("es_ES or es_US, depending on the target audience"). The plan
// leaves the choice open — this site's realistic Spanish-speaking audience
// (freelance/agency clients) skews Latin American/US rather than Spain, so
// es_US.
const OG_LOCALE_BY_LANG: Record<Locale, string> = {
    en: 'en_US',
    es: 'es_US'
}

// PR 4: the locale-dependent slice of a page's metadata — canonical,
// hreflang alternates, OG locale/alternateLocale, and robots — shared by
// buildPageMetadata() below and by src/app/[lang]/work/[slug]/page.tsx's
// generateMetadata(), which builds the rest of its Metadata object itself
// (article OG type, per-project cover image) instead of going through
// buildPageMetadata(). `path` is the locale-agnostic path (e.g. "/about" or
// "/work/foo"). Only locales in INDEXABLE_LOCALES get an `alternates.languages`
// entry or count toward `alternateLocale` — see docs/bilingual-seo-
// migration-plan.md Phase 6/7 and the INDEXABLE_LOCALES comment in
// src/lib/i18n.ts. No `x-default` alternate yet: Phase 6's x-default rule
// applies once both language versions are indexable, which isn't the case
// while INDEXABLE_LOCALES has a single entry.
export function buildLocaleMetadataFields(
    lang: Locale,
    path: string
): {
    canonical: string
    languages: Record<string, string>
    ogLocale: string
    ogAlternateLocale?: string[]
    robots?: Metadata['robots']
} {
    const localizedUrl = (locale: Locale) => absoluteUrl(`/${locale}${path === '/' ? '' : path}`)
    const otherIndexableLocales = INDEXABLE_LOCALES.filter((locale) => locale !== lang)

    return {
        canonical: localizedUrl(lang),
        languages: Object.fromEntries(INDEXABLE_LOCALES.map((locale) => [locale, localizedUrl(locale)])),
        ogLocale: OG_LOCALE_BY_LANG[lang],
        ...(otherIndexableLocales.length > 0
            ? { ogAlternateLocale: otherIndexableLocales.map((locale) => OG_LOCALE_BY_LANG[locale]) }
            : {}),
        // Non-indexable locales (currently /es/*) render English fallback
        // copy under a localized URL — noindex keeps Google from treating
        // that as real Spanish content. `follow` stays true so internal
        // links are still crawled. Indexable locales get no explicit
        // `robots` override here, same as before this function existed —
        // they inherit index:true/follow:true from the [lang] layout.
        ...(isIndexableLocale(lang) ? {} : { robots: { index: false, follow: true } })
    }
}

// Shared canonical/OG/Twitter metadata shape for the static top-level pages.
// `title` is the short page segment (e.g. "About") — the root layout's title
// template appends the site name for the <title> tag, but Open Graph/Twitter
// don't inherit that template, so this builds the fully-qualified title for
// those fields explicitly to avoid a blank or under-branded social preview.
// `path` is the locale-agnostic path (e.g. "/about"); `lang` selects which
// locale this specific page is (PR 4 — see buildLocaleMetadataFields above).
export function buildPageMetadata({
    title,
    description,
    path,
    lang
}: {
    title: string
    description: string
    path: string
    lang: Locale
}): Metadata {
    const fullTitle = `${title} | ${siteConfig.name}`
    const { canonical, languages, ogLocale, ogAlternateLocale, robots } = buildLocaleMetadataFields(lang, path)

    return {
        title,
        description,
        alternates: { canonical, languages },
        openGraph: {
            type: 'website',
            url: canonical,
            siteName: siteConfig.name,
            title: fullTitle,
            description,
            locale: ogLocale,
            ...(ogAlternateLocale ? { alternateLocale: ogAlternateLocale } : {}),
            images: [defaultOgImage]
        },
        // No title/description here — verified via rendered output that
        // Next's Metadata API fills twitter:title/twitter:description from
        // openGraph.title/openGraph.description automatically when the
        // twitter object omits them, so repeating the same two values under
        // a second key was duplicate logic with no behavioral difference.
        twitter: {
            card: 'summary_large_image',
            images: [defaultOgImage.url]
        },
        ...(robots ? { robots } : {})
    }
}
