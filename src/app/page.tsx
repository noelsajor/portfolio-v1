import { HeroSection } from '@/components/home/HeroSection'
import { TrustStrip } from '@/components/home/TrustStrip'
import { ServicesSection } from '@/components/home/ServicesSection'
import { FeaturedWorkSection } from '@/components/home/FeaturedWorkSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { AIWorkflowSection } from '@/components/home/AIWorkflowSection'
import { WhyMeSection } from '@/components/home/WhyMeSection'
import { AboutPreviewSection } from '@/components/home/AboutPreviewSection'
import { FinalCTASection } from '@/components/home/FinalCTASection'

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <FeaturedWorkSection />
      <TestimonialsSection />
      <ProcessSection />
      <AIWorkflowSection />
      <WhyMeSection />
      <AboutPreviewSection />
      <FinalCTASection />
    </div>
  )
}
