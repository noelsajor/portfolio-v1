import Link from 'next/link'

export const metadata = {
    title: 'Contact — Jose Leon',
    description: 'Get in touch with Jose Leon.'
}

export default function ContactPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Contact</h1>
            <p className="max-w-2xl text-white/70">
                Want to chat about a role or a Shopify project? Email me or reach out on LinkedIn.
            </p>

            <div className="space-y-3">
                <Link className="block text-white/80 hover:text-white" href="mailto:noelsajor@gmail.com">
                    noelsajor@gmail.com
                </Link>
                <Link
                    className="block text-white/80 hover:text-white"
                    href="https://www.linkedin.com/in/YOUR-HANDLE"
                    target="_blank"
                    rel="noreferrer"
                >
                    LinkedIn
                </Link>
            </div>
        </div>
    )
}
