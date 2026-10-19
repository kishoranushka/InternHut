import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IssueCertificateForm } from "@/components/admin/issue-certificate-form";
import { CertificateRowActions } from "@/components/admin/certificate-row-actions";

const dateFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "UTC" });

export default async function AdminCertificatesPage({
  searchParams,
}: PageProps<"/admin/certificates">) {
  const [{ issued }, certificates, certifiable] = await Promise.all([
    searchParams,
    prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
      include: { application: { select: { studentEmail: true } } },
    }),
    prisma.application.findMany({
      where: { certificate: null, status: { not: "CANCELLED" } },
      orderBy: { createdAt: "desc" },
      include: { internship: { select: { title: true } } },
    }),
  ]);
  const issuedCode = typeof issued === "string" ? issued : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-foreground">Certificates</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Issue a certificate when a student completes an internship. Anyone can
          check it at /verify with its code.
        </p>
      </div>

      {issuedCode && (
        <p role="status" className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success">
          Certificate <span className="font-mono font-bold">{issuedCode}</span> issued.{" "}
          <a href={`/verify?code=${encodeURIComponent(issuedCode)}`} target="_blank" rel="noreferrer" className="underline">
            Check it on the verify page
          </a>
        </p>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Issue a certificate</h2>
        <Card>
          <IssueCertificateForm
            applications={certifiable.map((a) => ({
              id: a.id,
              studentName: a.studentName,
              studentEmail: a.studentEmail,
              internshipTitle: a.internship.title,
              status: a.status,
            }))}
          />
        </Card>
      </section>

      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">Issued certificates</h2>
          <span className="text-sm text-muted-foreground">
            {certificates.length} issued · {certificates.filter((c) => c.revoked).length} revoked
          </span>
        </div>

        {certificates.length === 0 ? (
          <Card>
            <p className="text-sm text-muted-foreground">No certificates issued yet.</p>
          </Card>
        ) : (
          certificates.map((c) => (
            <Card key={c.id} className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-sm font-bold tracking-wide text-foreground">{c.verificationCode}</p>
                  <Badge tone={c.revoked ? "error" : "success"}>{c.revoked ? "Revoked" : "Valid"}</Badge>
                </div>
                <p className="mt-1 text-sm text-foreground">
                  {c.studentNameSnapshot} · {c.internshipTitleSnapshot}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Completed {dateFormat.format(c.issueDate)} · {c.application.studentEmail}
                  {c.revoked && c.revokedReason ? ` · Revoked: ${c.revokedReason}` : ""}
                </p>
              </div>
              <CertificateRowActions id={c.id} code={c.verificationCode} revoked={c.revoked} />
            </Card>
          ))
        )}
      </section>
    </div>
  );
}
