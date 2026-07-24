import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rate-limiter'

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'noelsajor@gmail.com'

// onboarding@resend.dev is Resend's shared testing sender: it can only deliver
// to the email address on the Resend account itself, not to arbitrary
// recipients. It is a development/testing fallback only — production requires
// CONTACT_FROM_EMAIL to be set to an address on a domain verified with Resend.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

const MAX_NAME_LENGTH = 200
const MAX_EMAIL_LENGTH = 320
const MAX_MESSAGE_LENGTH = 5000

function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// The name is interpolated into the email subject line — reject control
// characters (newlines in particular) so a submission can't inject extra
// lines into the subject.
function hasControlCharacters(value: string): boolean {
    return /[\x00-\x1f\x7f]/.test(value)
}

export async function POST(request: Request) {
    // Checked before anything else — including whether Resend is configured —
    // so a flood of requests is rejected as cheaply as possible, before any
    // JSON parsing or validation work happens.
    const rateLimit = await checkRateLimit(request)
    if (!rateLimit.success) {
        const retryAfterSeconds = Math.max(0, Math.ceil((rateLimit.reset - Date.now()) / 1000))
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
        )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
        console.error('Contact form: RESEND_API_KEY is not configured')
        return NextResponse.json({ error: 'Contact form is not configured.' }, { status: 500 })
    }

    let body: unknown
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const { name, email, message, website } = (body ?? {}) as Record<string, unknown>

    // Honeypot: bots that fill this hidden field are silently accepted without sending anything.
    // Enforced server-side because a bot can POST here directly, bypassing any client-side check.
    if (typeof website === 'string' && website.trim().length > 0) {
        return NextResponse.json({ success: true })
    }

    if (
        typeof name !== 'string' ||
        !name.trim() ||
        name.length > MAX_NAME_LENGTH ||
        hasControlCharacters(name) ||
        typeof email !== 'string' ||
        !isValidEmail(email) ||
        email.length > MAX_EMAIL_LENGTH ||
        typeof message !== 'string' ||
        !message.trim() ||
        message.length > MAX_MESSAGE_LENGTH
    ) {
        return NextResponse.json(
            { error: 'Please fill in all fields with a valid email address.' },
            { status: 400 }
        )
    }

    const resend = new Resend(apiKey)

    try {
        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            replyTo: email,
            subject: `New portfolio message from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`
        })

        if (error) {
            console.error('Contact form: Resend returned an error', error)
            return NextResponse.json(
                { error: 'Message could not be sent. Please try again later.' },
                { status: 502 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Contact form: send failed', err)
        return NextResponse.json(
            { error: 'Message could not be sent. Please try again later.' },
            { status: 500 }
        )
    }
}
