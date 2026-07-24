import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { ipAddress } from '@vercel/functions'
import {
    RATE_LIMIT_FALLBACK_IDENTIFIER,
    RATE_LIMIT_MAX_REQUESTS,
    RATE_LIMIT_PREFIX,
    RATE_LIMIT_TIMEOUT_MS,
    RATE_LIMIT_WINDOW
} from './rate-limit-config'

export type RateLimitResult = {
    success: boolean
    limit: number
    remaining: number
    /** Unix ms timestamp when the window resets. */
    reset: number
}

// Built once per warm serverless instance, not per request — this is what
// lets @upstash/ratelimit's ephemeral cache actually help, and avoids
// reconnecting to Redis on every invocation.
let ratelimit: Ratelimit | null = null
let loggedMissingConfig = false

function getRatelimit(): Ratelimit | null {
    if (ratelimit) return ratelimit

    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN

    if (!url || !token) {
        // Expected in local development unless a developer has opted into
        // pointing at a real (e.g. free-tier) Upstash instance locally too.
        // Logged once per warm instance, not once per request.
        if (!loggedMissingConfig) {
            console.error(
                'Contact form: UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN are not configured — rate limiting is disabled, all requests are allowed through.'
            )
            loggedMissingConfig = true
        }
        return null
    }

    ratelimit = new Ratelimit({
        redis: new Redis({ url, token }),
        limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW),
        prefix: RATE_LIMIT_PREFIX,
        // Upstash guidance: if Redis doesn't respond within this window,
        // resolve as allowed rather than hanging the request.
        timeout: RATE_LIMIT_TIMEOUT_MS
    })
    return ratelimit
}

/** x-real-ip is set by Vercel's edge proxy itself from the actual TCP
 *  connection — a client can't override it by sending its own header, unlike
 *  x-forwarded-for, which a proxy may merely append to. Only meaningful on
 *  Vercel; absent entirely in local development (see the fallback below). */
function getClientIdentifier(request: Request): string {
    return ipAddress(request) ?? RATE_LIMIT_FALLBACK_IDENTIFIER
}

/**
 * Checks the contact form's per-IP rate limit.
 *
 * Fails OPEN: if Upstash isn't configured, times out, or throws for any
 * reason, the request is allowed through (and the failure is logged). This
 * is an intentional choice, not an oversight — rate limiting here is
 * defense-in-depth on top of Zod validation, the honeypot, and Resend's own
 * abuse controls, not the sole gate. A third-party outage should never take
 * down a portfolio's contact form for every legitimate visitor.
 */
export async function checkRateLimit(request: Request): Promise<RateLimitResult> {
    const limiter = getRatelimit()
    if (!limiter) {
        return { success: true, limit: RATE_LIMIT_MAX_REQUESTS, remaining: RATE_LIMIT_MAX_REQUESTS, reset: 0 }
    }

    const identifier = getClientIdentifier(request)

    try {
        const result = await limiter.limit(identifier)
        return result
    } catch (err) {
        console.error('Contact form: rate limiter request failed, allowing request through', err)
        return { success: true, limit: RATE_LIMIT_MAX_REQUESTS, remaining: RATE_LIMIT_MAX_REQUESTS, reset: 0 }
    }
}
