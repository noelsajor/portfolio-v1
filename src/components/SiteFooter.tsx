import Link from 'next/link'

export function SiteFooter() {
    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-10 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
                <p>© {new Date().getFullYear()} Jose Leon</p>
                <div className="flex flex-wrap gap-4">
                    <Link className="hover:text-white" href="mailto:noelsajor@gmail.com">
                        noelsajor@gmail.com
                    </Link>
                    <Link className="hover:text-white" href="https://www.linkedin.com/in/noelsajor" target="_blank" rel="noreferrer">
                        LinkedIn
                    </Link>
                </div>
            </div>
        </footer>
    )
}
