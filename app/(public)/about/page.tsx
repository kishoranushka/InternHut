import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Handshake, Sparkles, Target } from "lucide-react";
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

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(circle_at_top,rgba(0,82,255,0.08),transparent_60%)]"
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeInUp>
            <SectionLabel>About us</SectionLabel>
            <h1 className="mt-6 font-display text-4xl leading-[1.1] text-foreground sm:text-5xl">
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
            <div className="relative overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl shadow-xl">
              <Image
                src="/images/hero-students.jpg"
                alt="Students reviewing project work together on a laptop"
                width={900}
                height={1000}
                className="aspect-[4/5] w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card px-5 py-4 shadow-xl sm:block">
              <p className="font-display text-2xl text-gradient-accent">1,200+</p>
              <p className="text-xs text-muted-foreground">students certified</p>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 px-4 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeInUp className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/library-laptop.jpg"
                alt="Two students collaborating on coursework with a laptop"
                width={900}
                height={1100}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </FadeInUp>
          <FadeInUp className="order-1 lg:order-2">
            <SectionLabel>Our approach</SectionLabel>
            <h2 className="mt-5 font-display text-3xl text-foreground sm:text-[3.25rem]">
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
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-[3.25rem]">
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
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
                    {value.title}
                  </h3>
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
            <h2 className="mt-5 font-display text-3xl text-foreground sm:text-[3.25rem]">
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
          <FadeInUp delay={0.1}>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/video-call.jpg"
                alt="A mentor call happening over video"
                width={900}
                height={700}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </FadeInUp>
        </div>
      </section>
    </main>
  );
}
