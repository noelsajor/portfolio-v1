import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { FeaturedWorkSection } from '@/components/home/FeaturedWorkSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { WhyMeSection } from '@/components/home/WhyMeSection'
import { FinalCTASection } from '@/components/home/FinalCTASection'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'

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
