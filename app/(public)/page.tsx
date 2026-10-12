import type { Metadata } from "next";
import { getPublishedInternships } from "@/lib/queries/internships";
import { HeroSection } from "@/components/public/sections/hero-section";
import { PartnerCompaniesSection } from "@/components/public/sections/partner-companies-section";
import { JourneySection } from "@/components/public/sections/journey-section";
import { ExploreSection } from "@/components/public/sections/explore-section";
import { ProjectStudioSection } from "@/components/public/sections/project-studio-section";
import { CollegesSection } from "@/components/public/sections/colleges-section";
import { GuidedLearningSection } from "@/components/public/sections/guided-learning-section";
import { TestimonialsSection } from "@/components/public/sections/testimonials-section";
import { VerificationSection } from "@/components/public/sections/verification-section";
import { ClosingSection } from "@/components/public/sections/closing-section";

export const metadata: Metadata = {
  title: "InternSetu — Guided internships and verifiable certificates",
  description:
    "We connect college students with partner companies for guided, project-based internships — with weekly milestones, mentor feedback and a certificate anyone can verify.",
};

export default async function HomePage() {
  const internships = await getPublishedInternships();

  return (
    <main>
      <HeroSection />
      <PartnerCompaniesSection />
      <JourneySection />
      <ExploreSection internships={internships} />
      <ProjectStudioSection />
      <CollegesSection />
      <GuidedLearningSection />
      <TestimonialsSection />
      <VerificationSection />
      <ClosingSection />
    </main>
  );
}
