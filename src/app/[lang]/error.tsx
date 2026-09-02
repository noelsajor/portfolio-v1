'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { DEFAULT_LOCALE, isLocale, localizedPath } from '@/lib/i18n'

// English copy for now — PR 5 localizes this string per locale. Rendered
// wrapped in [lang]/layout.tsx for a runtime error thrown inside the locale
// segment, so `html lang` still matches the current locale.
export default function LocaleError({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    // error.tsx only receives `error`/`reset` from Next.js, not `params` —
    // useParams() reads the matched [lang] segment instead. Unlike the
    // static global 404 (src/app/not-found.tsx), this boundary only ever
    // mounts inside a real /en/* or /es/* route, so — unlike the pitfall
    // documented on SiteHeader/LanguageSwitch — usePathname()-style
    // derivation isn't needed here; useParams() reads the actual matched
    // route segment.
    const params = useParams<{ lang?: string }>()
    const rawLang = params?.lang
    const lang = typeof rawLang === 'string' && isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-24 text-center">
            <div className="space-y-4">
                <h1 className="text-8xl font-bold tracking-tighter text-white/10">Error</h1>
                <h2 className="text-3xl font-semibold tracking-tight">Something went wrong</h2>
                <p className="mx-auto max-w-md text-white/60">
                    An unexpected error occurred while loading this page. You can try again, or head back to safety.
                </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                    Try again
                </button>
                <Link
                    href={localizedPath(lang, '/')}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
