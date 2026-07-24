import type { Duration } from '@upstash/ratelimit'

// Centralized so the contact endpoint's abuse policy lives in one place
// instead of being buried inside the route handler.

/** How many requests a single client IP may make within RATE_LIMIT_WINDOW. */
export const RATE_LIMIT_MAX_REQUESTS = 5

/** The sliding window duration tokens are counted over. */
export const RATE_LIMIT_WINDOW: Duration = '10 m'

/** Redis key prefix — namespaces this limiter's keys if the same Upstash
 *  Redis instance is ever reused by another rate-limited endpoint. */
export const RATE_LIMIT_PREFIX = 'ratelimit:contact-form'

/** Milliseconds to wait for Upstash before treating the check as unavailable
 *  and failing open (see checkRateLimit in rate-limiter.ts). */
export const RATE_LIMIT_TIMEOUT_MS = 1000

/** Identifier used when no real client IP can be determined (e.g. local
 *  development, where Vercel's proxy — and therefore x-real-ip — isn't in
 *  front of the request). Keeps the code path identical across
 *  environments instead of branching on "do we have a real IP or not." */
export const RATE_LIMIT_FALLBACK_IDENTIFIER = 'unknown-ip'
