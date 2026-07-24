import Link from 'next/link'
import { ContactForm } from '@/components/ContactForm'
import { buildPageMetadata, siteConfig } from '@/lib/site-config'

export const metadata = buildPageMetadata({
    title: 'Contact',
    description: 'Get in touch with Jose Leon.',
    path: '/contact'
})

export default function ContactPage() {
    return (
        <div className="space-y-12">
            <div className="space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Contact</h1>
                <p className="max-w-2xl text-white/70">
                    Want to chat about a role or a Shopify project? Fill out the form below or reach out on LinkedIn.
                </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
                <ContactForm />
                
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold">Other channels</h2>
                    <address className="not-italic space-y-3">
                        <Link
                            className="block text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
                            href={`mailto:${siteConfig.email}`}
                            data-tracking="contact_email_link"
                        >
                            {siteConfig.email}
                        </Link>
                        <Link
                            className="block text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm"
                            href={siteConfig.sameAs.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tracking="contact_linkedin_link"
                        >
                            LinkedIn
                        </Link>
                    </address>
                </div>
            </div>
        </div>
    )
}
