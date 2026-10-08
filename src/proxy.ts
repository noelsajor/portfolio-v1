// Root locale-detection proxy (Next 16 name for middleware). Matched ONLY on
// `/` (see `config.matcher` below) — every other route, including
// `/en/*`, `/es/*`, `/api/*`, `/_next/*`, and static files, never reaches
// this file. Runs on the default Node.js runtime (Proxy files cannot set
// `runtime` — Next.js throws if you try).
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { resolveLocale } from '@/lib/locale-detection'

const PREFERRED_LOCALE_COOKIE = 'preferred_locale'

export function proxy(request: NextRequest) {
    const locale = resolveLocale({
        cookieValue: request.cookies.get(PREFERRED_LOCALE_COOKIE)?.value,
        acceptLanguage: request.headers.get('accept-language'),
    })

    // Destination is built ONLY from the validated `locale` value returned by
    // resolveLocale() — never from the cookie or header directly — so this
    // can never become an open redirect. The query string is preserved.
    const destination = new URL(`/${locale}`, request.url)
    destination.search = request.nextUrl.search

    const response = NextResponse.redirect(destination, 307)

    // This redirect depends on the visitor (cookie and/or Accept-Language),
    // so it must never be cached by a shared CDN and served to a different
    // visitor. `Vary` alone is not sufficient guidance for every CDN, so this
    // also marks the response explicitly non-cacheable.
    response.headers.set('Vary', 'Accept-Language, Cookie')
    response.headers.set('Cache-Control', 'private, no-store')

    return response
}

export const config = {
    matcher: '/',
}
