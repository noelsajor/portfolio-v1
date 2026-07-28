import type { Metadata } from 'next'

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

// Shared canonical/OG/Twitter metadata shape for the static top-level pages.
// `title` is the short page segment (e.g. "About") — the root layout's title
// template appends the site name for the <title> tag, but Open Graph/Twitter
// don't inherit that template, so this builds the fully-qualified title for
// those fields explicitly to avoid a blank or under-branded social preview.
export function buildPageMetadata({
    title,
    description,
    path
}: {
    title: string
    description: string
    path: string
}): Metadata {
    const url = absoluteUrl(path)
    const fullTitle = `${title} | ${siteConfig.name}`

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: 'website',
            url,
            siteName: siteConfig.name,
            title: fullTitle,
            description,
            locale: siteConfig.locale,
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
        }
    }
}
