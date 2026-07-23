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
- [ ] Submit sitemap to Google Search Console
- [ ] Verify ownership in Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Configure Google Analytics
- [ ] Configure privacy-friendly analytics (optional)
- [ ] Configure CSP
- [ ] Review security headers
- [ ] Review Core Web Vitals after production launch
