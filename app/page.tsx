import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ProfileShowcase } from "@/components/landing/profile-showcase"
import { ContactCard } from "@/components/landing/contact-card"
import { BusinessTypes } from "@/components/landing/business-types"
import { Pricing } from "@/components/landing/pricing"
import { FinalCta } from "@/components/landing/final-cta"
import { SiteFooter } from "@/components/landing/site-footer"

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <ProfileShowcase />
        <ContactCard />
        <BusinessTypes />
        <Pricing />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
