'use client'

import { useState } from 'react'

export function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        // Honeypot check
        if (formData.get('website')) {
            console.warn('Bot detected via honeypot')
            setStatus('success') // Silently fail for bots
            return
        }

        setStatus('submitting')
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setStatus('success')
    }

    if (status === 'success') {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <h3 className="text-xl font-semibold">Message sent!</h3>
                <p className="mt-2 text-white/70">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold text-white/70 hover:text-white"
                >
                    Send another message
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field - hidden from users */}
            <div className="hidden" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/70">Name</label>
                    <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="Your name"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/70">Email</label>
                    <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="email@example.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/70">Message</label>
                <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="How can I help?"
                />
            </div>

            <button
                disabled={status === 'submitting'}
                type="submit"
                data-tracking="contact_form_submit"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
            >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    )
}
