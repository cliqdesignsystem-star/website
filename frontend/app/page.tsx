import { Navbar } from '@/components/homepage/Navbar'
import { Hero } from '@/components/homepage/Hero'
import { LogoSlider } from '@/components/homepage/LogoSlider'
import { Features } from '@/components/homepage/Features'
import { HowItWorks } from '@/components/homepage/HowItWorks'
import { TemplateShowcase } from '@/components/homepage/TemplateShowcase'
import { TypographyShowcase } from '@/components/homepage/TypographyShowcase'
import { ComponentShowcase } from '@/components/homepage/ComponentShowcase'
import { ThemeToggleSection } from '@/components/homepage/ThemeToggleSection'
import { ExportSection } from '@/components/homepage/ExportSection'
import { Footer } from '@/components/homepage/Footer'
import { OnboardingModal } from '@/components/onboarding/OnboardingModal'

export default function HomePage() {
  return (
    <>
      <OnboardingModal />
      <Navbar />
      <main>
        <Hero />
        <LogoSlider />
        <Features />
        <HowItWorks />
        <TemplateShowcase />
        <TypographyShowcase />
        <ComponentShowcase />
        <ThemeToggleSection />
        <ExportSection />
      </main>
      <Footer />
    </>
  )
}
