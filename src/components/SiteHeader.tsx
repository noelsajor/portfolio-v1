'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { localizedPath, type Locale } from '@/lib/i18n'
import { uiContent as uiContentEn } from '@/content/en/ui'
import { uiContent as uiContentEs } from '@/content/es/ui'
import { LanguageSwitch } from '@/components/LanguageSwitch'

function NavLink({
    lang,
    href,
    label,
    onClick
}: {
    lang: Locale
    href: string
    label: string
    onClick?: () => void
}) {
    const pathname = usePathname()
    const localizedHref = localizedPath(lang, href)
    const active = pathname === localizedHref || (href === '/work' && pathname?.startsWith(localizedHref))

    return (
        <Link
            href={localizedHref}
            onClick={onClick}
            aria-current={active ? 'page' : undefined}
            data-tracking={`nav_${label.toLowerCase()}`}
            className={[
                'rounded-sm text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
                active ? 'text-white' : 'text-white/70 hover:text-white'
            ].join(' ')}
        >
            {label}
        </Link>
    )
}

export function SiteHeader({ lang }: { lang: Locale }) {
    const [open, setOpen] = useState(false)
    const uiContent = lang === 'es' ? uiContentEs : uiContentEn
    const { header } = uiContent
    const nav = [
        { href: '/work', label: header.navWork },
        { href: '/about', label: header.navAbout },
        { href: '/contact', label: header.navContact }
    ]

    useEffect(() => {
        const onResize = () => setOpen(false)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <Link
                    href={localizedPath(lang, '/')}
                    data-tracking="nav_home"
                    className="text-sm font-semibold tracking-tight text-white"
                >
                    Jose Leon
                </Link>

                {/* Desktop nav */}
                <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
                    {nav.map((item) => (
                        <NavLink key={item.href} lang={lang} href={item.href} label={item.label} />
                    ))}
                    <LanguageSwitch lang={lang} />
                    <Link
                        href={localizedPath(lang, '/contact')}
                        data-tracking="nav_cta_discuss_project"
                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                        {header.discussProject}
                    </Link>
                </nav>

                {/* Mobile button */}
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="md:hidden rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                >
                    {open ? 'Close' : 'Menu'}
                </button>
            </div>

            {/* Mobile menu — always in the DOM (never conditionally unmounted) so
                the toggle button's aria-controls reference always resolves to a
                real element; visibility is CSS-only via the hidden/block swap. */}
            <nav
                id="mobile-menu"
                aria-label="Primary"
                className={[open ? 'block' : 'hidden', 'border-t border-white/10 bg-black/80 md:hidden'].join(' ')}
            >
                <div className="mx-auto max-w-5xl px-4 py-4">
                    <div className="flex flex-col gap-4">
                        {nav.map((item) => (
                            <NavLink
                                key={item.href}
                                lang={lang}
                                href={item.href}
                                label={item.label}
                                onClick={() => setOpen(false)}
                            />
                        ))}
                        <LanguageSwitch lang={lang} onNavigate={() => setOpen(false)} />
                        <Link
                            href={localizedPath(lang, '/contact')}
                            onClick={() => setOpen(false)}
                            data-tracking="nav_cta_discuss_project"
                            className="w-fit rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                            Discuss a Project
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}
