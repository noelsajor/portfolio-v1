# Third case-study slot

Per Phase 3, Step 3.5. **Update (2026-07-30): superseded.** A third case
study (`d2c-wellness-storefront.mdx`) was added from real, verified project
history, and the second slot (formerly a differently-named file) was renamed
to `d2c-intimacy-wellness-storefront.mdx` and anonymized at the client's
request. A fourth (`d2c-hemp-cannabis-storefront.mdx`) and fifth
(`vita-organica-supplement-manufacturer-site.mdx`) were added the same way. The
original first slot (formerly published under a real company name, as a
differently-named file) was later anonymized too — no public-display
permission existed for it either — and renamed to
`brand-website-build.mdx`. All five
published case studies are now anonymized at their clients' request. The
rest of this file is kept as the process record for how a candidate should
be evaluated before publishing — the original framing below (written when
no third case study existed yet) is left unedited.

## Structural capacity already exists — no code change needed

`/work`, the homepage "Selected work" section, `/resume`'s "Selected work"
list, `/for-agencies`'s proof section, and `sitemap.ts` all read from
`getProjects()`/`getFeaturedProjects()` (`src/lib/projects.ts`), which loads
every published MDX file under `src/content/case-studies/`. Adding a third
case study is just adding a third MDX file that passes
`project-schema.ts`'s validation — every page that lists projects already
handles 1, 2, or N of them without modification. There's nothing to build
ahead of time.

## Selection priority (per the plan, in order)

1. A project that proves UI/UX or product-design depth
2. A real front-end implementation
3. A presentation or campaign system with strong process evidence
4. A project relevant to the agency segment (`/for-agencies`)

## Checklist to fill in once a candidate is chosen

Use the same rigor as prior case studies went through (discovery → outcome
verification → editorial review) before publishing:

- **Context** — client/project background
- **Challenge** — the real problem, not a generic one
- **Role** — your actual scope, distinguished from any official title if
  different (see the brand & website build precedent, Phase 2 Step 2.4)
- **Deliverables** — what actually shipped
- **Constraints** — real limitations you worked within
- **Process** — how the work actually happened
- **Screenshots** — real assets only (see the Step 1.1 asset-checklist
  precedent — never a placeholder)
- **Verified results** — categorized the same way as
  `outcome-evidence-table.md` (directly verified / operational result only —
  no unverified metrics)
- **Public-display permission** — confirmed with the client before
  publishing anything, including their name
- **Technologies** — actual stack used
- **Testimonial availability** — whether a stakeholder from this project
  could realistically provide one (feeds Phase 3 Step 3.1)

Nothing in this file names a specific candidate — that has to come from you.
