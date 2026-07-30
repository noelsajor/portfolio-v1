# Production Checklist

Tracks future launch tasks that are intentionally **not implemented yet**. Nothing in this file should be treated as done until it's checked off and the corresponding change has actually shipped.

## Domain Migration

The site references `https://noelsajor.com` as its canonical production domain in `src/lib/site-config.ts`. The domain has been purchased and added to Vercel; DNS propagation is currently in progress, so the domain does not resolve to the site yet.

- [x] Purchase noelsajor.com
- [x] Connect domain in Vercel
- [ ] DNS propagation completed
- [ ] Verify domain in Resend
- [ ] Replace `onboarding@resend.dev` with `Portfolio Contact <contact@noelsajor.com>`
- [ ] Update `CONTACT_FROM_EMAIL`
- [ ] Verify production email delivery
- [x] Configure CSP (Step 7)
- [x] Review security headers (Step 7 — X-Frame-Options, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Strict-Transport-Security; `X-Powered-By` disabled)
- [ ] Review Core Web Vitals after production launch

## Analytics & Search Engine Integration (Step 8)

Code-side integration is implemented and verified; each item below is a
manual, account-side action still required before it's live.

- [x] Google Analytics 4 wired up (`@next/third-parties/google`, gated to
      production only, reads `NEXT_PUBLIC_GA_MEASUREMENT_ID`, includes a
      page-view tracker for App Router client-side navigation)
- [ ] Create a real GA4 property and set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in
      Vercel's environment variables (currently unset — no analytics is
      running in production yet)
- [x] Search Console verification meta tag wired up
      (`metadata.verification.google`, reads `GOOGLE_SITE_VERIFICATION`)
- [ ] Verify ownership in Google Search Console (get the token from Search
      Console → Settings → Ownership verification → HTML tag, set
      `GOOGLE_SITE_VERIFICATION` in Vercel)
- [ ] Submit sitemap to Google Search Console (`https://noelsajor.com/sitemap.xml`)
      once the domain resolves and ownership is verified
- [x] Bing Webmaster verification meta tag wired up
      (`metadata.verification.other['msvalidate.01']`, reads
      `BING_SITE_VERIFICATION`)
- [ ] Verify ownership in Bing Webmaster Tools (Settings → Verify ownership
      → Meta Tag, set `BING_SITE_VERIFICATION` in Vercel)
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Configure privacy-friendly analytics (optional, e.g. Plausible/Fathom)
      — not implemented; GA4 was the requested integration for this step

## Known Residual Items (Step 10 Release Audit)

- [x] Create `.env.example` — created and verified against every real
      `process.env` usage in the codebase (Phase 1, Objective 2).
- [ ] Decide on `sharp`/`postcss`/`brace-expansion` transitive vulnerabilities
      (`pnpm audit`) — explicitly deferred at Step 1, still present. All are
      nested inside `next`'s or `eslint`'s own dependency tree, not fixable
      via a direct version bump. `brace-expansion` is dev-only (ESLint
      tooling, never shipped). `sharp`/`postcss` are Next's own build-time
      dependencies; `sharp`'s runtime image-processing path isn't currently
      exercised in production since no real gallery image is live yet
      (`status: pending` on every gallery item).
- [ ] Decide whether to load the real "Inter" typeface via `next/font`.
      `globals.css` currently declares it but nothing actually loads it — the
      site renders in system-fallback fonts today. Documented as a
      design/product decision in `docs/performance-baseline.md`, not fixed,
      since adding real font loading would add a network request.
- [ ] Add real cover images for all five case studies (`coverImage`/
      `coverAlt` are intentionally omitted in their MDX frontmatter until a
      real image exists — see `_template.mdx`) and real gallery images (all
      `status: pending`). All five are anonymized — any image must be
      cropped/redacted so it doesn't reveal the client's name, domain, or
      product branding.
