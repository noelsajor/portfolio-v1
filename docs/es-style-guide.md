# Spanish (es_US) Style Guide

Governs every Spanish string in this site: content modules under `src/content/es/`, the UI dictionary, contact-form labels, page metadata and case-study MDX. Read it before writing or reviewing any Spanish copy. New terminology decisions are added to the glossary in the same PR that introduces them.

Companion to `docs/bilingual-seo-migration-plan.md` (Phase 9, Translation Publication Gate, Slice 2 execution plan).

## 1. Audience and register

- Audience: `es_US`. Spanish-speaking decision makers in the US and Latin America: agency owners, production leads, founders and marketing teams evaluating a freelance designer/developer. Not Spain.
- Neutral Latin American Spanish. No `vosotros`, no Spain-only vocabulary (`ordenador`, `móvil` as the default word for phone, `vale`). Avoid strong country markers too (`vos`, `platicar`, `chévere`).
- Treatment: **tú profesional**. Direct and warm, never chummy. `Cuéntame qué está construyendo tu equipo`, not `Cuéntenos` and not `Cuéntame, parce`.
- First person singular for the author, as in English: `Ayudo a agencias…`, `Trabajo con…`. The site is one person; never `nosotros` for the author. `Nosotros` only when quoting a past team context (`en trabajos previos tuvimos que evitar…`).

## 2. Voice

- Translate for meaning and search intent, not word for word. If a sentence sounds like a translation, rewrite it.
- Concrete over abstract. Prefer verbs to noun stacks: `reducir la fricción en la entrega`, not `la reducción de la fricción en el proceso de entrega`.
- No agency clichés: avoid `soluciones integrales`, `de la mano`, `a la vanguardia`, `potenciar`, `experiencias únicas`, `360`.
- Short sentences. Spanish runs 15 to 25 percent longer than English; cut filler so headings and CTAs still fit their containers.
- Confident, not salesy. Never add a claim, metric, superlative or outcome that the English source does not state. Never soften one either.

## 3. Mechanics

- Sentence case for headings, buttons and labels: `Trabaja conmigo`, not `Trabaja Conmigo`. Only proper nouns and brand names keep capitals. Eyebrow labels that are uppercase in English (`WHAT I HELP WITH`) stay uppercase in Spanish (`EN QUÉ PUEDO AYUDAR`).
- Opening question and exclamation marks always: `¿Tienes una pregunta?`, `¡Mensaje enviado!`.
- Do not use em dashes (rayas). The English copy uses them for asides; in Spanish, restructure with a comma, colon, period or parentheses. The only allowed dash is the hyphen inside compound terms (`front-end`, `e-commerce`, `white-label`).
- Quotation marks: straight double quotes `"…"` in code-adjacent contexts, comillas latinas `«…»` nowhere (consistency with the English source, and they render inconsistently in some fonts).
- Numbers: `Más de 10 años`, not `10+ años`. Ranges with `a`: `2 a 4 semanas`, `5 a 6 meses`. Percent as `25 %` is the RAE form but the site uses `25%` to match the English design; keep `25%`.
- Currency: `$` means USD on this site. Keep `$X a $Y`.
- Dates in prose: `2026, 5 a 6 meses aprox.`. Frontmatter dates (`updatedAt`, `year`) are never translated or changed.
- Ellipsis for loading states: `Enviando...` (three periods, matching the English source).
- Inclusive language: prefer collective nouns (`equipos de diseño`, `quien toma la decisión`) over doubled forms; never `x`, `@` or `e` endings (`diseñadorxs`).

## 4. What never changes

- Slugs, URLs, routes, filenames, `data-tracking` ids, email addresses, social links.
- Metrics, timeframes, team sizes, roles, seniority, official job titles (`official title: Graphic Designer` becomes `cargo oficial: Graphic Designer`, the title itself stays).
- Anonymization. If the English copy says `a B2B IoT company`, the Spanish says `una empresa B2B de IoT`; never name a client that English does not name.
- Brand and project names, including their spelling and capitalization: `Jose Leon` (no accents, it is the site's brand spelling), `TEEZ`, `SANA`, `Strike`, `Vita Organica`, `FirstLine`, `PAPASHONGO`, `Shopify`, `Figma`, `Liquid`, `Next.js`, `Astro`, `Tailwind CSS`, `WooCommerce`.
- Frontmatter keys, enum values (`type`, `capabilities`, `segment`, `status`), `order`, `featured`, `year`, `updatedAt`, image paths, `liveUrl`, `repositoryUrl`. Display labels for the enums live in a per-locale map in code, never in the MDX.

## 5. Terminology

### Keep in English

These are how the audience actually searches and talks. Write them in lowercase with the hyphenation shown, except brand names.

| Term | Notes |
|------|-------|
| Shopify, Liquid, Online Store 2.0, metafields, checkout | Shopify's own Spanish UI says `tema`, `secciones`, `metacampos`; use `tema` and `secciones` in prose, but keep `metafields` in technical lists (Technologies). |
| front-end | Always hyphenated, lowercase: `implementación front-end`, `desarrollo front-end`. The skills group title `Front End` becomes `Front-end`. |
| UI/UX, UI, UX | `diseño UI/UX`. |
| e-commerce | Hyphenated in body copy. `ecommerce` (no hyphen) is allowed only inside `seoTitle`/`seoDescription` when targeting that exact search term. |
| white-label | `soporte white-label`. On its first appearance on the For Agencies page add the gloss `(marca blanca)` once. |
| D2C, B2B, IoT, SEO, NDA, CTA, QA | Standard acronyms. |
| landing page | Feminine: `la landing page`. |
| wireframes | Masculine plural. |
| backlog | Masculine: `el backlog`. |
| brief | Masculine: `el brief`. |
| retainer | Masculine: `un retainer mensual`. Pair with the explanation `soporte continuo` where the context is not agency jargon. |
| storefront | Allowed in technical lists and in `Shopify storefront` contexts; in body copy prefer `tienda` or `tienda Shopify`. |
| handoff | Allowed in process-step titles where it is a stage name. In body copy prefer `entrega` or `traspaso entre diseño y desarrollo`. |
| sections, schema (Shopify) | `secciones` in prose; `schema` stays. |

### Translate

| English | Spanish | Notes |
|---------|---------|-------|
| Work (nav, section) | Proyectos | Reads better than `Trabajo` for a portfolio section. Route stays `/work`. |
| About | Sobre mí | |
| Contact | Contacto | |
| Resume / CV | CV | `currículum` is fine in prose; the nav label, button and page eyebrow use `CV`. |
| For Agencies | Para agencias | |
| case study | caso de estudio | |
| Selected work | Proyectos destacados | |
| featured | destacado | |
| design system | sistema de diseño | |
| user flows | flujos de usuario | |
| product design | diseño de producto | |
| visual design | diseño visual | |
| brand identity / branding | identidad de marca / branding | Both acceptable; `branding` is the search term. |
| marketing website | sitio web de marketing | |
| custom websites | sitios web a medida | |
| storefront build / redesign | construcción / rediseño de tienda | |
| theme customization | personalización de tema | |
| reusable sections | secciones reutilizables | |
| production capacity | capacidad de producción | |
| production support / production work | soporte de producción / trabajo de producción | |
| design-to-dev handoff | traspaso entre diseño y desarrollo | |
| scope | alcance | |
| timeline (project) | plazos / cronograma | |
| Timeline (contact form field, case-study card) | Plazo (form) / Duración (card) | Context decides. |
| ongoing support | soporte continuo | |
| project-based | por proyecto | |
| founder(s) | fundador(es) | |
| marketers / marketing teams | equipos de marketing | |
| recruiter | reclutador / equipo de reclutamiento | |
| hiring manager | responsable de contratación | |
| role (job opening) | vacante | `Escríbeme sobre una vacante`. |
| role (what I did) | rol | `Mi rol`. |
| remote | remoto | `colaboración remota`, `trabajo remoto`. |
| international teams | equipos internacionales | |
| launch | lanzamiento | |
| maintainable | fácil de mantener | Avoid `mantenible`. |
| accessible / accessibility | accesible / accesibilidad | |
| responsive | responsive | Kept as an adjective: `diseño responsive`. |
| performance | rendimiento | |
| compliance-aware | con cuidado del cumplimiento normativo | Shorten to `cuidado normativo` in tight spaces. |
| ad-restricted category | categoría con restricciones publicitarias | |
| medical-style claims | afirmaciones de tipo médico | |
| conversion | conversión | |
| trust signals | señales de confianza | |
| handoff (final delivery) | entrega | |
| AI-assisted workflow, human-reviewed output | flujo de trabajo asistido por IA, con revisión humana | |

### Fixed UI strings

Use these exact strings wherever the English equivalent appears. They are the source of truth for `src/content/es/ui.ts` and the contact-form label maps.

| English | Spanish |
|---------|---------|
| Work With Me | Trabaja conmigo |
| View My Work | Ver mi trabajo |
| Discuss a Project / Discuss Your Project | Hablemos de tu proyecto |
| Email me directly | Escríbeme directamente |
| See all / See all work → | Ver todo / Ver todos los proyectos → |
| View Project | Ver proyecto |
| View case study → | Ver caso de estudio → |
| Visit live site | Ver sitio en vivo |
| (opens in a new tab) | (se abre en una pestaña nueva) |
| Back to work | Volver a proyectos |
| Return Home | Volver al inicio |
| Try again | Intentar de nuevo |
| Skip to main content | Saltar al contenido principal |
| Page not found | Página no encontrada |
| Something went wrong | Algo salió mal |
| Gallery | Galería |
| The Problem / The Solution | El problema / La solución |
| My Role | Mi rol |
| Want to ask me a question? | ¿Tienes una pregunta? |
| What problem was this solving? | ¿Qué problema resolvía? |
| What was your role here? | ¿Cuál fue tu rol? |
| How did you define success? | ¿Cómo definiste el éxito? |
| What was your approach? | ¿Cuál fue el enfoque? |
| Recruiter or hiring manager? See my resume | ¿Eres reclutador o responsable de contratación? Mira mi CV |
| Reach out about a role | Escríbeme sobre una vacante |
| Download CV | Descargar CV |
| Other channels | Otros canales |
| Name / Email / Message | Nombre / Email / Mensaje |
| Type of support | Tipo de apoyo |
| Timeline (form) | Plazo |
| Budget or engagement model (optional) | Presupuesto o modelo de colaboración (opcional) |
| Select one | Selecciona una opción |
| Your name | Tu nombre |
| How can I help? | ¿En qué puedo ayudarte? |
| e.g. project-based, ongoing retainer, $X–Y range | p. ej. por proyecto, retainer mensual, rango de $X a $Y |
| Send Message / Sending... | Enviar mensaje / Enviando... |
| Message sent! | ¡Mensaje enviado! |
| Thank you for reaching out. I'll get back to you soon. | Gracias por escribir. Te responderé pronto. |
| Send another message | Enviar otro mensaje |
| Something went wrong. Please try again. | Algo salió mal. Inténtalo de nuevo. |
| Something went wrong. Please check your connection and try again. | Algo salió mal. Revisa tu conexión e inténtalo de nuevo. |
| Too many requests. Please try again later. | Demasiados intentos. Inténtalo de nuevo más tarde. |
| Please fill in all required fields with valid values. | Completa todos los campos obligatorios con valores válidos. |
| Message could not be sent. Please try again later. | No se pudo enviar el mensaje. Inténtalo de nuevo más tarde. |
| Switch to Spanish / Switch to English | Cambiar a español / Cambiar a inglés |
| Primary (nav aria-label) | Principal |
| Footer links | Enlaces del pie de página |
| Experience summary | Resumen de experiencia |
| Language | Idioma |

Contact-form option labels (values stay English in code; these are display labels only):

| Value | Spanish label |
|-------|---------------|
| Design production | Producción de diseño |
| Shopify support | Soporte Shopify |
| UI/UX | UI/UX |
| Front-end implementation | Implementación front-end |
| White-label agency support | Soporte white-label para agencias |
| Other | Otro |
| As soon as possible | Lo antes posible |
| Within 2–4 weeks | En 2 a 4 semanas |
| Within 1–3 months | En 1 a 3 meses |
| Ongoing support | Soporte continuo |
| Exploring options | Explorando opciones |

Project enum display labels (values stay English in frontmatter):

| Value | Spanish label |
|-------|---------------|
| Ecommerce Systems | Sistemas e-commerce |
| Brand & Identity | Marca e identidad |
| Custom Websites | Sitios web a medida |
| Product Experiments | Experimentos de producto |
| E-commerce (type) | E-commerce |
| Product Design (type) | Diseño de producto |
| Marketing Website (type) | Sitio web de marketing |
| Design System (type) | Sistema de diseño |
| D2C / B2B | D2C / B2B |

## 6. SEO strings

- `title` (page metadata): 2 to 4 words, sentence case, no brand suffix (the layout template appends ` | Jose Leon`). `Sobre mí`, `Contacto`, `Para agencias`, `Proyectos`, `CV`.
- `description`: 140 to 160 characters, one complete sentence, contains the page's primary Spanish search term from the Phase 9 keyword table (`desarrollador Shopify freelance`, `soporte white-label para agencias`, `diseñador UI UX`, `desarrollador frontend`). Written for the Spanish searcher, not translated from the English description.
- Case-study `seoTitle`: `<Project> — <angle> | Jose Leon` mirrors the English pattern (this is the one place an em dash is kept, because the English pattern is parsed by `work/[slug]/page.tsx`, which strips the ` | Jose Leon` suffix). Keep under 60 characters before the suffix.
- Case-study `seoDescription`: authored for Spanish intent, 140 to 160 characters, never a literal translation of the English one.
- Never stuff keywords. One primary term per page, used naturally once in the description and once in the H1 or first paragraph.

## 7. Case-study MDX conventions

- Filename, slug and frontmatter keys identical to the English file. Copy the English file into `src/content/es/case-studies/` and translate in place.
- Translate: `title` (keep brand names), `client` when descriptive, `industry`, `roles`, `services`, `summary`, `challenge`, `outcome`, `duration`, `team`, `coverAlt`, every gallery `alt`, `seoTitle`, `seoDescription`, and the body.
- Do not touch: `type`, `capabilities`, `segment`, `year`, `featured`, `order`, `status`, `updatedAt`, `coverImage`, gallery `id`/`status`/`src`, `liveUrl`, `repositoryUrl`.
- Canonical H2 headings. The case-study page renders question chips that link to heading anchors, so these four headings must appear with exactly this wording in every Spanish case study (rehype-slug turns them into `#desafío`, `#solución`, `#resultado`, `#mis-contribuciones`); the content validator checks for them:

| English | Spanish |
|---------|---------|
| Overview | Resumen |
| Business Context / Project Context | Contexto |
| Challenge | Desafío |
| Approach | Enfoque |
| Solution | Solución |
| Outcome | Resultado |
| My Contributions | Mis contribuciones |
| Technologies | Tecnologías |

  Other headings (`Building the Brand`, `Beyond This Engagement`) are translated freely.
- `**Note:**` lead-ins become `**Nota:**`.
- Technologies list labels: `**Plataforma**`, `**Lenguajes**`, `**Framework / CMS**`, `**Herramientas de diseño**`, `**Áreas de enfoque**`. Tool and language names stay in English.
- Bullet lists in `Mis contribuciones` start with a past-tense first-person verb (`Definí`, `Diseñé`, `Construí`), matching the English past-participle style.

## 8. Review checklist (every Spanish PR)

- [ ] Glossary and fixed strings followed; any new term added to this file.
- [ ] No English leftovers: grep the rendered `/es` HTML for `the `, ` and `, `with `, `Shopify support`, `Discuss`, `View `, `Send `, `Learn`.
- [ ] No em dashes in Spanish copy (`grep -n "—" src/content/es` returns only `seoTitle` lines).
- [ ] Sentence case on headings, buttons and labels.
- [ ] Opening `¿` and `¡` present.
- [ ] Same number of paragraphs, bullets and sections as the English source, unless a merge or split is deliberate and noted in the PR.
- [ ] Claims, metrics, names and anonymization identical to English.
- [ ] Read aloud once. If it sounds translated, rewrite it.
