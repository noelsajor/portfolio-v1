import type { Metadata } from 'next'

// Third-party integration IDs, read only from environment variables — never
// hardcoded, and never invented. Every value here is optional: if unset, the
// corresponding integration simply doesn't render anything.

// NEXT_PUBLIC_ is required here because the ID must reach the client bundle
// for gtag.js to load in the browser.
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// These two are rendered directly into <meta> tags by the Metadata API at
// build/render time on the server — they never reach client JS, so no
// NEXT_PUBLIC_ prefix.
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION
const bingSiteVerification = process.env.BING_SITE_VERIFICATION

// Builds the `verification` field of the root Metadata object. Returns an
// empty object (no `verification` key at all) when neither token is
// configured, so the Metadata API renders no verification meta tags rather
// than a tag with an empty/undefined value.
export function buildVerificationMetadata(): Pick<Metadata, 'verification'> {
    if (!googleSiteVerification && !bingSiteVerification) return {}

    return {
        verification: {
            ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
            ...(bingSiteVerification ? { other: { 'msvalidate.01': bingSiteVerification } } : {})
        }
    }
}
