import type { ReactNode } from "react";
import { prisma } from "@/lib/prisma";
import { GENDER_LABEL } from "@/lib/enums";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const dateFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "Asia/Kolkata" });
const dateTimeFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});
// Date-only column: format in UTC so the stored calendar day never shifts.
const birthDateFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "UTC" });

export default async function AdminLeadsPage() {
  const [registrations, applications] = await Promise.all([
    prisma.internshipLead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      include: { internship: { select: { title: true } } },
    }),
  ]);

  return (
    <div className="space-y-10">
      <h1 className="font-display text-2xl text-foreground">Leads</h1>

      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">Internship registrations</h2>
          <span className="text-sm text-muted-foreground">
            {registrations.length} from the &ldquo;Apply for internship&rdquo; form
          </span>
        </div>

        {registrations.length === 0 ? (
          <Card>
            <p className="text-sm text-muted-foreground">
              No registrations yet. They&apos;ll show up here when students submit
              the Apply for internship form.
            </p>
          </Card>
        ) : (
          registrations.map((lead) => (
            <Card key={lead.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-foreground">{lead.fullName}</p>
                <span className="text-xs text-muted-foreground">
                  {dateTimeFormat.format(lead.createdAt)}
                </span>
              </div>
              <dl className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-6 gap-y-2 text-sm">
                <Detail label="Email" value={<a href={`mailto:${lead.email}`}>{lead.email}</a>} />
                <Detail label="Mobile" value={<a href={`tel:+91${lead.mobile}`}>{lead.mobile}</a>} />
                <Detail
                  label="WhatsApp"
                  value={
                    <a href={`https://wa.me/91${lead.whatsapp}`} target="_blank" rel="noreferrer">
                      {lead.whatsapp}
                    </a>
                  }
                />
                <Detail label="Gender" value={GENDER_LABEL[lead.gender]} />
                <Detail label="Date of birth" value={birthDateFormat.format(lead.dateOfBirth)} />
                <Detail label="State" value={lead.state} />
                <Detail label="College / University" value={lead.college} />
                <Detail label="Course / Degree" value={lead.course} />
                <Detail label="Stream" value={lead.stream} />
              </dl>
            </Card>
          ))
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Internship applications &amp; queries</h2>

        {applications.length === 0 ? (
          <Card>
            <p className="text-sm text-muted-foreground">
              No queries or applications yet. They&apos;ll show up here as students
              submit them.
            </p>
          </Card>
        ) : (
          applications.map((application) => (
            <Card key={application.id}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">
                  {application.studentName}
                </p>
                <Badge tone="accent">{application.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {application.internship.title} &middot; {application.studentEmail}{" "}
                &middot; {application.studentPhone}
                {application.studentCourse ? ` · ${application.studentCourse}` : ""}
                {" · "}
                {dateFormat.format(application.createdAt)}
              </p>
              {application.message && (
                <p className="mt-2 rounded-lg bg-muted p-3 text-sm text-foreground">
                  {application.message}
                </p>
              )}
            </Card>
          ))
        )}
      </section>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="m-0 text-foreground">{value}</dd>
    </div>
  );
}
