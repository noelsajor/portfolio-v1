import Link from 'next/link'
import { FileText, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { localizedPath, type Locale } from '@/lib/i18n'
import { uiContent as uiContentEn } from '@/content/en/ui'
import { uiContent as uiContentEs } from '@/content/es/ui'

const footerLinkClass =
    'flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-200 hover:border-white/60 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30'

function BehanceIcon() {
    return (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4 8h5.1c1.9 0 3.1 1 3.1 2.5 0 1-.5 1.8-1.4 2.2 1.1.4 1.8 1.2 1.8 2.6 0 1.8-1.4 2.9-3.6 2.9H4V8Zm2.2 4h2.5c.8 0 1.3-.4 1.3-1.1s-.5-1.1-1.3-1.1H6.2V12Zm0 4.4h2.7c1 0 1.5-.4 1.5-1.3 0-.8-.6-1.3-1.5-1.3H6.2v2.6ZM14.5 8.7h5.2v1.4h-5.2V8.7Zm2.8 2.5c2.2 0 3.7 1.6 3.7 4v.6h-5.5c.1 1 .8 1.7 1.8 1.7.8 0 1.3-.3 1.6-.9h1.9c-.4 1.6-1.8 2.6-3.5 2.6-2.3 0-3.8-1.6-3.8-4s1.5-4 3.8-4Zm1.7 3.2c-.1-.9-.7-1.5-1.7-1.5-.9 0-1.6.6-1.8 1.5H19Z"
                fill="currentColor"
            />
        </svg>
    )
}

function FigmaIcon() {
    return (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.5 22a3.5 3.5 0 0 0 3.5-3.5V15H9.5a3.5 3.5 0 1 0 0 7ZM6 11.5A3.5 3.5 0 0 0 9.5 15H13V8H9.5A3.5 3.5 0 0 0 6 11.5ZM6 4.5A3.5 3.5 0 0 0 9.5 8H13V1H9.5A3.5 3.5 0 0 0 6 4.5ZM13 1v7h3.5a3.5 3.5 0 1 0 0-7H13ZM20 11.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Z"
                fill="currentColor"
            />
        </svg>
    )
}

function GitHubIcon() {
    return (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.3-.3-4.7-1.1-4.7-5A3.9 3.9 0 0 1 6.4 8c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5.2 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1.1 2.8c0 3.8-2.4 4.7-4.7 4.9.4.3.7 1 .7 2v3.2c0 .3.2.6.8.5A10 10 0 0 0 12 2Z"
                fill="currentColor"
            />
        </svg>
    )
}

function LinkedInIcon() {
    return (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.9 9H3.7v10.3h3.2V9ZM5.3 4a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.3 13.7c0-3-1.6-5-4.2-5-1.9 0-2.8 1.1-3.3 1.8V9H9.7v10.3h3.2v-5.1c0-1.4.3-2.7 2-2.7 1.6 0 1.7 1.5 1.7 2.8v5h3.2v-5.6h.5Z"
                fill="currentColor"
            />
        </svg>
    )
}

export function SiteFooter({ lang }: { lang: Locale }) {
    const uiContent = lang === 'es' ? uiContentEs : uiContentEn
    const { footer } = uiContent

    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-10 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
                <p>© {new Date().getFullYear()} Jose Leon</p>
                <nav aria-label="Footer links" className="flex flex-wrap gap-3">
                    <Link
                        className={footerLinkClass}
                        href={`mailto:${siteConfig.email}`}
                        data-tracking="footer_email"
                        aria-label={footer.ariaEmail(siteConfig.email)}
                    >
                        <Mail aria-hidden="true" className="h-6 w-6" />
                    </Link>
                    <Link
                        className={footerLinkClass}
                        href={siteConfig.sameAs.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-tracking="footer_linkedin"
                        aria-label={footer.ariaLinkedin}
                    >
                        <LinkedInIcon />
                    </Link>
                    <Link
                        className={footerLinkClass}
                        href={siteConfig.sameAs.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-tracking="footer_behance"
                        aria-label={footer.ariaBehance}
                    >
                        <BehanceIcon />
                    </Link>
                    <Link
                        className={footerLinkClass}
                        href={siteConfig.sameAs.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-tracking="footer_github"
                        aria-label={footer.ariaGithub}
                    >
                        <GitHubIcon />
                    </Link>
                    <Link
                        className={footerLinkClass}
                        href={siteConfig.sameAs.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-tracking="footer_figma"
                        aria-label={footer.ariaFigma}
                    >
                        <FigmaIcon />
                    </Link>
                    <Link
                        className={footerLinkClass}
                        href={localizedPath(lang, '/resume')}
                        data-tracking="footer_resume"
                        aria-label={footer.ariaResume}
                    >
                        <FileText aria-hidden="true" className="h-6 w-6" />
                    </Link>
                </nav>
            </div>
        </footer>
    )
}
