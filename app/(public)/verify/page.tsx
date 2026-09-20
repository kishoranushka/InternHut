import { CheckCircle2, Search, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/ui/badge";
import { FadeInUp } from "@/components/public/motion";

async function lookupCertificate(code: string) {
  return prisma.certificate.findUnique({
    where: { verificationCode: code.trim().toUpperCase() },
  });
}

export default async function VerifyCertificatePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const certificate = code ? await lookupCertificate(code) : null;

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
            <SectionLabel>Verify a certificate</SectionLabel>
            <h1 className="mt-6 text-heading-sm font-bold leading-[1.1] text-foreground sm:text-heading">
              Every certificate is checkable, in seconds
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Enter the verification code printed on the certificate — it
              looks like <span className="font-mono text-foreground">CERT-7K9M2-QX4RT</span>.
              We&apos;ll tell you whether it&apos;s genuine.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-product">
              <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-4">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold text-foreground">Verification result</p>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">This certificate is genuine</p>
                    <p className="font-mono text-xs text-muted-foreground">CERT-7K9M2-QX4RT</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Instant lookup against our certificate records — no login required.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <Card>
            <form className="flex flex-col gap-4 sm:flex-row sm:items-end" method="GET">
              <div className="flex-1">
                <Label htmlFor="code">Verification code</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="CERT-7K9M2-QX4RT"
                  defaultValue={code ?? ""}
                  className="font-mono uppercase"
                  autoComplete="off"
                  required
                />
              </div>
              <Button type="submit" className="group">
                <Search className="h-4 w-4" />
                Verify
              </Button>
            </form>
          </Card>

          {code && (
            <div className="mt-6">
              {certificate && !certificate.revoked && (
                <Card className="border-success/30 bg-success/5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-success" />
                    <div>
                      <p className="font-semibold text-foreground">
                        This certificate is genuine
                      </p>
                      <dl className="mt-3 space-y-1.5 text-sm">
                        <Row label="Student" value={certificate.studentNameSnapshot} />
                        <Row label="Internship" value={certificate.internshipTitleSnapshot} />
                        <Row
                          label="Issued"
                          value={new Date(certificate.issueDate).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        />
                        <Row label="Code" value={certificate.verificationCode} mono />
                      </dl>
                    </div>
                  </div>
                </Card>
              )}

              {certificate && certificate.revoked && (
                <Card className="border-error/30 bg-error/5">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-error" />
                    <div>
                      <p className="font-semibold text-foreground">
                        This certificate has been revoked
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {certificate.revokedReason ??
                          "Contact us if you believe this is a mistake."}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {!certificate && (
                <Card className="border-border">
                  <div className="flex items-start gap-3">
                    <ShieldX className="mt-0.5 h-6 w-6 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">
                        No certificate found for this code
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Double-check the code and try again, or contact us for help.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <dt className="w-20 shrink-0 text-muted-foreground">{label}</dt>
      <dd className={mono ? "min-w-0 break-words font-mono text-foreground" : "min-w-0 break-words text-foreground"}>
        {value}
      </dd>
    </div>
  );
}
