import { siteConfig } from './site-config'
import type { Locale } from './i18n'

// Composes the notification email the contact form sends. Lives outside the
// route handler so the route stays about HTTP (validation, rate limiting,
// error codes) and this stays about the message itself.

// Every value below is attacker-controlled and ends up inside the HTML part
// of the email, so it is escaped before interpolation. Without this, a
// submission could inject markup (or a link) into the message that lands in
// the inbox.
export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

/** Notification email body. Sent as HTML + plain text (multipart): clients
 *  that render HTML get the readable version, everything else falls back to
 *  the text part, which is also what plain-text-only filters index. */
export function buildContactEmail(fields: {
    name: string
    email: string
    message: string
    supportType: string
    timeline: string
    budget: string
    lang: Locale
}) {
    const { name, email, message, supportType, timeline, budget, lang } = fields
    const site = siteConfig.siteUrl.replace(/^https?:\/\/(www\.)?/, '')
    const language = lang === 'es' ? 'Español (/es)' : 'English (/en)'

    const text = [
        `From: ${name} <${email}>`,
        `Language: ${language}`,
        `Support type: ${supportType}`,
        `Timeline: ${timeline}`,
        `Budget/engagement: ${budget}`,
        '',
        message
    ].join('\n')

    const rows = [
        ['Language', language],
        ['Support type', supportType],
        ['Timeline', timeline],
        ['Budget', budget]
    ]
        .map(
            ([label, value]) =>
                `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;font-size:13px;white-space:nowrap">${escapeHtml(label)}</td>` +
                `<td style="padding:4px 0;color:#111827;font-size:13px">${escapeHtml(value)}</td></tr>`
        )
        .join('')

    // Inline styles and a table layout on purpose: email clients strip <style>
    // blocks and have no reliable flexbox support.
    const html = [
        '<div style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111827">',
        `<p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280">${escapeHtml(site)}</p>`,
        `<h1 style="margin:0 0 2px;font-size:20px;font-weight:600">${escapeHtml(name)}</h1>`,
        `<p style="margin:0 0 20px;font-size:14px"><a href="mailto:${escapeHtml(email)}" style="color:#2563eb;text-decoration:none">${escapeHtml(email)}</a></p>`,
        `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">${rows}</table>`,
        '<div style="border-top:1px solid #e5e7eb;padding-top:16px;font-size:14px;line-height:1.6;white-space:pre-wrap">',
        escapeHtml(message),
        '</div>',
        `<p style="margin:24px 0 0;font-size:12px;color:#9ca3af">Reply to this email to answer ${escapeHtml(name)} directly.</p>`,
        '</div>'
    ].join('')

    // Domain first so the inbox can filter on it, then the locale, so the
    // reply goes out in the language the visitor was reading.
    const subject = `${site} [${lang.toUpperCase()}] New message from ${name}`

    return { subject, text, html }
}
