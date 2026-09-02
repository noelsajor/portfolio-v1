'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOCALES, swapLocaleInPath, type Locale } from '@/lib/i18n'

const LOCALE_LABEL: Record<Locale, string> = {
    en: 'English',
    es: 'Español'
}

const SWITCH_ARIA_LABEL: Record<Locale, string> = {
    en: 'Switch to English',
    es: 'Switch to Spanish'
}

// Rendered in SiteHeader for every page. Swaps the locale segment of the
// current path (see swapLocaleInPath in src/lib/i18n.ts) rather than
// sending the visitor to a fixed page, so switching language never loses
// the page you're on. Every route in this slice exists in both locales, so
// this never lands on a 404 — see the comment on swapLocaleInPath for the
// PR 5 caveat once that stops being true.
export function LanguageSwitch({ lang }: { lang: Locale }) {
    const pathname = usePathname()

    return (
        <div className="flex items-center gap-1 text-sm" aria-label="Language">
            {LOCALES.map((locale) => {
                const isCurrent = locale === lang
                const href = swapLocaleInPath(pathname ?? '/', locale)

                return (
                    <Link
                        key={locale}
                        href={href}
                        hrefLang={locale}
                        aria-label={SWITCH_ARIA_LABEL[locale]}
                        aria-current={isCurrent ? 'true' : undefined}
                        // Only the link that actually changes locale carries
                        // tracking data — clicking the already-active locale
                        // isn't a "switch". See
                        // GoogleAnalyticsClickTracking.tsx for how
                        // data-tracking="language_switch" is special-cased.
                        {...(isCurrent
                            ? {}
                            : {
                                  'data-tracking': 'language_switch',
                                  'data-from-locale': lang,
                                  'data-to-locale': locale
                              })}
                        onClick={() => {
                            // Set the preference cookie before Link's own
                            // navigation runs (Next.js calls a Link's
                            // onClick before it navigates). Store only the
                            // validated locale — nothing else — for ~1 year.
                            // `Secure` also works on http://localhost, which
                            // browsers treat as a secure context.
                            document.cookie = `preferred_locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`
                        }}
                        className={[
                            'rounded-sm px-1.5 py-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
                            isCurrent ? 'text-white' : 'text-white/50 hover:text-white'
                        ].join(' ')}
                    >
                        <span lang={locale}>{LOCALE_LABEL[locale]}</span>
                    </Link>
                )
            })}
        </div>
    )
}
