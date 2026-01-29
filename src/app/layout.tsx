import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Jose Leon — UI/UX + Shopify Front-end',
  description: 'Senior UI/UX Designer & Shopify Front-end Developer focused on conversion-driven e-commerce experiences.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-black text-white">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 py-12">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
