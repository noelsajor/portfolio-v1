import { redirect } from 'next/navigation'

// Temporary safety net: `/` has no standalone content, it only selects a
// locale. PR 2 replaces this fixed redirect with cookie/Accept-Language
// detection in src/proxy.ts; until then every visitor to `/` lands on the
// default locale.
export default function RootPage() {
  redirect('/en')
}
