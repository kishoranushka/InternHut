import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ROUTES } from "@/lib/routes";
import { CopyLinkButton } from "@/components/public/verify/copy-link-button";

export const metadata: Metadata = {
  title: "Verify a certificate",
  description:
    "Check an Graditute certificate by its ID. For employers, colleges and anyone reviewing a résumé.",
};

async function lookupCertificate(code: string) {
  return prisma.certificate.findUnique({
    where: { verificationCode: code.trim().toUpperCase() },
    include: { internship: true },
  });
}

const WHAT_IT_CONFIRMS = [
  { title: "Identity of the holder", body: "The name as it appears on the certificate." },
  { title: "Internship and company", body: "Which internship was completed, with which partner company." },
  { title: "Completion date", body: "When the final review was approved." },
  { title: "Current status", body: "Valid or revoked — checked live, every time." },
];

export default async function VerifyCertificatePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const certificate = code ? await lookupCertificate(code) : null;
  const shownId = code?.trim().toUpperCase() ?? "";

  return (
    <main>
      <section className="bg-tint-50 px-section-x pt-[clamp(48px,7vw,104px)] pb-[clamp(64px,8vw,112px)]">
        <div className="mx-auto flex max-w-content flex-wrap items-start gap-x-wide gap-y-12">
          <div className="flex min-w-0 flex-[5_1_380px] flex-col gap-7">
            <span className="eyebrow flex items-center gap-3 !text-accent-secondary">
              <span className="block size-2 bg-accent" />
              Certificate verification
            </span>
            <h1 className="m-0 text-balance text-h2-sm font-bold">
              Check an Graditute certificate.
            </h1>
            <p className="m-0 text-body-lg leading-[1.65] text-muted-foreground">
              For employers, colleges and anyone reviewing a résumé. Enter the ID
              printed on the certificate.
            </p>
            <form action="/verify" method="GET" role="search" className="mt-1 flex flex-col gap-2">
              <label htmlFor="v-id" className="text-sm font-bold">Certificate ID</label>
              <div className="flex flex-wrap gap-2">
                <input
                  id="v-id"
                  name="code"
                  type="text"
                  defaultValue={code ?? ""}
                  placeholder="CERT-XXXXX-XXXX"
                  autoComplete="off"
                  spellCheck={false}
                  className="input tnum h-14 w-auto flex-[1_1_240px] text-lg font-semibold uppercase tracking-[0.04em]"
                />
                <button type="submit" className="btn btn-navy btn-lg h-14">Verify</button>
              </div>
              <span className="text-meta text-body">Letters are not case-sensitive.</span>
            </form>
          </div>

          <div aria-live="polite" className="min-w-0 flex-[7_1_460px]">
            {!code && (
              <div className="flex min-h-[360px] flex-wrap items-center gap-8 rounded-card border border-dashed border-tint-200 bg-card p-[clamp(24px,4vw,48px)]">
                <div className="relative aspect-[1.414/1] flex-[1_1_240px] border border-border bg-muted p-2.5">
                  <div className="flex h-full flex-col justify-between border border-border-strong p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="block h-2 w-14 bg-border-strong" />
                      <span className="border-[1.5px] border-accent bg-card px-1.5 py-1 text-[10px] font-bold tracking-[0.06em] text-accent-secondary">
                        CERT-·····
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="block h-3 w-3/5 bg-border-strong" />
                      <span className="block h-1.5 w-4/5 bg-border" />
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="block h-1.5 w-[70px] bg-border" />
                      <span className="block size-8 border-[1.5px] border-accent bg-[repeating-linear-gradient(45deg,var(--tint-100)_0_3px,#fff_3px_6px)]" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-[1_1_220px] flex-col gap-3">
                  <span className="text-lg font-bold">Where to find the ID</span>
                  <span className="text-ui leading-[1.6] text-muted-foreground">
                    Printed on the certificate near the student&apos;s name.
                  </span>
                </div>
              </div>
            )}

            {code && certificate && !certificate.revoked && (
              <div className="anim-rise overflow-hidden rounded-card border border-[#A7D7BE] bg-card shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#A7D7BE] bg-[#E8F5EE] px-7 py-5.5">
                  <span className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-success">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-lg font-bold text-success">Valid certificate</span>
                      <span className="text-meta text-body">Issued by Graditute · checked just now</span>
                    </span>
                  </span>
                  <span className="tnum text-sm font-bold tracking-[0.04em] text-success">{shownId}</span>
                </div>
                <dl className="m-0 px-7 py-2">
                  <VerifyRow label="Awarded to" value={certificate.studentNameSnapshot} />
                  <VerifyRow label="Internship" value={certificate.internshipTitleSnapshot} />
                  <VerifyRow
                    label="Partner company"
                    value={certificate.internship.partnerCompany ?? "[Partner company]"}
                  />
                  <VerifyRow
                    label="Duration · mode"
                    value={`${certificate.internship.durationWeeks} weeks`}
                  />
                  <VerifyRow
                    label="Completed"
                    value={new Date(certificate.issueDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    last
                  />
                </dl>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted px-7 py-4">
                  <span className="text-meta text-muted-foreground">
                    Final project reviewed and approved by the company mentor.
                  </span>
                  <CopyLinkButton code={certificate.verificationCode} />
                </div>
              </div>
            )}

            {code && certificate && certificate.revoked && (
              <div className="anim-rise overflow-hidden rounded-card border border-[#F2B8B2] bg-card" role="alert">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F2B8B2] bg-[#FDECEA] px-7 py-5.5">
                  <span className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-error">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-lg font-bold text-error">Certificate revoked</span>
                      <span className="text-meta text-body">This certificate is no longer valid</span>
                    </span>
                  </span>
                  <span className="tnum text-sm font-bold tracking-[0.04em] text-error line-through">{shownId}</span>
                </div>
                <dl className="m-0 px-7 py-2">
                  <VerifyRow label="Programme" value={certificate.internshipTitleSnapshot} />
                  <VerifyRow
                    label="Originally issued"
                    value={new Date(certificate.issueDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  />
                  <VerifyRow
                    label="Reason"
                    value={certificate.revokedReason ?? "Not specified."}
                    last
                  />
                </dl>
                <div className="border-t border-border bg-muted px-7 py-4 text-meta leading-[1.55] text-muted-foreground">
                  The holder&apos;s name is not shown for revoked certificates. Questions?{" "}
                  <Link href={ROUTES.contact}>Contact us</Link>.
                </div>
              </div>
            )}

            {code && !certificate && (
              <div className="anim-rise flex min-h-[360px] flex-col gap-5 rounded-card border border-border border-t-[3px] border-t-[#C2362B] bg-card p-[clamp(24px,4vw,40px)]" role="alert">
                <span className="flex size-12 items-center justify-center rounded-full border-[1.5px] border-error">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C2362B" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></svg>
                </span>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold tracking-[-0.015em]">No certificate found</span>
                  <span className="text-ui leading-[1.6] text-muted-foreground">
                    We could not find a certificate with the ID{" "}
                    <b className="tnum text-navy">{shownId}</b> in the Graditute register.
                  </span>
                </div>
                <ul className="m-0 border-t border-border py-0 pt-4 pl-4.5 text-ui leading-[1.9] text-muted-foreground">
                  <li>Check for typing errors — the letter O and the number 0 are easy to confuse.</li>
                  <li>If the certificate looks genuine but cannot be found, it may not have been issued by Graditute.</li>
                </ul>
                <div className="mt-auto flex flex-wrap gap-3">
                  <Link href={ROUTES.verify} className="btn btn-outline">Try another ID</Link>
                  <Link href={ROUTES.contact} className="btn btn-ghost-navy">Report a suspected forgery</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-section-x py-section-y-lg">
        <div className="mx-auto flex max-w-content flex-wrap gap-x-wide gap-y-12">
          <div className="flex flex-[4_1_300px] flex-col gap-5">
            <h2 className="m-0 text-[clamp(28px,3vw,40px)] font-bold leading-[1.1] tracking-[-0.03em]">
              What a verification confirms
            </h2>
            <p className="m-0 text-ui leading-[1.65] text-muted-foreground">
              Every result comes directly from the Graditute register. We never show contact details or scores.
            </p>
          </div>
          <div className="grid min-w-0 flex-[8_1_520px] grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-y-0 gap-x-8">
            {WHAT_IT_CONFIRMS.map((item, index) => (
              <div
                key={item.title}
                className={`flex flex-col gap-1.5 py-5.5 ${index < 2 ? "border-t border-navy" : "border-t border-border"}`}
              >
                <span className="text-lg font-bold">{item.title}</span>
                <span className="text-ui leading-[1.6] text-muted-foreground">{item.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function VerifyRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`grid grid-cols-[180px_minmax(0,1fr)] gap-x-6 gap-y-1 py-4 ${last ? "" : "border-b border-border"}`}>
      <dt className="text-sm font-semibold text-muted-foreground">{label}</dt>
      <dd className="m-0 text-base font-semibold">{value}</dd>
    </div>
  );
}
