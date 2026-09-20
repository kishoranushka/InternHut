import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Network,
  ShieldCheck,
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

const CHECKLIST = [
  { label: "Project brief", done: true },
  { label: "Mentor assigned", done: true },
  { label: "Certificate & LOR", done: false },
];

export default function BenefitsPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(0,107,255,0.12),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] bottom-0 -z-10 h-64 w-64 rounded-full bg-[var(--blob-magenta)]/10 blur-[100px]"
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <FadeInUp>
            <SectionLabel>Benefits</SectionLabel>
            <h1 className="mt-6 text-heading-sm font-bold leading-[1.1] text-foreground sm:text-heading">
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
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-product">
              <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-4">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold text-foreground">What you get</p>
              </div>
              <div className="space-y-3 p-5">
                {CHECKLIST.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span
                      className={
                        item.done
                          ? "inline-flex items-center rounded-full bg-[var(--badge-tint)] px-2.5 py-0.5 text-xs font-medium text-accent-secondary"
                          : "inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      }
                    >
                      {item.done ? "Included" : "On completion"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeInUp className="max-w-2xl">
            <SectionLabel>What you get</SectionLabel>
            <h2 className="mt-5 text-heading-sm font-bold text-foreground sm:text-heading">
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
                  <p className="mt-4 text-base font-semibold tracking-[-0.01em] text-foreground">
                    {benefit.title}
                  </p>
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
            <h2 className="mt-5 text-heading-sm font-bold leading-[1.15] text-foreground sm:text-heading">
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
          <FadeInUp delay={0.1} className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-[var(--blob-cyan)]/15 blur-[70px]"
            />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-product">
              <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-4">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold text-foreground">Certificate</p>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Genuine certificate</p>
                    <p className="font-mono text-xs text-muted-foreground">CERT-7K9M2-QX4RT</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Includes a letter of recommendation and a code anyone can verify online.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground px-4 py-28 text-center text-white">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
        <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-accent/20 blur-[150px]" />
        <FadeInUp className="relative mx-auto max-w-2xl">
          <h2 className="text-heading-sm font-bold sm:text-heading">
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
