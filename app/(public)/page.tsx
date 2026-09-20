import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Cloud,
  Code2,
  FileCheck2,
  GraduationCap,
  Megaphone,
  Palette,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionLabel } from "@/components/ui/badge";
import { InternshipCard } from "@/components/public/internship-card";
import { FadeInUp, Stagger, StaggerItem } from "@/components/public/motion";
import { FaqAccordion } from "@/components/public/faq-accordion";

export const dynamic = "force-dynamic";

async function getFeaturedInternships() {
  return prisma.internship.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

const STATS = [
  { value: "12+", label: "Internship domains" },
  { value: "1,200+", label: "Students certified" },
  { value: "45 hrs", label: "Avg. project hours" },
  { value: "100%", label: "Verifiable online" },
];

const ELIGIBLE_COURSES = ["BBA", "B.Com", "BCA", "BSc", "MBA", "M.Com", "Other UG/PG"];

// Placeholder team — swap for real photos/bios before launch.
const TEAM = [
  { initials: "RK", name: "Rhea", role: "Program Director" },
  { initials: "AV", name: "Arjun", role: "Curriculum Lead" },
  { initials: "SM", name: "Sana", role: "Student Success Mentor" },
  { initials: "NP", name: "Nikhil", role: "Placements & Partnerships" },
];

const FAQS = [
  {
    question: "Who can apply for these internships?",
    answer:
      "Any undergraduate or postgraduate student, including BBA, B.Com, BCA, BSc, MBA, M.Com and other courses, at a UGC recognized university or college. You don't need a technical background for most domains.",
  },
  {
    question: "Is the certificate actually verifiable?",
    answer:
      "Yes. Every certificate we issue carries a unique code. Anyone, including a placement cell or employer, can enter that code on our Verify Certificate page and instantly confirm it's genuine.",
  },
  {
    question: "How much does an internship cost, and what does it include?",
    answer:
      "Pricing varies by internship and is shown upfront on each listing page, with no hidden fees. It covers mentor reviewed project tasks, a letter of recommendation on completion, and your verified certificate.",
  },
  {
    question: "Can I talk to someone before I enroll?",
    answer:
      "Yes. Reach out on the Contact page with any questions about eligibility, a specific domain, or how the program works before you commit to anything.",
  },
  {
    question: "How long does an internship take?",
    answer:
      "Most internships run a few weeks of project based work with flexible timing, so you can fit it around classes. Exact duration is listed on each internship's page.",
  },
  {
    question: "What happens after I complete the work?",
    answer:
      "A mentor reviews your final submission. Once it's approved, we issue your certificate and letter of recommendation with a verification code tied to the work you actually completed.",
  },
];

const DOMAINS = [
  { icon: Sparkles, name: "AI & Machine Learning" },
  { icon: BarChart3, name: "Data Analytics" },
  { icon: Cloud, name: "Cloud Computing" },
  { icon: ShieldCheck, name: "Cybersecurity" },
  { icon: Code2, name: "Full Stack Development" },
  { icon: Megaphone, name: "Digital Marketing" },
  { icon: Briefcase, name: "Business & Finance" },
  { icon: Palette, name: "UI/UX Design" },
];

const STEPS = [
  {
    step: "1",
    title: "Pick an internship",
    description: "Browse internships filtered by your course and area of interest.",
  },
  {
    step: "2",
    title: "Enroll and get to work",
    description: "Pay the internship fee and complete real project tasks at your own pace.",
  },
  {
    step: "3",
    title: "Get a verified certificate",
    description:
      "Once a mentor approves your work, you get a certificate with a code anyone can check online.",
  },
];

// Placeholder testimonials — swap for real student quotes before launch.
const TESTIMONIALS = [
  {
    quote:
      "The tasks felt like real work, not busywork. My certificate actually got noticed in a placement drive.",
    name: "Aarav",
    course: "BCA student",
  },
  {
    quote:
      "As a B.Com student I wasn't sure a tech internship would make sense. The mentors made it approachable.",
    name: "Diya",
    course: "B.Com student",
  },
  {
    quote:
      "Booking a call before enrolling helped me pick the right domain. No regrets.",
    name: "Kabir",
    course: "BSc student",
  },
];

const TASKS = [
  { label: "Market research brief", status: "Approved" },
  { label: "Dashboard wireframes", status: "In review" },
  { label: "Final project report", status: "Submitted" },
];

export default async function HomePage() {
  const featuredInternships = await getFeaturedInternships();

  return (
    <main>
      {/* Hero — full width, bold, fits in one viewport */}
      <section className="relative flex min-h-[calc(100dvh-65px)] flex-col items-center justify-center overflow-hidden border-b border-border px-4 py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_top,rgba(0,107,255,0.12),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[10%] bottom-0 -z-10 h-72 w-72 rounded-full bg-[var(--blob-cyan)]/15 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[10%] -z-10 h-64 w-64 rounded-full bg-[var(--blob-magenta)]/10 blur-[100px]"
        />
        <div className="mx-auto max-w-[1400px] text-center">
          <FadeInUp className="flex flex-col items-center">
            <SectionLabel pulse>UGC and AICTE aligned program</SectionLabel>
            <h1 className="mt-6 max-w-4xl font-display text-[2.75rem] font-bold leading-[1.03] tracking-[-0.03em] text-foreground sm:text-7xl lg:text-[5.5rem]">
              Real internships,{" "}
              <span className="relative inline-block">
                <span className="text-gradient-accent">a certificate</span>
                <span className="gradient-underline" />
              </span>{" "}
              employers can verify.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Open to BBA, B.Com, BCA, BSc, MBA, M.Com and other UG and PG
              students. Enroll, complete real project work with a mentor, and
              get a certificate with a code anyone can check online.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/internships"
                className={buttonVariants({ variant: "primary", size: "lg", className: "group w-full shadow-accent-lg sm:w-auto" })}
              >
                Browse internships
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#how-it-works"
                className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto" })}
              >
                See how it works
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-card px-4 py-12">
        <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <StaggerItem
              key={stat.label}
              className={i > 0 ? "border-border sm:border-l sm:pl-8" : ""}
            >
              <p className="font-display text-3xl font-bold text-accent sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Who can join */}
      <section className="border-b border-border bg-muted/40 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInUp className="flex flex-col items-center">
            <SectionLabel>Who can join</SectionLabel>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.15] text-foreground sm:text-5xl">
              Open to students from any UGC recognized university
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              No matter which college or course you are in, if your
              university is UGC recognized, you are eligible to apply.
            </p>
          </FadeInUp>

          <Stagger className="mt-8 flex flex-wrap justify-center gap-2.5">
            {ELIGIBLE_COURSES.map((course) => (
              <StaggerItem key={course}>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--badge-tint)] px-4 py-2 text-sm font-medium text-accent-secondary">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {course}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Domains */}
      <section className="mx-auto max-w-6xl px-4 py-28">
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <SectionLabel className="mx-auto">Domains</SectionLabel>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.15] text-foreground sm:text-5xl">
            Choose a track that fits your course
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every domain maps to project based tasks reviewed by a mentor,
            not filler assignments.
          </p>
        </FadeInUp>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map((domain) => (
            <StaggerItem key={domain.name}>
              <Card className="group flex h-full flex-col items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--badge-tint)] text-accent transition-transform duration-300 group-hover:scale-110">
                  <domain.icon className="h-5 w-5" />
                </span>
                <p className="text-base font-semibold tracking-[-0.01em] text-foreground">
                  {domain.name}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Real work, not busywork */}
      <section className="mx-auto max-w-6xl px-4 py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeInUp>
            <div className="relative">
              <div className="absolute -top-6 -left-6 h-40 w-40 rounded-full bg-[var(--blob-cyan)]/15 blur-[60px]" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-product">
                <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-4">
                  <FileCheck2 className="h-4 w-4 text-accent" />
                  <p className="text-xs font-semibold text-foreground">Your task board</p>
                </div>
                <div className="space-y-3 p-5">
                  {TASKS.map((task) => (
                    <div
                      key={task.label}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3"
                    >
                      <span className="text-sm font-medium text-foreground">{task.label}</span>
                      <span
                        className={
                          task.status === "Approved"
                            ? "inline-flex items-center rounded-full bg-[var(--badge-tint)] px-2.5 py-0.5 text-xs font-medium text-accent-secondary"
                            : "inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                        }
                      >
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <SectionLabel>Real work</SectionLabel>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.15] text-foreground sm:text-5xl">
              Not busywork. A real body of work.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Every internship is scoped like a real assignment, reviewed by
              a mentor, and worth putting on a resume.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Tasks mirror what a junior hire would actually do",
                "A mentor reviews your submissions, not an automated grader",
                "Your certificate ties directly to the work you completed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeInUp>
        </div>
      </section>

      {/* Featured internships */}
      <section className="border-t border-border bg-muted/40 px-4 py-28">
        <div className="mx-auto max-w-6xl">
          <FadeInUp className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>Open now</SectionLabel>
              <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-5xl">
                Featured internships
              </h2>
            </div>
            <Link href="/internships" className={buttonVariants({ variant: "outline" })}>
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInUp>

          {featuredInternships.length === 0 ? (
            <p className="mt-10 text-sm text-muted-foreground">
              No internships published yet. Check back soon.
            </p>
          ) : (
            <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredInternships.map((internship) => (
                <StaggerItem key={internship.id}>
                  <InternshipCard internship={internship} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-28">
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <SectionLabel className="mx-auto">Process</SectionLabel>
          <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-5xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps between browsing internships and holding a
            certificate that actually means something.
          </p>
        </FadeInUp>

        <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-border md:block" />
          {STEPS.map((item) => (
            <FadeInUp key={item.step} className="relative text-center md:text-left">
              <span className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-white shadow-accent md:mx-0">
                {item.step}
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.01em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-border bg-muted/40 px-4 py-28">
        <div className="mx-auto max-w-6xl">
          <FadeInUp className="mx-auto max-w-2xl text-center">
            <SectionLabel className="mx-auto">The people behind it</SectionLabel>
            <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-5xl">
              Meet the team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A small team of mentors and program staff who review every
              submission personally.
            </p>
          </FadeInUp>

          <Stagger className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {TEAM.map((member) => (
              <StaggerItem key={member.name}>
                <Card className="flex flex-col items-center py-8 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-white shadow-accent">
                    {member.initials}
                  </span>
                  <p className="mt-4 text-sm font-semibold tracking-[-0.01em] text-foreground">
                    {member.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border px-4 py-28">
        <div className="mx-auto max-w-6xl">
          <FadeInUp className="mx-auto max-w-2xl text-center">
            <SectionLabel className="mx-auto">Student voices</SectionLabel>
            <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-5xl">
              What students say
            </h2>
          </FadeInUp>

          <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <StaggerItem key={t.name} className={i === 1 ? "md:mt-8" : ""}>
                <Card className="h-full">
                  <Quote className="h-8 w-8 text-accent/25" />
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-5 text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.course}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/40 px-4 py-28">
        <div className="mx-auto max-w-3xl">
          <FadeInUp className="text-center">
            <SectionLabel className="mx-auto">Questions</SectionLabel>
            <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-5xl">
              Frequently asked questions
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.1} className="mt-12">
            <FaqAccordion items={FAQS} />
          </FadeInUp>
        </div>
      </section>

      {/* Final CTA — inverted */}
      <section className="relative overflow-hidden bg-foreground px-4 py-28 text-center text-white">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent/25 blur-[150px]" />
        <FadeInUp className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold sm:text-5xl">
            Ready to start your internship?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Browse open internships, apply in minutes, and get a certificate
            that holds up when someone checks it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/internships"
              className={buttonVariants({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}
            >
              Browse internships
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/verify"
              className={buttonVariants({ variant: "outline-white", size: "lg", className: "w-full sm:w-auto" })}
            >
              Verify a certificate
              <ShieldCheck className="h-4 w-4" />
            </Link>
          </div>
        </FadeInUp>
      </section>
    </main>
  );
}
