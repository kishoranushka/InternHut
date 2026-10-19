"use client";

import { useActionState, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  submitInternshipLead,
  type InternshipLeadFormState,
} from "@/lib/actions/internship-lead-actions";
import { GENDER, GENDER_LABEL } from "@/lib/enums";
import { INDIA_STATES } from "@/lib/india-states";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { FieldIcon, type FieldIconName } from "./field-icons";

const COURSE_SUGGESTIONS = [
  "B.Tech / B.E.",
  "BCA",
  "BBA",
  "B.Com",
  "B.Sc",
  "B.A.",
  "M.Tech / M.E.",
  "MCA",
  "MBA",
  "M.Com",
  "M.Sc",
  "Diploma",
];

/** Latest date of birth the picker allows: 15 years ago today. */
function maxBirthDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 15);
  return date.toISOString().slice(0, 10);
}

export function InternshipLeadForm() {
  const [state, formAction, isPending] = useActionState<InternshipLeadFormState, FormData>(
    submitInternshipLead,
    undefined,
  );
  const failed = state && "error" in state ? state : null;
  const values = failed?.values ?? {};
  const [whatsappSame, setWhatsappSame] = useState(true);

  if (state && "success" in state) {
    return (
      <div className="anim-rise flex flex-col items-start gap-4.5 py-6" role="status">
        <span className="flex size-14 items-center justify-center rounded-full border-[1.5px] border-success">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <h2 className="m-0 text-[28px] font-bold tracking-[-0.02em]">
          Thanks, {state.firstName}! You&apos;re registered.
        </h2>
        <p className="m-0 max-w-[520px] text-ui leading-[1.65] text-muted-foreground">
          Our team will review your details and get in touch on WhatsApp or
          email with internships that fit your course and skills.
        </p>
        <Link href={ROUTES.internships} className="btn btn-outline mt-2">
          Browse internships meanwhile
        </Link>
      </div>
    );
  }

  return (
    // Remount on each failed attempt so defaultValue picks up the echoed values.
    <form key={failed ? JSON.stringify(values) : "fresh"} action={formAction} className="flex flex-col gap-10">
      <fieldset className="m-0 flex flex-col gap-6 border-0 p-0">
        <legend className="sr-only">Personal details</legend>
        <p aria-hidden="true" className="m-0 text-xl font-bold tracking-[-0.015em]">Personal details</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-6 gap-y-6">
          <Field label="Full name" htmlFor="fullName" icon="user" error={failed?.field === "fullName"}>
            <input id="fullName" name="fullName" type="text" required autoComplete="name" placeholder="Full name" defaultValue={values.fullName} className="input pl-11" />
          </Field>
          <Field label="Email address" htmlFor="email" icon="mail" error={failed?.field === "email"}>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="student@college.edu.in" defaultValue={values.email} className="input pl-11" />
          </Field>
          <Field label="Mobile number" htmlFor="mobile" icon="phone" error={failed?.field === "mobile"}>
            <input id="mobile" name="mobile" type="tel" required inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile number" defaultValue={values.mobile} className="input pl-11" />
          </Field>
          <Field
            label="WhatsApp number"
            htmlFor="whatsapp"
            icon="chat"
            error={failed?.field === "whatsapp"}
            below={
              <label className="flex cursor-pointer items-center gap-2 text-meta font-semibold text-body">
                <input
                  type="checkbox"
                  name="whatsappSame"
                  checked={whatsappSame}
                  onChange={(event) => setWhatsappSame(event.target.checked)}
                  className="size-4 accent-[var(--accent)]"
                />
                Same as mobile number
              </label>
            }
          >
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="numeric"
              required={!whatsappSame}
              disabled={whatsappSame}
              placeholder={whatsappSame ? "Same as mobile number" : "10-digit WhatsApp number"}
              defaultValue={values.whatsapp}
              className="input pl-11 disabled:cursor-not-allowed disabled:bg-muted"
            />
          </Field>
          <Field label="Gender" htmlFor="gender" icon="people" select error={failed?.field === "gender"}>
            <select id="gender" name="gender" required defaultValue={values.gender ?? ""} className="input appearance-none pl-11 pr-10">
              <option value="" disabled>Select gender</option>
              {GENDER.map((gender) => (
                <option key={gender} value={gender}>{GENDER_LABEL[gender]}</option>
              ))}
            </select>
          </Field>
          <Field label="Date of birth" htmlFor="dateOfBirth" icon="calendar" error={failed?.field === "dateOfBirth"}>
            <input id="dateOfBirth" name="dateOfBirth" type="date" required max={maxBirthDate()} autoComplete="bday" defaultValue={values.dateOfBirth} className="input pl-11" />
          </Field>
          <Field label="State / UT" htmlFor="state" icon="pin" select error={failed?.field === "state"}>
            <select id="state" name="state" required defaultValue={values.state ?? ""} className="input appearance-none pl-11 pr-10">
              <option value="" disabled>Select state</option>
              {INDIA_STATES.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset className="m-0 flex flex-col gap-6 border-0 border-t border-border p-0 pt-10">
        <legend className="sr-only">Education</legend>
        <p aria-hidden="true" className="m-0 text-xl font-bold tracking-[-0.015em]">Education</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-6 gap-y-6">
          <Field label="College / University name" htmlFor="college" icon="building" error={failed?.field === "college"}>
            <input id="college" name="college" type="text" required autoComplete="organization" placeholder="College or university" defaultValue={values.college} className="input pl-11" />
          </Field>
          <Field label="Course / Degree" htmlFor="course" icon="cap" error={failed?.field === "course"}>
            <input id="course" name="course" type="text" required list="course-suggestions" placeholder="e.g. B.Tech, BCA, MBA" defaultValue={values.course} className="input pl-11" />
            <datalist id="course-suggestions">
              {COURSE_SUGGESTIONS.map((course) => (
                <option key={course} value={course} />
              ))}
            </datalist>
          </Field>
          <Field label="Stream / Specialization" htmlFor="stream" icon="book" error={failed?.field === "stream"}>
            <input id="stream" name="stream" type="text" required placeholder="e.g. Computer Science, Marketing" defaultValue={values.stream} className="input pl-11" />
          </Field>
        </div>
      </fieldset>

      {failed && (
        <p role="alert" className="m-0 rounded-control border border-error/40 bg-error/10 px-4 py-3 text-sm font-semibold text-error">
          {failed.error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-border pt-8">
        <span className="max-w-[380px] text-meta leading-[1.55] text-muted-foreground">
          We use your details only to match you with internships and contact you about them.
        </span>
        <button type="submit" className="btn btn-primary btn-lg" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit application"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  icon,
  select,
  error,
  below,
  children,
}: {
  label: string;
  htmlFor: string;
  icon: FieldIconName;
  select?: boolean;
  error?: boolean;
  below?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-meta font-bold uppercase tracking-[0.06em] text-navy">
        {label} <span className="text-error" aria-hidden="true">*</span>
      </label>
      <div className={cn("relative", error && "[&_.input]:border-error")}>
        <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-icon">
          <FieldIcon name={icon} />
        </span>
        {children}
        {select && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--body)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"><path d="M6 9l6 6 6-6" /></svg>
        )}
      </div>
      {below}
    </div>
  );
}
