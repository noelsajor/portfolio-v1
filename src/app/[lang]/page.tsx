import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { FeaturedWorkSection } from '@/components/home/FeaturedWorkSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { WhyMeSection } from '@/components/home/WhyMeSection'
import { FinalCTASection } from '@/components/home/FinalCTASection'

export default function HomePage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <TestimonialsSection />
      <ProcessSection />
      <WhyMeSection />
      <FinalCTASection />
    </div>
  )
}
