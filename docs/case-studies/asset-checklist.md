# Case study asset checklist

Produced during Phase 1, Step 1.1 (media placeholder cleanup). The dashed
"Image pending" boxes and inline `<ImagePlaceholder>` tags were removed from
`brand-website-build.mdx` and `d2c-intimacy-wellness-storefront.mdx` — no fake screenshots were substituted. This
checklist tracks which real screenshots would fill those slots once available,
using the exact `id`s that were authored in the MDX source before removal (so
intent isn't lost, only the placeholder rendering).

To add an image once you have it: add `src`/`alt` to the matching `gallery`
item in the MDX frontmatter and set `status: ready`. The gallery section on
`/work/[slug]` renders it automatically — no code change needed.

## Brand & Website Build (anonymized)

| Former placeholder id | What it would show | Priority |
|---|---|---|
| `homepage-hero-light` | Homepage hero, light theme | High — best single image for the case study |
| `homepage-hero-dark` | Homepage hero, dark theme | High — demonstrates the light/dark system |
| `brand-manual-spread` | Brand manual page(s): logo construction, color, type | Medium |
| `logo-system` | Logo lockups across the 7 division sub-brands | Medium |
| `division-product-section` | A division/product listing page | Medium |
| `crm-contact-form` | Contact form UI (CRM-integrated) | Low |
| `client-case-study-card` | Real client work display (client names redacted) | Medium |
| `mobile-responsive-view` | Mobile viewport of the homepage or a division page | High |

Gallery slots already defined in frontmatter (`icon-set-spread`,
`division-sublockup-examples`, `newsletter`, `brochure`) remain `status:
pending` and need real assets + alt text. Any real screenshot used here must
not reveal the client's name, domain, or the real client names shown in the
site's own case-study display — crop/redact accordingly before adding it.

## Intimacy Storefront Design & Build (anonymized)

| Former placeholder id | What it would show | Priority |
|---|---|---|
| `homepage-hero` | Storefront homepage | High — best single image for the case study |
| `figma-design-handoff` | Figma design → shipped page comparison | Medium |
| `product-detail-page` | PDP template | High |
| `collection-page` | Collection/PLP template | Medium |

Gallery slots already defined in frontmatter (`blog-template`,
`promotional-landing-page`, `reusable-section-system`) remain `status:
pending`. Any real screenshot used here must not reveal the client's name,
domain, or product branding — crop/redact accordingly before adding it.

## Citriom / other product work

No case study exists in the repo for Citriom or any other product-design
project — there is no placeholder to track. If/when a third case study is
added (Phase 3, Step 3.5), this checklist should gain a matching section
before publishing.

## Front-end-only projects

No dedicated front-end-only case study exists yet either. Same note as above
applies if one is added.
