import type { Metadata } from "next"
import { HeroBanner } from "@/components/hero-banner"
import { AwardsSection } from "@/components/awards"
import { WhyUsSection } from "@/components/why-choose-us-section"
import { AboutUsSection } from "@/components/about-us-section"
import AutoPlayYouTube from "@/components/autoplayyoutube"
import { QuoteSection } from "@/components/quote-section"
import { ExpertiseSection } from "@/components/expertise"
import { OurServicesSection } from "@/components/our-services-section"
import { ConsultationBanner } from "@/components/consultation-banner"
import { TechnologiesSection } from "@/components/technologies"
import { OurClientsSection } from "@/components/our-clients-section"
import { OurProjectsSection } from "@/components/our-projects-section"
import { WhyUsSection2 } from "@/components/why-us-section"
import { FeedbackSection } from "@/components/feedback-section"
import { RequestConsultationSection } from "@/components/request-consultation-section"
import { FAQSection } from "@/components/faq-section"

export const metadata: Metadata = {
  title: "Software Development Company | Hire Expert Engineers",
  description:
    "Grow your team with skilled developers. Flexible staff augmentation, fast onboarding, custom web & mobile development",
  openGraph: {
    title: "Software Development Company | Hire Expert Engineers",
    description:
      "Grow your team with skilled developers. Flexible staff augmentation, fast onboarding, custom web & mobile development",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <AwardsSection />
      <WhyUsSection />
      <AboutUsSection />
      <AutoPlayYouTube />
      <QuoteSection />
      <ExpertiseSection />
      <OurServicesSection />
      <ConsultationBanner />
      <TechnologiesSection />
      <OurClientsSection />
      <OurProjectsSection />
      <WhyUsSection2 />
      <FeedbackSection />
      <RequestConsultationSection />
      <FAQSection />
    </main>
  )
}
