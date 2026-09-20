import { Clock, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionLabel } from "@/components/ui/badge";
import { FadeInUp, Stagger, StaggerItem } from "@/components/public/motion";

// Placeholder contact details — replace with real ones before launch.
const CONTACT_EMAIL = "hello@interncert.example";
const CONTACT_PHONE = "+91 90000 00000";

const CHANNELS = [
  {
    icon: Mail,
    title: "Email us",
    detail: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    cta: "Send an email",
  },
  {
    icon: Phone,
    title: "Call or WhatsApp",
    detail: CONTACT_PHONE,
    href: `tel:${CONTACT_PHONE.replace(/\s+/g, "")}`,
    cta: "Call now",
  },
  {
    icon: MessageCircle,
    title: "Ask before you enroll",
    detail: "Have a question about a specific internship?",
    href: "/internships",
    cta: "Browse internships",
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(0,107,255,0.12),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] bottom-0 -z-10 h-64 w-64 rounded-full bg-[var(--blob-cyan)]/15 blur-[100px]"
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <FadeInUp>
            <SectionLabel>Contact</SectionLabel>
            <h1 className="mt-6 text-heading-sm font-bold leading-[1.1] text-foreground sm:text-heading">
              Let&apos;s talk about your internship
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Questions about eligibility, a specific domain, or how the
              certificate verification works? Reach out — a real person reads
              every message.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-accent" />
              Mon&ndash;Sat, 10am&ndash;7pm IST
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-product">
              <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-4">
                <Send className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold text-foreground">A real person replies</p>
              </div>
              <div className="space-y-3 p-5">
                <div className="rounded-lg bg-muted/60 px-4 py-3">
                  <p className="text-xs font-semibold text-foreground">You</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    &ldquo;Which domain suits a B.Com student?&rdquo;
                  </p>
                </div>
                <div className="rounded-lg border border-border px-4 py-3">
                  <p className="text-xs font-semibold text-accent">Team</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground">
                    &ldquo;Business &amp; Finance or Digital Marketing are great fits — happy to walk through both.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {CHANNELS.map((channel) => (
              <StaggerItem key={channel.title}>
                <Card className="flex h-full flex-col">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-accent text-white">
                    <channel.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-base font-semibold tracking-[-0.01em] text-foreground">
                    {channel.title}
                  </p>
                  <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
                    {channel.detail}
                  </p>
                  <a
                    href={channel.href}
                    className={buttonVariants({ variant: "outline", size: "sm", className: "mt-5" })}
                  >
                    {channel.cta}
                  </a>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </main>
  );
}
