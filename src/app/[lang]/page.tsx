import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { FeaturedWorkSection } from '@/components/home/FeaturedWorkSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { WhyMeSection } from '@/components/home/WhyMeSection'
import { FinalCTASection } from '@/components/home/FinalCTASection'
import { buildLocaleMetadataFields, defaultOgImage, siteConfig } from '@/lib/site-config'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'

// No `title` key here on purpose: siteConfig.title is already the fully
// branded title (it contains "Jose Leon" once), so it must render as-is on
// the home page rather than through the layout's `%s | Jose Leon` template —
// omitting `title` lets Next fall back to the layout's `title.default`
// instead. Open Graph doesn't get that same template fallback and this
// page-level object replaces the layout's whole `openGraph` key, so its
// title/description/images are restated explicitly here.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
  const { canonical, languages, ogLocale, ogAlternateLocale, robots } = buildLocaleMetadataFields(lang, '/')

  return {
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.description,
      locale: ogLocale,
      ...(ogAlternateLocale ? { alternateLocale: ogAlternateLocale } : {}),
      images: [defaultOgImage]
    },
    ...(robots ? { robots } : {})
  }
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE

  return (
    <div className="space-y-24">
      <HeroSection lang={lang} />
      <ServicesSection />
      <FeaturedWorkSection lang={lang} />
      <TestimonialsSection />
      <ProcessSection />
      <WhyMeSection />
      <FinalCTASection lang={lang} />
    </div>
  )
}
