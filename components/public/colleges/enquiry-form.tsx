"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  submitPartnershipEnquiry,
  type PartnershipEnquiryFormState,
} from "@/lib/actions/partnership-enquiry-actions";
import { ROUTES } from "@/lib/routes";

const DEPARTMENTS = [
  "Computer science",
  "Information technology",
  "Electronics",
  "Management",
  "Design",
  "Commerce",
];

export function EnquiryForm() {
  const [departments, setDepartments] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState<
    PartnershipEnquiryFormState,
    FormData
  >(submitPartnershipEnquiry, undefined);
  const sent = state && "success" in state && state.success;

  function toggleDepartment(label: string) {
    setDepartments((prev) =>
      prev.includes(label) ? prev.filter((d) => d !== label) : [...prev, label],
    );
  }

  if (sent) {
    return (
      <div className="anim-rise flex flex-col gap-5 py-6" role="status">
        <span className="flex size-16 items-center justify-center rounded-full border-[1.5px] border-success">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <h3 className="m-0 text-[30px] font-bold tracking-[-0.025em]">Thank you — your enquiry is in.</h3>
        <p className="m-0 max-w-[520px] text-ui leading-[1.65] text-muted-foreground">
          We have sent a confirmation to your email. A coordinator will reach out to arrange a requirements call.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link href={ROUTES.studio} className="btn btn-outline">Review sample briefs</Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state && "error" in state && (
        <div role="alert" className="flex gap-3 rounded-md border border-[#F2B8B2] bg-[#FDECEA] px-4 py-3.5 text-sm font-semibold text-error">
          {state.error}
        </div>
      )}

      <fieldset className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-x-6 gap-y-5 border-0 p-0">
        <legend className="col-span-full mb-4 p-0 text-caption font-bold tracking-[0.14em] text-muted-foreground uppercase">
          Institution
        </legend>
        <div className="col-span-full flex flex-col gap-2">
          <label htmlFor="e-inst" className="text-sm font-bold">Institution name</label>
          <input id="e-inst" name="institutionName" type="text" required placeholder="Full registered name" className="input" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="e-city" className="text-sm font-bold">City</label>
          <input id="e-city" name="city" type="text" className="input" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="e-state" className="text-sm font-bold">State</label>
          <input id="e-state" name="state" type="text" className="input" />
        </div>
      </fieldset>

      <fieldset className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-x-6 gap-y-5 border-0 border-t border-border p-0 pt-6">
        <legend className="col-span-full mb-4 w-full p-0 text-caption font-bold tracking-[0.14em] text-muted-foreground uppercase">
          Your details
        </legend>
        <div className="flex flex-col gap-2">
          <label htmlFor="e-name" className="text-sm font-bold">Your name</label>
          <input id="e-name" name="contactName" type="text" required className="input" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="e-role" className="text-sm font-bold">Designation</label>
          <input id="e-role" name="role" type="text" placeholder="e.g. Training &amp; Placement Officer" className="input" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="e-mail" className="text-sm font-bold">Official email</label>
          <input id="e-mail" name="email" type="email" required placeholder="name@institution.edu.in" className="input" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="e-phone" className="text-sm font-bold">Phone</label>
          <div className="flex gap-2">
            <span className="flex h-12 items-center rounded-control border border-border-strong bg-card px-3.5 text-sm font-semibold text-body">+91</span>
            <input id="e-phone" name="phone" type="tel" className="input" />
          </div>
        </div>
      </fieldset>

      <fieldset className="m-0 flex flex-col gap-5 border-0 border-t border-border p-0 pt-6">
        <legend className="mb-4 w-full p-0 text-caption font-bold tracking-[0.14em] text-muted-foreground uppercase">
          Requirements
        </legend>
        <div className="flex flex-col gap-2.5">
          <span className="text-sm font-bold">
            Departments interested <span className="font-medium text-muted-foreground">(choose any)</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {DEPARTMENTS.map((label) => (
              <button
                key={label}
                type="button"
                className="chip"
                aria-pressed={departments.includes(label)}
                onClick={() => toggleDepartment(label)}
              >
                {label}
              </button>
            ))}
            {departments.map((d) => (
              <input key={d} type="hidden" name="departments" value={d} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-x-6 gap-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="e-size" className="text-sm font-bold">Approximate number of students</label>
            <select id="e-size" name="studentCountRange" defaultValue="" className="input">
              <option value="">Select a range</option>
              <option>Under 50</option>
              <option>50 – 150</option>
              <option>150 – 300</option>
              <option>More than 300</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="e-when" className="text-sm font-bold">Preferred start</label>
            <select id="e-when" name="preferredStart" defaultValue="This semester" className="input">
              <option>This semester</option>
              <option>Next semester</option>
              <option>Vacation period</option>
              <option>Not sure yet</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="e-msg" className="text-sm font-bold">
            Anything we should know? <span className="font-medium text-muted-foreground">(optional)</span>
          </label>
          <textarea id="e-msg" name="message" rows={3} placeholder="Credit requirements, preferred mode, constraints" className="input" />
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6">
        <span className="max-w-[380px] text-meta leading-[1.55] text-muted-foreground">
          We use these details only to respond to your enquiry.
        </span>
        <button type="submit" className="btn btn-navy btn-lg" disabled={isPending}>
          {isPending ? "Sending..." : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
