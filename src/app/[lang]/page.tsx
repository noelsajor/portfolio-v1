import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { FeaturedWorkSection } from '@/components/home/FeaturedWorkSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { WhyMeSection } from '@/components/home/WhyMeSection'
import { FinalCTASection } from '@/components/home/FinalCTASection'
import { LandingFaq } from '@/components/landing/LandingFaq'
import { JsonLd } from '@/components/JsonLd'
import { buildPageNode, localizedAbsoluteUrl } from '@/lib/page-schema'
import { buildFaqSchema } from '@/lib/structured-data'
import { buildLocaleMetadataFields, defaultOgImage, siteConfig } from '@/lib/site-config'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { homeContent as homeContentEn } from '@/content/en/home'
import { homeContent as homeContentEs } from '@/content/es/home'

// `title.absolute` on purpose: the home title is already fully branded (it
// contains "Jose Leon" once), so it must bypass the layout's `%s | Jose Leon`
// template. PR 11: title/description come from homeContent.metadata so each
// locale authors its own (for `en` they equal siteConfig.title/description,
// which is also the layout's `title.default`). Open Graph doesn't get a
// template fallback and this page-level object replaces the layout's whole
// `openGraph` key, so its title/description/images are restated here.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE
  const { canonical, languages, ogLocale, ogAlternateLocale, robots } = buildLocaleMetadataFields(lang, '/')
  const { metadata } = lang === 'es' ? homeContentEs : homeContentEn

  return {
    title: { absolute: metadata.title },
    description: metadata.description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: siteConfig.name,
      title: metadata.title,
      description: metadata.description,
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
  const { metadata, faq } = lang === 'es' ? homeContentEs : homeContentEn

  // Page-level JSON-LD: the home page is a ProfilePage whose main entity is
  // the site-wide Person node, plus the FAQ below as FAQPage so AI search
  // engines get the "who / what / how to start" answers as typed Q&A, not
  // only as prose. The Person/WebSite nodes themselves come from SiteShell.
  const jsonLd = [
    buildPageNode({ lang, path: '/', title: metadata.title, description: metadata.description, profile: true }),
    buildFaqSchema({ lang, url: localizedAbsoluteUrl(lang, '/'), items: faq.items })
  ]

  return (
    <div className="space-y-24">
      <JsonLd nodes={jsonLd} />
      <HeroSection lang={lang} />
      <ServicesSection lang={lang} />
      <FeaturedWorkSection lang={lang} />
      <TestimonialsSection />
      <ProcessSection lang={lang} />
      <WhyMeSection lang={lang} />
      <LandingFaq heading={faq.heading} items={faq.items} />
      <FinalCTASection lang={lang} />
    </div>
  )
}
