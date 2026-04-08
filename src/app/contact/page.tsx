import { ContactForm } from '@/components/ContactForm'

export const metadata = {
    title: 'Contact — Jose Leon',
    description: 'Get in touch with Jose Leon.'
}

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
                    <h3 className="text-lg font-semibold">Other channels</h3>
                    <div className="space-y-3">
                        <Link 
                            className="block text-white/80 hover:text-white" 
                            href="mailto:noelsajor@gmail.com"
                            data-tracking="contact_email_link"
                        >
                            noelsajor@gmail.com
                        </Link>
                        <Link
                            className="block text-white/80 hover:text-white"
                            href="https://www.linkedin.com/in/YOUR-HANDLE"
                            target="_blank"
                            rel="noreferrer"
                            data-tracking="contact_linkedin_link"
                        >
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
