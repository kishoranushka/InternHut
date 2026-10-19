import type { Metadata } from "next";
import { getPublishedTestimonials } from "@/lib/queries/testimonials";
import { getStudentSession } from "@/lib/dal";
import { HeroSection } from "@/components/public/sections/hero-section";
import { JourneySection } from "@/components/public/sections/journey-section";
import { CollegesSection } from "@/components/public/sections/colleges-section";
import { GuidedLearningSection } from "@/components/public/sections/guided-learning-section";
import { TestimonialsSection } from "@/components/public/sections/testimonials-section";
import { VerificationSection } from "@/components/public/sections/verification-section";
import { ClosingSection } from "@/components/public/sections/closing-section";

export const metadata: Metadata = {
  // absolute: skip the root "%s | Graditute" template, which would repeat the name
  title: { absolute: "Graditute — Guided internships and verifiable certificates" },
  description:
    "We connect college students with partner companies for guided, project-based internships — with weekly milestones, mentor feedback and a certificate anyone can verify.",
};

export default async function HomePage() {
  const [testimonials, session] = await Promise.all([
    getPublishedTestimonials(),
    getStudentSession(),
  ]);
  // College content is hidden from logged-in students.
  const isStudent = Boolean(session);

  return (
    <main>
      <HeroSection />
      <JourneySection />
      {!isStudent && <CollegesSection />}
      <GuidedLearningSection />
      <TestimonialsSection testimonials={testimonials} />
      <VerificationSection />
      <ClosingSection showColleges={!isStudent} />
    </main>
  );
}
