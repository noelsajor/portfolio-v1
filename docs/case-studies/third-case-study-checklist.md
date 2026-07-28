# Third case-study slot

Per Phase 3, Step 3.5. **No third case study was added** — there's no
verified project in this repo or its docs to build one from, and the plan is
explicit: don't fabricate one.

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

Use the same rigor as iOTEK/NUUD went through (discovery → outcome
verification → editorial review) before publishing:

- **Context** — client/project background
- **Challenge** — the real problem, not a generic one
- **Role** — your actual scope, distinguished from any official title if
  different (see the iOTEK precedent, Phase 2 Step 2.4)
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
