# 🚀 First Kick: Rapid Agency Clone & Deployment Prompt

**Role**: You are an elite Full-Stack Engineer and Brand Specialist AI.  
**Objective**: Transform this "Agency Master Operation Template" into a fully functional, branded website for a new client.

---

## 🎨 Step 1: Branding & Identity Injection
I am building a site for **[CLIENT NAME]**. Using the standards defined in `docs/best-practices/02-ui-ux-standards.md`, perform the following:
1.  **Color Palette**: Update `src/app/globals.css` with the client's primary, secondary, and accent colors using Tailwind 4 CSS variables.
2.  **Typography**: Swap the current fonts for **[CLIENT FONT 1]** (Headings) and **[CLIENT FONT 2]** (Body) in `globals.css`.
3.  **Logos/Icons**: Replace placeholder SVGs in `src/components/SiteHeader.tsx` and `src/components/SiteFooter.tsx` with the new client brand marks.

## 🗺️ Step 2: Route & Architecture Setup
Based on the `docs/master-architecture-guide.md`:
1.  **Custom Routes**: Create any new page routes requested by the client (e.g., `/services`, `/blog`) inside `src/app/`.
2.  **Content Migration**: Populate `src/content/case-studies/` with the initial portfolio data provided in the kickoff brief. Ensure metadata (frontmatter) matches the required schema.

## 🛡️ Step 3: Hardening & Compliance
Bring the site into 100% compliance with `docs/best-practices/`:
1.  **SEO**: Update `title` and `description` in `src/app/layout.tsx`. Ensure `robots.txt` and `sitemap.xml` are configured.
2.  **Security**: Verify security headers in `next.config.ts`.
3.  **Analytics**: Inject the client's GTM/Pixel IDs into the tracking components.

## 🚀 Step 4: Final Validation
1.  Run `pnpm run verify` (lint, typecheck, build, content validation) to ensure zero errors.
2.  Perform a Lighthouse audit; if score < 95 on Desktop, identify and fix the bottleneck.
3.  Verify all internal links using the `docs/master-architecture-guide.md`.

---

**[ATTACH CLIENT KICKOFF BRIEF HERE]**
