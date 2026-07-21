# 🚢 Deployment Guide

This guide details the process of deploying the Agency Master Template and integrating automated workflows.

## ☁️ Vercel Deployment (Recommended)

### 1. Initial Connection
- Import the repository into your Vercel Dashboard.
- Ensure the **Framework Preset** is set to `Next.js`.
- Add any required Environment Variables (e.g., `NEXT_PUBLIC_GTM_ID`).

### 2. Production Hardening
Before going live, ensure:
- **Build Step**: `npm run build` succeeds under production environment variables.
- **Custom Domain**: Connect your client's domain and verify SSL propagation.
- **Headers**: Verify that `next.config.ts` security headers are active using [Security Headers](https://securityheaders.com).

## 🪝 Webhook Integration

### CMS Purge (If applicable)
If using a Headless CMS (like Sanity), set up a Deploy Webhook in Vercel:
1.  Go to **Settings > Git > Deploy Hooks**.
2.  Create a name (e.g., `Sanity_Content_Update`) and target branch (`main`).
3.  Copy the URL and paste it into your CMS Webhook settings.

### Analytics Integration
Connect **Vercel Analytics** in the dashboard to get real-time Speed Insights and Traffic data without extra client-side scripts.

## 🔄 Deployment Workflow
1.  **Develop** on a feature branch (e.g., `feat/rebrand`).
2.  **Verify** using the Vercel Preview URL.
3.  **Merge** to `main` to trigger the production build.
4.  **Audit** using Lighthouse in the Vercel Dashboard.

---

For technical issues, refer to the [Master Architecture Guide](docs/master-architecture-guide.md) or the [Testing & QA Checklist](docs/best-practices/04-testing-qa-checklist.md).
