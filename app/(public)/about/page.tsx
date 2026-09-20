import Link from "next/link";
import { ArrowRight, BadgeCheck, Handshake, MessageSquare, Sparkles, Target } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionLabel } from "@/components/ui/badge";
import { FadeInUp, Stagger, StaggerItem } from "@/components/public/motion";

const VALUES = [
  {
    icon: Target,
    title: "Real project work",
    description:
      "Every internship maps to tasks a working team would actually assign — not filler assignments.",
  },
  {
    icon: BadgeCheck,
    title: "Verified credentials",
    description:
      "Every certificate carries a unique code anyone can check on our verification page.",
  },
  {
    icon: Handshake,
    title: "A call before you commit",
    description:
      "Book a short call with our team to ask questions before you enroll in anything.",
  },
  {
    icon: Sparkles,
    title: "Built for every course",
    description:
      "BBA, BCom, BCA, BSc and more — domains are chosen so non-CS students can succeed too.",
  },
];

const GLANCE = [
  { label: "Internship domains", value: "12+" },
  { label: "Students certified", value: "1,200+" },
  { label: "Verifiable online", value: "100%" },
];

const SLOTS = ["10:00 AM", "11:30 AM", "2:00 PM"];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(circle_at_top,rgba(0,107,255,0.12),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] bottom-0 -z-10 h-64 w-64 rounded-full bg-[var(--blob-cyan)]/15 blur-[100px]"
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeInUp>
            <SectionLabel>About us</SectionLabel>
            <h1 className="mt-6 text-heading-sm font-bold leading-[1.1] text-foreground sm:text-heading">
              Built by people who take{" "}
              <span className="text-gradient-accent">internships seriously</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              We started this program because too many &ldquo;internship
              certificates&rdquo; are worth the paper they&apos;re printed on.
              Ours are backed by real project work, a real mentor, and a
              verification page anyone — including a future employer — can use.
            </p>
            <Link
              href="/internships"
              className={buttonVariants({ variant: "primary", size: "lg", className: "group mt-8" })}
            >
              Browse internships
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeInUp>

          <FadeInUp delay={0.1} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-product">
              <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-4">
                <BadgeCheck className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold text-foreground">Program at a glance</p>
              </div>
              <div className="space-y-3 p-5">
                {GLANCE.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">{stat.label}</span>
                    <span className="font-display text-lg font-bold text-accent">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 px-4 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeInUp className="relative order-2 lg:order-1">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-6 -left-6 -z-10 h-40 w-40 rounded-full bg-[var(--blob-magenta)]/10 blur-[70px]"
            />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-product">
              <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-4">
                <MessageSquare className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold text-foreground">Mentor review</p>
              </div>
              <div className="space-y-3 p-5">
                <div className="rounded-lg border border-border px-4 py-3">
                  <p className="text-sm font-medium text-foreground">Dashboard wireframes</p>
                  <span className="mt-2 inline-flex items-center rounded-full bg-[var(--badge-tint)] px-2.5 py-0.5 text-xs font-medium text-accent-secondary">
                    Approved
                  </span>
                </div>
                <div className="rounded-lg bg-muted/60 px-4 py-3">
                  <p className="text-xs font-semibold text-foreground">Mentor feedback</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    &ldquo;Clean structure and clear labeling — ready to move to the next task.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp className="order-1 lg:order-2">
            <SectionLabel>Our approach</SectionLabel>
            <h2 className="mt-5 text-heading-sm font-bold text-foreground sm:text-heading">
              Mentored, project-based, verifiable
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Each internship is scoped by a mentor in that domain, delivered as
              a series of real tasks, and reviewed before completion. When
              you&apos;re done, we issue a certificate tied to a unique code —
              not a template anyone could fake.
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <FadeInUp className="max-w-2xl">
          <SectionLabel>Why students choose us</SectionLabel>
          <h2 className="mt-5 text-heading-sm font-bold text-foreground sm:text-heading">
            What we stand for
          </h2>
        </FadeInUp>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <Card className="flex h-full items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-accent text-white">
                  <value.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-base font-semibold tracking-[-0.01em] text-foreground">
                    {value.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-t border-border bg-muted/40 px-4 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <FadeInUp>
            <SectionLabel>Talk to us</SectionLabel>
            <h2 className="mt-5 text-heading-sm font-bold leading-[1.15] text-foreground sm:text-heading">
              Not sure which domain fits you?
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Book a short call before you enroll. We&apos;ll walk through your
              course, your interests, and which internship actually makes
              sense — no pressure to buy anything on the call.
            </p>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "outline", size: "lg", className: "mt-8" })}
            >
              Get in touch
            </Link>
          </FadeInUp>
          <FadeInUp delay={0.1} className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -bottom-6 -z-10 h-40 w-40 rounded-full bg-[var(--blob-cyan)]/15 blur-[70px]"
            />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-product">
              <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-4">
                <Handshake className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold text-foreground">Book a call</p>
              </div>
              <div className="space-y-2 p-5">
                {SLOTS.map((slot, i) => (
                  <div
                    key={slot}
                    className={
                      i === 0
                        ? "flex items-center justify-between rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white"
                        : "flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground"
                    }
                  >
                    {slot}
                    {i === 0 && <span className="text-xs font-semibold uppercase">Selected</span>}
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </main>
  );
}
