// Pass-through root layout. Next.js requires a layout.tsx at the top of
// app/, but the real document shell lives in src/components/SiteShell.tsx,
// shared by src/app/[lang]/layout.tsx (locale pages) and src/app/not-found.tsx
// (the static global 404 — see that file for why it exists and why it's
// English-only). This layout renders no DOM of its own; it exists only so
// the global not-found still has a root layout to render under.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
