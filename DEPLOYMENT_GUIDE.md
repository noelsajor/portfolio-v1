# 🚢 Deployment Guide

This guide details the process of deploying the Agency Master Template and integrating automated workflows.

## ☁️ Vercel Deployment (Recommended)

### 1. Initial Connection
- Import the repository into your Vercel Dashboard.
- Ensure the **Framework Preset** is set to `Next.js`.
- Add the required Environment Variables. For this project specifically:
  - `RESEND_API_KEY` (required — contact form)
  - `CONTACT_TO_EMAIL` (optional — defaults to noelsajor@gmail.com)
  - `CONTACT_FROM_EMAIL` (required for real production delivery — see `.env.example`)
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional — Google Analytics 4; omit to ship with no analytics)
  - `GOOGLE_SITE_VERIFICATION` (optional — Search Console)
  - `BING_SITE_VERIFICATION` (optional — Bing Webmaster Tools)
  - `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (optional — contact form rate limiting; omit to run with rate limiting disabled/fail-open)

  See `.env.example` for the full list with descriptions of where each value comes from.

### 2. Production Hardening
Before going live, ensure:
- **Build Step**: `pnpm build` succeeds under production environment variables.
- **Custom Domain**: Connect your client's domain and verify SSL propagation.
- **Headers**: Verify that `next.config.ts` security headers are active using [Security Headers](https://securityheaders.com).

## 🪝 Webhook Integration

### CMS Purge (If applicable)
If using a Headless CMS (like Sanity), set up a Deploy Webhook in Vercel:
1.  Go to **Settings > Git > Deploy Hooks**.
2.  Create a name (e.g., `Sanity_Content_Update`) and target branch (`main`).
3.  Copy the URL and paste it into your CMS Webhook settings.

### Analytics Integration
Google Analytics 4 is already integrated in code (`@next/third-parties/google`) — it activates automatically once `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Vercel, and stays off otherwise. It only loads in production, never in local development.

Search Console and Bing Webmaster verification meta tags are also already wired up — set `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` once you have real tokens from each platform.

Optionally, also connect **Vercel Analytics** in the dashboard for real-time Speed Insights and Traffic data — independent of and complementary to the GA4 integration above.

### Contact Form Rate Limiting
The contact endpoint (`/api/contact`) is rate-limited per client IP using [Upstash Redis](https://upstash.com) + `@upstash/ratelimit` (5 requests per 10-minute window — see `src/lib/rate-limit-config.ts`). Create a free Upstash Redis database, then set `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` in Vercel. If left unset, or if Upstash is temporarily unreachable, the endpoint **fails open** (allows the request through) rather than blocking legitimate visitors — this is intentional, see `src/lib/rate-limiter.ts` for the reasoning. No code changes are needed between local development, preview, and production; behavior is controlled entirely by whether these two variables are set.

## 🔄 Deployment Workflow
1.  **Develop** on a feature branch (e.g., `feat/rebrand`).
2.  **Verify** using the Vercel Preview URL.
3.  **Merge** to `main` to trigger the production build.
4.  **Audit** using Lighthouse in the Vercel Dashboard.

---

For technical issues, refer to the [Master Architecture Guide](docs/master-architecture-guide.md) or the [Testing & QA Checklist](docs/best-practices/04-testing-qa-checklist.md).
