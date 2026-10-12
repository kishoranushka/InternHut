import type { Metadata } from "next";
import { ROUTES } from "@/lib/routes";
import { ContactSection } from "@/components/public/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Choose who you are so your message reaches the right person at InternSetu — students, colleges, partner companies, or anyone else.",
};

const DIRECT_CHANNELS = [
  { label: "Students", value: "[students email]" },
  { label: "Colleges & partnerships", value: "[partnerships email]" },
  { label: "Partner companies", value: "[companies email]" },
  { label: "Everything else", value: "[general email] · [phone]" },
  { label: "Office", value: "[Registered address]\n[City, State, PIN]" },
];

const RELATED_LINKS = [
  { label: "Verify a certificate", href: ROUTES.verify },
  { label: "Eligibility, fees & FAQs", href: ROUTES.internships },
  { label: "How internships work", href: ROUTES.learning },
];

export default function ContactPage() {
  return (
    <main>
      <section className="px-section-x pt-[clamp(48px,7vw,104px)] pb-[clamp(32px,4vw,48px)]">
        <div className="mx-auto flex max-w-content flex-col gap-12">
          <div className="flex flex-wrap items-end gap-x-wide gap-y-6">
            <div className="flex flex-[7_1_520px] flex-col gap-6">
              <span className="eyebrow flex items-center gap-3">
                <span className="block size-2 bg-accent" />
                Contact
              </span>
              <h1 className="m-0 text-[clamp(40px,5.4vw,72px)] font-bold leading-[1] tracking-[-0.045em]">
                How can we help?
              </h1>
            </div>
            <p className="m-0 flex-[5_1_340px] text-ui leading-[1.65] text-muted-foreground">
              Choose who you are so your message reaches the right person. We
              reply to every enquiry within a few working days.
            </p>
          </div>

          <ContactSection
            aside={
              <div className="flex flex-col gap-8">
                <div className="flex flex-col border-t border-navy">
                  <span className="py-4 pb-2 text-caption font-bold tracking-[0.14em] text-muted-foreground uppercase">
                    Write to us directly
                  </span>
                  {DIRECT_CHANNELS.map((channel, index) => (
                    <div
                      key={channel.label}
                      className={`flex flex-col gap-1 py-3.5 ${index < DIRECT_CHANNELS.length - 1 ? "border-b border-border" : ""}`}
                    >
                      <span className="text-sm font-bold">{channel.label}</span>
                      <span className="whitespace-pre-line text-meta leading-[1.55] text-body">
                        {channel.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="pb-2 text-caption font-bold tracking-[0.14em] text-muted-foreground uppercase">
                    You might be looking for
                  </span>
                  {RELATED_LINKS.map((link, index) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`hover-row flex items-center justify-between px-2 py-4 text-sm font-bold text-navy no-underline border-t border-border ${index === RELATED_LINKS.length - 1 ? "border-b" : ""}`}
                    >
                      {link.label} <span className="arrow">&rarr;</span>
                    </a>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      </section>
    </main>
  );
}
