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
const csp =
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self'; " +
    "img-src 'self' blob: data:; " +
    "font-src 'self'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'; " +
    "upgrade-insecure-requests;"

const nextConfig: NextConfig = {
    // Don't advertise the framework via the X-Powered-By response header.
    poweredByHeader: false,
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
