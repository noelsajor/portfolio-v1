# 🚀 Agency Master Operation Template

This repository is a robust, highly-documented, and fully automated "Master Template" designed for rapid deployment of high-performance marketing and portfolio websites.

## 🏁 How to Start
If you are cloning this repository for a new client or project, **DO NOT start by writing code**. 

1.  Navigate to the `docs/` folder.
2.  Open **`first-kick-prompt-template.md`**.
3.  Copy the content of that folder and feed it to your AI agent to begin the automated rebranding and setup process.

---

## 🏗️ Core Documentation
Comprehensive guides are located in the `docs/` directory:

- **[Master Architecture Guide](docs/master-architecture-guide.md)**: Technical blueprint of routes, components, and data schemas.
- **[Bulletproof SOPs](docs/best-practices/)**: Strict playbooks for SEO, UI/UX, Security, and Analytics.
- **[Client Handoff Manual](docs/client-handoff-manual.md)**: Non-technical instructions for end-clients to manage their product.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Content**: MDX-driven components
- **Deployment**: Vercel

---

## 🚀 Local Development

### Prerequisites
- Node.js 20.9+ (required by Next.js 16 — see `engines` in `package.json`)
- pnpm (see `packageManager` in `package.json` for the exact version)

### Setup
```bash
pnpm install
pnpm dev
```

### Quality Control
```bash
pnpm lint             # Logical & style check
pnpm exec tsc --noEmit  # Type check
pnpm build             # Production validation
pnpm run validate:content  # MDX frontmatter validation scenarios
```

---

## 🚢 Deployment & Infrastructure
This template is optimized for **Vercel**. 
- Production: Pushes to `main`.
- Previews: Every Pull Request generates a unique URL.
- Security: Pre-configured with strict CSP and Security Headers.

---

© 2026 Agency Master Operation. All rights reserved.
