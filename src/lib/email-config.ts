// Centralizes validation of every email-related environment variable, so the
// route handler has one place to ask "is sending even possible right now?"
// instead of scattering ad-hoc checks through the request-handling logic.

import { siteConfig } from './site-config'

// Resend's shared testing sender. It can only deliver to the email address on
// the Resend account itself, not to arbitrary recipients — a real
// development convenience, but never acceptable as a silent production
// default (see resolveEmailConfig below).
export const RESEND_SANDBOX_SENDER = 'onboarding@resend.dev'

export function isValidEmailAddress(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/** CONTACT_FROM_EMAIL may be a bare address or "Display Name <address>"
 *  (Resend supports both as a `from` value) — extract just the address
 *  portion to validate, but return the original value unchanged for use. */
function extractEmailAddress(value: string): string | null {
    const angleMatch = value.match(/<([^<>]+)>\s*$/)
    const candidate = (angleMatch ? angleMatch[1] : value).trim()
    return isValidEmailAddress(candidate) ? candidate : null
}

export type EmailConfig = {
    apiKey: string
    from: string
    to: string
}

export type EmailConfigResult = { ok: true; config: EmailConfig } | { ok: false; reason: string }

/**
 * Validates RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL
 * together and resolves the values the route handler should actually use.
 *
 * Fails fast and predictably: any missing or malformed value returns
 * `{ ok: false, reason }` instead of letting a broken configuration reach
 * Resend's API (or, worse, silently succeed against the wrong sender or
 * recipient). `reason` is for server-side logging only — the route handler
 * must never forward it to the client.
 */
export function resolveEmailConfig(): EmailConfigResult {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
        return { ok: false, reason: 'RESEND_API_KEY is not configured.' }
    }
    if (!apiKey.startsWith('re_') || apiKey.length < 10) {
        return { ok: false, reason: 'RESEND_API_KEY does not look like a valid Resend API key (expected a "re_" prefixed value).' }
    }

    const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email
    if (!isValidEmailAddress(to)) {
        return { ok: false, reason: `CONTACT_TO_EMAIL ("${to}") is not a valid email address.` }
    }

    const isProduction = process.env.NODE_ENV === 'production'
    const configuredFrom = process.env.CONTACT_FROM_EMAIL?.trim()

    if (!configuredFrom) {
        if (isProduction) {
            return {
                ok: false,
                reason:
                    'CONTACT_FROM_EMAIL is not configured. Production requires a sender address on a domain verified with Resend — the onboarding@resend.dev sandbox sender is not usable in production because it can only deliver to the Resend account\'s own address.'
            }
        }
        // Local development only: the sandbox sender lets the form work
        // end-to-end without requiring a verified domain.
        return { ok: true, config: { apiKey, from: RESEND_SANDBOX_SENDER, to } }
    }

    const fromAddress = extractEmailAddress(configuredFrom)
    if (!fromAddress) {
        return { ok: false, reason: `CONTACT_FROM_EMAIL ("${configuredFrom}") is not a valid email address or "Name <email>" value.` }
    }

    if (isProduction && fromAddress === RESEND_SANDBOX_SENDER) {
        return {
            ok: false,
            reason:
                'CONTACT_FROM_EMAIL is explicitly set to the onboarding@resend.dev sandbox sender, which is not allowed in production. Set it to an address on a domain verified with Resend.'
        }
    }

    return { ok: true, config: { apiKey, from: configuredFrom, to } }
}
