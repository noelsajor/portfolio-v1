import Link from 'next/link'
import { SiteShell } from '@/components/SiteShell'
import { localizedPath } from '@/lib/i18n'

// Global, statically-prerendered 404 for the whole app. Next.js 16.2.11
// cannot reliably serve a curl-visible, correctly server-rendered <html
// lang> for a *dynamically* determined notFound() — confirmed for both a
// [lang]/[...rest] catch-all and work/[slug] on an unknown slug: the HTTP
// status is correctly 404, but the wire response is a generic
// <html id="__next_error__"> shell with no lang/header, and the real,
// correct content (right <html lang>, header, footer) only exists as a
// client-hydration RSC payload — invisible to curl and to any crawler that
// doesn't execute JS. See the architecture/i18n-lang-routes Engram entry for
// the investigation.
//
// [lang]/layout.tsx now sets dynamicParams = false, so every URL that isn't
// one of the build-time-generated /en/* or /es/* pages — an invalid locale
// like /fr/*, or an unmatched path under a real locale — is unmatched at
// the routing level and lands here instead of rendering [lang]'s layout at
// all. Because this route has no dynamic segments, Next CAN fully prerender
// it at build time (confirmed: /_not-found is `○` static, and the prebuilt
// HTML contains the real <html lang="en">, header, and footer). English
// only, for every locale, until Next.js can serve a localized dynamic 404
// this way or PR 2's proxy can forward the locale via a header — identical
// to the pre-migration site's 404 behavior, so this is not a regression.
//
// No explicit `metadata.robots` export here: Next.js already auto-injects
// <meta name="robots" content="noindex"> into any page that returns a 404
// status, this one included. Adding our own robots metadata on top produced
// a second, redundant <meta name="robots"> tag in the rendered output
// (confirmed by inspecting .next/server/app/_not-found.html) — removed to
// avoid shipping duplicate/conflicting robots directives in the same <head>.
export default function GlobalNotFound() {
    return (
        <SiteShell lang="en">
            <div className="flex flex-col items-center justify-center space-y-8 py-24 text-center">
                <div className="space-y-4">
                    <h1 className="text-8xl font-bold tracking-tighter text-white/10">404</h1>
                    <h2 className="text-3xl font-semibold tracking-tight">Page not found</h2>
                    <p className="mx-auto max-w-md text-white/60">
                        The requested page doesn&apos;t exist or has been moved. Use the button below to head back to safety.
                    </p>
                </div>

                <Link
                    href={localizedPath('en', '/')}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                    Return Home
                </Link>
            </div>
        </SiteShell>
    )
}
