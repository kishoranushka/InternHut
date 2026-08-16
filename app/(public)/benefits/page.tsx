import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Network,
  Wallet,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionLabel } from "@/components/ui/badge";
import { FadeInUp, Stagger, StaggerItem } from "@/components/public/motion";

const BENEFITS = [
  {
    icon: BadgeCheck,
    title: "A certificate that verifies online",
    description:
      "Every certificate carries a unique code. Anyone can check it's real on our verification page — in seconds.",
  },
  {
    icon: FileText,
    title: "Letter of recommendation",
    description:
      "Complete your internship and get a signed LOR you can attach to job and higher-education applications.",
  },
  {
    icon: MessageSquare,
    title: "Real mentor feedback",
    description:
      "A mentor in your domain reviews your submissions and leaves feedback — not an automated checklist.",
  },
  {
    icon: Clock,
    title: "Flexible, part-time friendly",
    description:
      "Work around your class schedule. Tasks are self-paced within the internship window.",
  },
  {
    icon: Wallet,
    title: "Transparent, affordable pricing",
    description:
      "One upfront price per internship, shown before you apply. No hidden add-ons at checkout.",
  },
  {
    icon: Network,
    title: "Placement assistance",
    description:
      "Completed interns get resume support and are shared with our hiring partners when roles open up.",
  },
];

const INCLUDED = [
  "A scoped project brief, not vague busywork",
  "A named mentor you can message with questions",
  "A verified certificate with a public verification code",
  "A letter of recommendation on successful completion",
  "Access to a community of alumni from your domain",
];

export default function BenefitsPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(0,82,255,0.08),transparent_60%)]"
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <FadeInUp>
            <SectionLabel>Benefits</SectionLabel>
            <h1 className="mt-6 font-display text-4xl leading-[1.1] text-foreground sm:text-5xl">
              Everything included,{" "}
              <span className="text-gradient-accent">nothing hidden</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              One price, no surprise add-ons. Here&apos;s exactly what comes
              with every internship on this program.
            </p>
            <Link
              href="/internships"
              className={buttonVariants({ variant: "primary", size: "lg", className: "group mt-8" })}
            >
              Browse internships
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/mentor-teaching.jpg"
                alt="A mentor guiding a student through their work"
                width={900}
                height={700}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeInUp className="max-w-2xl">
            <SectionLabel>What you get</SectionLabel>
            <h2 className="mt-5 font-display text-3xl text-foreground sm:text-[3.25rem]">
              Six things every internship includes
            </h2>
          </FadeInUp>

          <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <Card className="h-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-accent text-white">
                    <benefit.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-[-0.01em] text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeInUp>
            <SectionLabel>In every internship</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-[1.15] text-foreground sm:text-[3.25rem]">
              What&apos;s included, always
            </h2>
            <ul className="mt-6 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <div className="overflow-hidden rounded-tl-2xl rounded-tr-[4rem] rounded-br-2xl rounded-bl-[4rem] shadow-lg">
              <Image
                src="/images/student-presentation.jpg"
                alt="A student presenting their completed work"
                width={900}
                height={1000}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground px-4 py-28 text-center text-white">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
        <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-accent/20 blur-[150px]" />
        <FadeInUp className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl sm:text-[3.25rem]">
            Ready to see it for yourself?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Browse open internships and see exactly what&apos;s included on
            each listing before you apply.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/internships"
              className={buttonVariants({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}
            >
              Browse internships
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeInUp>
      </section>
    </main>
  );
}
