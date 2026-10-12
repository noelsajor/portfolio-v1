'use client'

import { useEffect, useRef, useState } from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { SUPPORT_TYPES, TIMELINES, SUPPORT_TYPE_LABELS, TIMELINE_LABELS } from '@/lib/contact-form-options'
import type { Locale } from '@/lib/i18n'
import { getUiContent } from '@/lib/ui-content'
import type { ContactErrorCode } from '@/content/en/ui'

export function ContactForm({ lang }: { lang: Locale }) {
    const { contactForm: t } = getUiContent(lang)
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const successRef = useRef<HTMLDivElement>(null)

    // The success view replaces the form entirely, which would otherwise
    // remove the focused submit button from the DOM and drop keyboard/screen
    // reader focus back to the document body with no context.
    useEffect(() => {
        if (status === 'success') successRef.current?.focus()
    }, [status])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // Guards against a duplicate submission firing before the disabled
        // button has re-rendered (e.g. a fast double Enter/click).
        if (status === 'submitting') return

        const formData = new FormData(e.currentTarget)

        // Honeypot check — real enforcement also happens server-side, since a
        // bot can bypass client-side JavaScript entirely.
        if (formData.get('website')) {
            console.warn('Bot detected via honeypot')
            setStatus('success')
            return
        }

        setStatus('submitting')
        setErrorMessage(null)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                    website: formData.get('website'),
                    supportType: formData.get('supportType'),
                    timeline: formData.get('timeline'),
                    budget: formData.get('budget')
                })
            })

            const data: { code?: string; error?: string } | null = await response.json().catch(() => null)

            if (!response.ok) {
                // PR 11: the API returns a stable `code` (see
                // src/app/api/contact/route.ts) that maps to a localized
                // message here; `data.error` is the English fallback for
                // callers that predate the code field.
                const code = data?.code
                const localized =
                    code && code in t.errors ? t.errors[code as ContactErrorCode] : undefined
                setErrorMessage(localized ?? data?.error ?? t.errors.generic)
                setStatus('error')
                return
            }

            // No form content in the event payload — just the fact that a
            // real submission succeeded (honeypot catches above return early
            // and never reach this line, so bot "successes" aren't counted).
            sendGAEvent('event', 'contact_form_submit_success')
            setStatus('success')
        } catch {
            setErrorMessage(t.errors.network)
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center focus:outline-none"
            >
                <h3 className="text-xl font-semibold">{t.successHeading}</h3>
                <p className="mt-2 text-white/70">{t.successBody}</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold text-white/70 hover:text-white"
                >
                    {t.sendAnother}
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
                    <label htmlFor="name" className="text-sm font-medium text-white/70">{t.nameLabel}</label>
                    <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        maxLength={200}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder={t.namePlaceholder}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/70">{t.emailLabel}</label>
                    <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        maxLength={320}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder={t.emailPlaceholder}
                    />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="supportType" className="text-sm font-medium text-white/70">{t.supportTypeLabel}</label>
                    <select
                        required
                        id="supportType"
                        name="supportType"
                        defaultValue=""
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                        <option value="" disabled>
                            {t.selectOne}
                        </option>
                        {SUPPORT_TYPES.map((type) => (
                            <option key={type} value={type}>
                                {SUPPORT_TYPE_LABELS[lang][type]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label htmlFor="timeline" className="text-sm font-medium text-white/70">{t.timelineLabel}</label>
                    <select
                        required
                        id="timeline"
                        name="timeline"
                        defaultValue=""
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                        <option value="" disabled>
                            {t.selectOne}
                        </option>
                        {TIMELINES.map((timeline) => (
                            <option key={timeline} value={timeline}>
                                {TIMELINE_LABELS[lang][timeline]}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium text-white/70">
                    {`${t.budgetLabel} `}
                    <span className="text-white/50">{t.optional}</span>
                </label>
                <input
                    type="text"
                    id="budget"
                    name="budget"
                    maxLength={200}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder={t.budgetPlaceholder}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/70">{t.messageLabel}</label>
                <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={5000}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder={t.messagePlaceholder}
                />
            </div>

            {status === 'error' && errorMessage ? (
                <p role="alert" className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white">
                    {errorMessage}
                </p>
            ) : null}

            <button
                disabled={status === 'submitting'}
                type="submit"
                data-tracking="contact_form_submit"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
            >
                {status === 'submitting' ? t.submitting : t.submit}
            </button>
        </form>
    )
}
