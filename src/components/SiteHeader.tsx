'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const nav = [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
]

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
    const pathname = usePathname()
    const active = pathname === href || (href === '/work' && pathname?.startsWith('/work'))

    return (
        <Link
            href={href}
            onClick={onClick}
            className={[
                'text-sm font-medium transition-colors',
                active ? 'text-white' : 'text-white/70 hover:text-white'
            ].join(' ')}
        >
            {label}
        </Link>
    )
}

export function SiteHeader() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const onResize = () => setOpen(false)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <Link href="/" className="text-sm font-semibold tracking-tight text-white">
                    Jose Leon
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    {nav.map((item) => (
                        <NavLink key={item.href} href={item.href} label={item.label} />
                    ))}
                    <Link
                        href="/work"
                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                        View Work
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

            {/* Mobile menu */}
            {open ? (
                <div id="mobile-menu" className="border-t border-white/10 bg-black/80 md:hidden">
                    <div className="mx-auto max-w-5xl px-4 py-4">
                        <div className="flex flex-col gap-4">
                            {nav.map((item) => (
                                <NavLink key={item.href} href={item.href} label={item.label} onClick={() => setOpen(false)} />
                            ))}
                            <Link
                                href="/work"
                                onClick={() => setOpen(false)}
                                className="w-fit rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                            >
                                View Work
                            </Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    )
}
