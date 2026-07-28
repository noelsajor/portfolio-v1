# Analytics and campaign tracking

Per Phase 3, Step 3.3. GA4 was already installed (`@next/third-parties`,
`src/lib/analytics-config.ts`, `src/app/layout.tsx`) before this phase —
audited first, no second analytics system was added on top of it.

## Provider decision

**Kept GA4, did not add Vercel Analytics or Plausible.** GA4 already covers
page views, custom events, and UTM-based campaign attribution — installing a
second system would duplicate data collection without a distinct reason.
Revisit only if GA4 turns out to be insufficient for a specific need (e.g. a
privacy requirement GA4 can't meet).

- **What it measures**: page views (including client-side route changes),
  the events listed below, and standard GA4 traffic/session dimensions
  (referrer, device, geography at country/region level, UTM parameters).
- **What it does not measure**: form field contents, email addresses, or any
  other user-submitted text — no event below sends form data as a payload.
- **Privacy implications**: GA4 sets first- and third-party cookies and
  processes IP-derived geolocation. No cookie-consent banner exists in this
  repo today. If your audience includes EU/UK visitors, GDPR generally
  requires consent before non-essential analytics cookies load — that's a
  judgment call outside this audit's scope, flagging it here rather than
  building consent infrastructure without being asked.
- **Cost**: GA4 is free at this traffic scale.
- **Required env vars**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Analytics only activates when this is set AND
  `NODE_ENV === 'production'` — unset in development, no accidental
  pollution of production data.

## Events tracked

| Event | Fired by | Trigger |
|---|---|---|
| `page_view` | `GoogleAnalyticsPageViews.tsx` (pre-existing) | Every client-side route change after the first load |
| `cta_click` | `GoogleAnalyticsClickTracking.tsx` (new) | Any click on an element with `data-tracking="<id>"` — covers header/hero/footer/resume/landing-page CTAs and project cards sitewide, using the `data-tracking` markup already present everywhere. `cta_id` in the event payload is that element's id. |
| `contact_form_submit_success` | `ContactForm.tsx` (new) | Fires only after the API confirms a real submission succeeded — never on the honeypot's silent bot-facing "success," and never with form content in the payload |

Resume-download and scheduling-link click events aren't implemented yet
because those features don't exist (`BLOCKED — RESUME PDF REQUIRED`, no
scheduling link — see Phase 1/2 reports). Add `data-tracking` to those
elements once they exist and they'll be picked up automatically by the same
delegated click listener — no additional wiring needed.

Agency landing-page visits and case-study views don't need a dedicated
event — they're already captured by the existing `page_view` tracking on
`/for-agencies` and `/work/[slug]`.

## UTM convention

Use these four parameters on every outbound link shared as part of an
outreach effort:

- `utm_source` — where the link was shared (e.g. `linkedin`, `email`, `github`)
- `utm_medium` — the channel type (e.g. `social`, `outreach`, `referral`)
- `utm_campaign` — the specific effort (e.g. `agency-prospecting-q3`,
  `recruiter-application`)
- `utm_content` — variant/placement, when A/B-ing copy or links (optional)

### Example categories (`utm_campaign` values)

- `linkedin-outreach`
- `cold-email`
- `recruiter-application`
- `agency-prospecting`
- `shopify-outreach`
- `portfolio-share`

GA4 parses these automatically from the URL — no code change is needed to
support them; just append them to whatever link you share, e.g.:

```
https://noelsajor.com/for-agencies?utm_source=linkedin&utm_medium=social&utm_campaign=agency-prospecting
```
