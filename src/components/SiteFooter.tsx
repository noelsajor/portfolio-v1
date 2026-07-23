import Link from 'next/link'

export function SiteFooter() {
    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-10 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
                <p>© {new Date().getFullYear()} Jose Leon</p>
                <address className="not-italic flex flex-wrap gap-4">
                    <Link
                        className="rounded-sm hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        href="mailto:noelsajor@gmail.com"
                        data-tracking="footer_email"
                    >
                        noelsajor@gmail.com
                    </Link>
                    <Link
                        className="rounded-sm hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        href="https://www.linkedin.com/in/noelsajor"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-tracking="footer_linkedin"
                    >
                        LinkedIn
                    </Link>
                </address>
            </div>
        </footer>
    )
}
