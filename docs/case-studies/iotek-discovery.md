# iOTEK — Discovery Report (Final)

**Status**: Discovery complete. This is a research/reconciliation document — it is not the case study narrative and not MDX. It is the source material the Project Brief and, later, the case study will be built from.

*Evidence key: **A** = Repository-verified · **B** = User-confirmed · **C** = Company context (not personal achievement) · **D** = Inferred · **E** = Unverified*

---

## 1. Executive Summary

iOTEK is a real IoT/connectivity company operating as **IOTEK LLC** (A — Privacy Policy), with offices in Orlando, FL and Caguas, PR (A/C). Employment is now fully confirmed (B): **Graphic Designer** was the official HR title, in the **Marketing** department, **full-time remote**, for **5–6 months (ongoing)** — but the actual scope of the role spanned Graphic Design, UI/UX Design, and Junior Front-End Development, reporting to **Alexie Falú (COO & CTO)** and **Kiara Gerena (Marketing Manager)**.

Website authorship is now fully confirmed (B, corroborated by A): the original Astro website — UX, visual design, information architecture, front-end implementation, responsive layouts, bilingual experience, dark/light theme, Zoho CRM integration, and Vercel production deployment — was built solely by the user, replacing an outdated prior company site. Business direction and requirements came from Alexie Falú; execution and implementation were the user's sole responsibility. No other developer contributed code to that repository. Later content-only updates (at least one blog post) were made by Kiara Gerena's team — consistent with her role as Marketing Manager, and consistent with the "later marketing/content updates by other team members" distinction the user asked to preserve.

Separately, a formal brand-identity system (A) and a substantial body of user-confirmed campaign, sales-enablement, and physical-application work (B) round out the picture. One unreconciled second codebase remains a non-blocking open thread (Section 18).

## 2. Employment Context

- **B (confirmed)** — Official title: **Graphic Designer**.
- **B (confirmed)** — Actual responsibilities: Graphic Design, UI/UX Design, Junior Front-End Development. The gap between official title and real scope is deliberate context to carry into the case study — it explains why front-end/UX work appears under a "Graphic Designer" HR record.
- **B (confirmed)** — Department: **Marketing**.
- **B (confirmed)** — Employment type: **Full-time remote employee**.
- **B (confirmed)** — Duration: **5–6 months (ongoing)**. No exact start/end dates — none should be invented.
- **B (confirmed)** — Reporting structure: **Alexie Falú** (COO & CTO) and **Kiara Gerena** (Marketing Manager).
- **A** — New Employee Intake Form: iOTEK Corp, 8529 Southpark Circle, Suite 420, Orlando, FL 32819, iotekcorp.net.
- **A** — Legal operating entity: **IOTEK LLC** (Privacy Policy, repo).
- **C** — Company scale (3 offices, 2,000+ active clients, 30,000+ units connected, 65+ team members, 100+ projects delivered): iOTEK's own sales-deck claims, not personal achievements.
- **Cross-reference worth noting**: Kiara Gerena (Marketing Manager, confirmed supervisor) is also the credited author of two of the three current blog posts (`post3`, `post4`) per the repository — consistent with her role and with the "later content updates by other team members" distinction below.

## 3. Engagement Timeline

**A — Original repo (git-verified)**: 77 commits, **2026-05-11 → 2026-07-20** (~10 weeks), which fits comfortably inside the confirmed 5–6-month, currently-ongoing employment window. Phase progression: initial Astro build + i18n → visual/theme system iteration (dark/light, Phosphor icons, Sora/Audiowide) → real content integration (client logos, ConWaste stat correction, TrackPRO→iOTEK Telematics rename, Teltonika de-branding) → commerce features (product modal, ProductsTabs) → Zoho CRM lead-gen integration → short-lived MIDA 2026 trade-show banner → legal/compliance buildout → blog/news system (final commit, same day as the ESL post dated 2026-07-20).

**A — Engram session record**: 2026-05-14 (initial session), 05-15 (ConWaste correction), 05-22 (icons), 05-28 (brand system — single dense day), 05-29–06-02 (component work), 06-24 (CRM doc), 07-09–07-17 (sales/newsletter assets).

**Unreconciled thread**: `~/Downloads/iotek-website`, most recent activity 2026-07-18/19, no git history, internally references "Phase 6"/"Phase 7" with no earlier phases documented anywhere found. Non-blocking (Section 18).

## 4. Repository-Verified Website Work (A, authorship now B-confirmed as solely the user's)

Astro 6.4.8 + Tailwind CSS v4, custom-built i18n (EN/ES, `localStorage`-persisted, browser-language auto-detect) and dark/light theme system (OS-preference auto-detect, anti-flash inline script). Routes: `/` (Header, Hero division-carousel, PartnerStrip, IndustriesGrid, ProductsTabs, hidden legacy ProductsCarousel, ContactForm, FeatureSplit, SuccessMotion, CtaBanner, BlogSection, Footer), `/news` + `/news/[slug]` (blog system with category filters and breadcrumb JSON-LD SEO), `/policies/*` (Privacy Policy — real legal content; Cookie Policy and Terms — placeholder content). A live **Zoho CRM Web-to-Lead** form (real form ID, posts to Zoho's servers, Zoho analytics tracking) is the only tracking/analytics script found anywhere in the site. Product interaction: a full detail modal triggered from `ProductsTabs`. Deployed on Vercel (`vercel.json`).

Five referenced domains/products in the real Privacy Policy text (A): iotekcorp.net, iotektrack.com, iotektrackpro.com, iotektrakit.com, vistasim.com.

## 5. Repository-Verified Brand-System Work (A)

30-page Brand Manual PDF: logo construction rationale (six-hexagon honeycomb, IoT-network metaphor), safe area, primary palette (Lambo Blue #0F41BD, Volt Lime #D7FF1F, Dusty, Obsidian, Mist) + 10-color secondary spectral palette, typography (Sora body, Audiowide headings), correct/incorrect use, monochromatic variants, 10 division sub-brand lockups, icon set, honeycomb pattern, and application mockups. Full 72-file SVG asset export. Authored in **Pencil**.

## 6. Repository-Verified Marketing and Sales-Enablement Work (A)

Bilingual (EN/ES) ESL sales deck — company overview, capability grid, ESL Operation Platform (WDOP) detail, product line, named manufacturer partner (Wintec), a named real client success story (Megasuper, Costa Rica), competitive comparison, channel-partner program. ESL newsletter, flyer/brochure, email-signature HTML library, and a Zoho CRM lead-form integration document that directly corroborates the live Zoho form in the website code.

Real trade-show evidence: DistribuTech International 2024 (Orlando) and MIDA Puerto Rico references; a MIDA 2026 announcement banner was added to the site header and later removed.

## 7. User-Confirmed Deliverables (B)

**Brand and identity applications**: master-brand applications; division-specific visual systems; SIM-card branding proposals; Track, Track PRO, and Trakit identity explorations; icon systems; supporting illustrations; reusable brand patterns and visual assets.

**Website and digital**: corporate website UI/UX; Astro front-end implementation; responsive components; division and product content; website banners; campaign imagery; SEO and accessibility considerations; Vercel and iotekcorp.net migration/deployment support. *(This category is now doubly confirmed — both B and directly A-verified in the repository.)*

**Marketing and campaigns**: ESL campaign; fleet-management and telematics campaigns; GPS-tracking campaign; construction and heavy-equipment campaign; young-driver safety campaign; social-media visuals; YouTube thumbnail concepts and templates; product/device visualizations; 5G, SIM, antenna, GPS, IoT, fleet, and ESL compositions.

**Email and sales enablement**: HTML newsletters; ESL newsletter; flyers; brochures; sales presentations; bilingual collateral; email-signature system; CRM lead-form support.

**Physical applications**: trade-show booth design; booth-wall graphics; spatial-layout iterations; Hyundai Santa Fe vehicle-wrap design; printed promotional applications; SIM-card physical branding.

## 8. Company Context and Client Results (C)

Client case-study results are company/client outcomes, not personal achievements, even where the user built the page presenting them: Power Solar (300-vehicle fleet, since 2020), ConWaste (1,000 IoT devices, since 2019), Central Industrial (100% billing accuracy). Company-wide stats are C. Preserve in the case study: *"I built the interface/system that presents these results"* (A/B, the user's) vs. *"these results happened"* (C, the client's/company's).

## 9. Responsibilities

**A/B (confirmed)**: sole design and front-end implementation of the production website (UX, visual design, information architecture, Astro build, responsive layouts, bilingual i18n, dark/light theming, CRM integration, Vercel deployment) — replacing an outdated prior company site, executing against business direction set by Alexie Falú. Brand-system authorship (logo, palette, typography, division architecture, icon set) and asset-consistency auditing.
**B**: campaign design across telematics/GPS/ESL/construction/young-driver-safety themes; physical brand application design (vehicle wrap, booth, SIM card); sales-enablement content.

## 10. Technologies

**A**: Astro 6.4.8, Tailwind CSS v4, Phosphor icons, Zoho CRM (Web-to-Lead + analytics), Vercel, Pencil (design source), Google Fonts Sora + Audiowide.

## 11. Brand and Design Systems

**A**: master brand + 10 division sub-brands, two-tier color palette, two-typeface system, full usage guidelines, 72-file asset export.
**B**: SIM-card branding proposals; Track/Track PRO/Trakit identity explorations.

## 12. Development Systems (A, sole authorship B-confirmed)

Astro component architecture (14 components, one orphaned/unused); data-driven content (plain JS files, no CMS) for divisions, products, and blog posts; custom i18n and theme runtimes; live third-party CRM integration; Vercel deployment pipeline.

## 13. Marketing and Lead-Generation Systems

**A**: live Zoho Web-to-Lead form + analytics; bilingual ESL sales deck; newsletter; flyer/brochure; email-signature library.
**B**: broader campaign work by theme; social-media visuals; YouTube thumbnail concepts; product/device compositions.

## 14. Physical Brand Applications (B)

Trade-show booth design and booth-wall graphics; spatial-layout iterations; Hyundai Santa Fe vehicle-wrap design; printed promotional applications; SIM-card physical branding. None located in any repository or document yet — retained as user-confirmed.

## 15. Authorship, Collaboration, and Ongoing Maintenance Boundaries

**Now fully confirmed (B)**: the user was the **sole developer** of the original repository — no other developer contributed code. The user designed and built the entire production website: UX, visual interface, information architecture, front-end implementation, responsive layouts, bilingual experience, theme system, CRM integration, and Vercel deployment. Business direction and requirements came from Alexie Falú (COO & CTO); execution was entirely the user's.

**The one standing distinction, per the user's explicit instruction**: "my implementation" (the website itself — design, architecture, code, deployment) versus "later marketing/content updates made by other team members" (specifically: the most recent blog post, authored by Kiara Gerena, the user's own Marketing Manager — a clean, internally consistent explanation rather than an open question).

This resolves the authorship gap from the prior report version. It is now accurate to state in the Project Brief that the user designed, built, implemented the front-end of, and developed the production Astro site.

## 16. Available Assets

72 SVG logo/isotype files; 30-page brand manual PDF; ESL sales decks (EN + SPN, digital + print); newsletter images + HTML; flyer/brochure PNG; email-signature HTML library; 3 case-study PDFs + 3 client logos; 49 files in `public/images/` (incl. real DistribuTech event photos); full brand manual application mockups.

## 17. Assets Still to Locate

Real screenshots of the deployed live site; files for the confirmed-but-unlocated work: SIM-card branding proposals, Track/Track PRO/Trakit identity explorations, campaign compositions, social-media visuals, YouTube thumbnail templates, trade-show booth/wall graphics, Hyundai Santa Fe vehicle-wrap design files, physical SIM-card branding files. None of these are blocking for the Project Brief — they matter later, at MDX/asset-gathering time.

## 18. Two-Codebase Comparison

| | Original repo | Second repo |
|---|---|---|
| Path | `~/Desktop/Work/vercel/iotek` | `~/Downloads/iotek-website` |
| VCS | Git, 77 commits, 2026-05-11→07-20 | None |
| Deployment | Vercel | None found |
| Stack | Astro 6.4.8, plain Tailwind v4 | Astro ^7.1.1, CVA + Storybook + Chromatic + Playwright + axe-core + Lighthouse CI |
| Authorship | Confirmed sole work of the user | Unconfirmed |
| Relationship to employment | Directly confirmed | **Still unconfirmed — non-blocking** |

## 19. Narrative Options (unchanged from prior assessment, retained for reference)

The umbrella narrative — *"Building a scalable digital brand and lead-generation ecosystem for a multi-division IoT company"* — remains the strongest candidate. Full comparison table preserved from the previous discovery pass; not repeated here to avoid duplication. See recommendation below.

## 20. Recommended Flagship Direction

**Confirmed: the umbrella narrative.** With sole authorship of the production website now fully confirmed, this narrative can be stated with full confidence rather than hedged: the user replaced an outdated company site with a new UX, visual system, information architecture, bilingual/responsive front-end, theme system, and live CRM lead-gen integration — solo — while also authoring the underlying brand-identity system, across a real 5–6 month (ongoing) full-time employment. Company/client results (Section 8) stay labeled as context; the Kiara Gerena blog post is the one clean, resolved authorship boundary to note, not an open question.

## 21. Remaining Questions

None blocking. Both prior blocking questions (employment specifics, development authorship) are resolved. Non-blocking, deferred to later phases: the second-codebase relationship (Section 18) and locating files for unconfirmed physical/campaign work (Section 17).

## 22. Revised Confidence Score

**90%** (up from 70%). Both blocking gaps are closed. The remaining 10% reflects genuinely deferred, non-blocking items (unlocated physical/campaign assets, the second codebase) that affect asset-gathering later, not the validity of the narrative or brief.

## 23. Readiness for Project Brief

**Ready.** Discovery is complete. Proceeding to the Project Brief next, per the canonical editorial workflow — not the case study, not Version 1.
