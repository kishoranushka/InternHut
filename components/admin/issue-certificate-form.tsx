"use client";

import { useActionState, useState } from "react";
import {
  issueCertificate,
  type IssueCertificateFormState,
} from "@/lib/actions/certificate-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export type CertifiableApplication = {
  id: string;
  studentName: string;
  studentEmail: string;
  internshipTitle: string;
  status: string;
};

function today() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function IssueCertificateForm({ applications }: { applications: CertifiableApplication[] }) {
  const [state, formAction, isPending] = useActionState<IssueCertificateFormState, FormData>(
    issueCertificate,
    undefined,
  );
  const [applicationId, setApplicationId] = useState(state?.values.applicationId ?? "");
  const [studentName, setStudentName] = useState(state?.values.studentName ?? "");

  if (applications.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No applications are waiting for a certificate. Applications appear here
        once students apply for an internship.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="applicationId">Application</Label>
        <Select
          id="applicationId"
          name="applicationId"
          required
          value={applicationId}
          onChange={(event) => {
            setApplicationId(event.target.value);
            const picked = applications.find((a) => a.id === event.target.value);
            if (picked) setStudentName(picked.studentName);
          }}
        >
          <option value="" disabled>
            Choose a student and internship
          </option>
          {applications.map((a) => (
            <option key={a.id} value={a.id}>
              {a.studentName} · {a.internshipTitle} · {a.studentEmail}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
        <div>
          <Label htmlFor="studentName">Name on certificate</Label>
          <Input
            id="studentName"
            name="studentName"
            required
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Check the spelling: this is printed and shown on the verify page.
          </p>
        </div>
        <div>
          <Label htmlFor="issueDate">Completion date</Label>
          <Input
            id="issueDate"
            name="issueDate"
            type="date"
            required
            max={today()}
            defaultValue={state?.values.issueDate || today()}
          />
        </div>
      </div>

      {state?.error && <p className="text-sm text-error">{state.error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Issuing..." : "Issue certificate"}
        </Button>
        <span className="text-xs text-muted-foreground">
          A unique code is generated and the application is marked completed.
        </span>
      </div>
    </form>
  );
}
