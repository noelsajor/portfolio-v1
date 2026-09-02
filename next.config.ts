import type { NextConfig } from "next";

// script-src keeps 'unsafe-inline': Next.js App Router injects many small
// inline <script> tags per page for RSC/hydration data (confirmed via a real
// browser — removing it produces dozens of CSP violations across every
// route). Avoiding 'unsafe-inline' requires a per-request nonce via
// middleware, which forces every page to dynamic rendering — too large a
// regression for a mostly-static portfolio. 'unsafe-eval' was removed after
// confirming (same browser check) nothing in production actually needs it —
// it's a dev-mode-only requirement (eval-based source maps).
// style-src has no 'unsafe-inline': this app has no inline `style=`
// attributes anywhere, confirmed by a repo-wide search, and removing it
// produced zero CSP violations across every route.
// script-src/connect-src also allow Google's specific GA4 hosts (added in
// Step 8): gtag.js is loaded from googletagmanager.com, and it reports
// events via fetch/beacon to google-analytics.com and googletagmanager.com.
// Confirmed via a real browser that GA is silently blocked (and nothing
// downstream in the app breaks — it just never loads) without these; this
// is the minimal allowance needed, not a broad google.com allowance.
const csp =
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; " +
    "style-src 'self'; " +
    "img-src 'self' blob: data:; " +
    "font-src 'self'; " +
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'; " +
    "upgrade-insecure-requests;"

const nextConfig: NextConfig = {
    // Don't advertise the framework via the X-Powered-By response header.
    poweredByHeader: false,
    // Legacy, pre-i18n URLs permanently redirect to their /en equivalent.
    // `/` gets its own non-permanent entry below: it's a language-selection
    // redirect (src/proxy.ts replaces the fixed /en target with real
    // detection in PR 2), not a stable SEO destination, so it must stay a
    // redirect that can change target locale per visitor rather than one
    // browsers/crawlers cache as permanent.
    //
    // No rewrites(): there is no catch-all under [lang] to funnel unmatched
    // paths into anymore (removed — see src/app/not-found.tsx). Any path
    // that isn't one of these literal legacy routes, or a real /en/* or
    // /es/* page, is simply unmatched and served by the static global 404.
    async redirects() {
        return [
            { source: '/', destination: '/en', permanent: false },
            { source: '/about', destination: '/en/about', permanent: true },
            { source: '/work', destination: '/en/work', permanent: true },
            { source: '/contact', destination: '/en/contact', permanent: true },
            { source: '/resume', destination: '/en/resume', permanent: true },
            { source: '/for-agencies', destination: '/en/for-agencies', permanent: true },
            { source: '/work/:slug', destination: '/en/work/:slug', permanent: true }
        ]
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: csp,
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        // No camera/microphone/geolocation/payment usage anywhere
                        // in this app — deny them explicitly. browsing-topics is
                        // the current Topics API (successor to interest-cohort);
                        // this site does no ad-tech tracking, so it's denied too.
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()',
                    },
                    {
                        // Vercel serves this app over HTTPS only, so HSTS is safe
                        // to send unconditionally. `preload` is deliberately
                        // omitted: submitting to the browser preload list is a
                        // separate, harder-to-reverse decision the user should
                        // make explicitly, not a default of this pass.
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains',
                    },
                ],
            },
        ]
    },
}

export default nextConfig;
