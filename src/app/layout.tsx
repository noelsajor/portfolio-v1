import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Jose Leon — Product Design & Front-End Implementation',
  description:
    'I help agencies and digital teams turn ideas into polished, production-ready websites and product experiences through product design, front-end development and Shopify implementation.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 py-12">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
