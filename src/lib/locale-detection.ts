// Pure locale-resolution logic for the root `/` proxy (src/proxy.ts). Kept
// separate from the proxy itself so the priority order — cookie, then
// Accept-Language, then the default — can be reasoned about and reused
// without touching Next.js request/response types.
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/i18n'

interface ResolveLocaleInput {
    cookieValue: string | undefined
    acceptLanguage: string | null
}

/**
 * Parses an `Accept-Language` header value and returns the supported locale
 * with the highest q-value, matching on the primary language subtag (e.g.
 * `es` from `es-AR` or `es-419`). Returns `null` when no supported locale is
 * present.
 */
function resolveFromAcceptLanguage(acceptLanguage: string | null): Locale | null {
    if (!acceptLanguage) {
        return null
    }

    const candidates = acceptLanguage
        .split(',')
        .map((part) => {
            const [rawTag, ...params] = part.trim().split(';')
            const tag = rawTag?.trim().toLowerCase()
            if (!tag) {
                return null
            }

            let quality = 1
            for (const param of params) {
                const [key, value] = param.trim().split('=')
                if (key === 'q' && value !== undefined) {
                    const parsed = Number.parseFloat(value)
                    if (!Number.isNaN(parsed)) {
                        quality = parsed
                    }
                }
            }

            const primarySubtag = tag.split('-')[0]
            return { primarySubtag, quality }
        })
        .filter((candidate): candidate is { primarySubtag: string; quality: number } => candidate !== null)
        // RFC 9110 §12.4.2: q=0 means "not acceptable", so such languages
        // must never be selected even when nothing else matches.
        .filter((candidate) => candidate.quality > 0)
        // Stable sort by descending quality; Array#sort is stable in modern JS
        // engines, which preserves the header's original ordering for ties.
        .sort((a, b) => b.quality - a.quality)

    for (const candidate of candidates) {
        if (isLocale(candidate.primarySubtag)) {
            return candidate.primarySubtag
        }
    }

    return null
}

/**
 * Resolves which locale `/` should redirect to, in priority order:
 * 1. `preferred_locale` cookie, only if it is a valid, supported locale.
 * 2. `Accept-Language`, matching the highest q-value supported locale.
 * 3. `DEFAULT_LOCALE`.
 *
 * The return value is always a member of `LOCALES` — never a raw header or
 * cookie value — so callers can build a redirect destination from it without
 * further validation (open-redirect safety).
 */
export function resolveLocale({ cookieValue, acceptLanguage }: ResolveLocaleInput): Locale {
    if (cookieValue !== undefined && isLocale(cookieValue)) {
        return cookieValue
    }

    const fromHeader = resolveFromAcceptLanguage(acceptLanguage)
    if (fromHeader !== null) {
        return fromHeader
    }

    return DEFAULT_LOCALE
}
