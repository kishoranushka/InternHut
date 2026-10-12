"use client";

import { useActionState, useState, type ReactNode } from "react";
import Link from "next/link";
import { submitContactMessage, type ContactFormState } from "@/lib/actions/contact-actions";
import { ROUTES } from "@/lib/routes";
import { CONTACT_PERSONAS } from "./personas";

export function ContactSection({ aside }: { aside: ReactNode }) {
  const [personaId, setPersonaId] = useState(CONTACT_PERSONAS[0].id);
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactMessage,
    undefined,
  );
  const persona = CONTACT_PERSONAS.find((p) => p.id === personaId) ?? CONTACT_PERSONAS[0];
  const sent = state && "success" in state && state.success;

  return (
    <>
      <div
        role="tablist"
        aria-label="Enquiry type"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-6 gap-y-0"
      >
        {CONTACT_PERSONAS.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={p.id === personaId}
            className="path-card"
            onClick={() => setPersonaId(p.id)}
          >
            <span className="text-meta font-bold text-accent">{p.number}</span>
            <span className="text-xl font-bold tracking-[-0.015em]">{p.label}</span>
            <span className="text-ui leading-[1.55] text-muted-foreground">{p.description}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-start gap-x-wide gap-y-12">
        <div role="tabpanel" className="min-w-0 flex-[8_1_560px] rounded-card bg-muted p-[clamp(24px,4vw,48px)]">
          {!sent ? (
            <form action={formAction} className="flex flex-col gap-6">
              <input type="hidden" name="path" value={persona.id} />
              <h2 className="m-0 text-2xl font-bold tracking-[-0.02em]">{persona.formTitle}</h2>

              {(persona.id === "INSTITUTION" || persona.id === "COMPANY") && (
                <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-md border border-tint-200 bg-tint-50 px-5 py-4">
                  <span className="text-sm leading-[1.55] text-body">
                    <b className="text-navy">Exploring a partnership?</b> The partnership enquiry form captures everything we need in one go.
                  </span>
                  <Link href={ROUTES.colleges} className="arrow-link text-sm">
                    Partnership form <i>&rarr;</i>
                  </Link>
                </div>
              )}

              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-x-6 gap-y-5">
                <Field label="Full name" htmlFor="c-name">
                  <input id="c-name" name="name" type="text" required className="input" />
                </Field>
                <Field label={persona.emailLabel} htmlFor="c-mail">
                  <input id="c-mail" name="email" type="email" required className="input" />
                </Field>

                {persona.showOrgRole && (
                  <>
                    <Field label={persona.orgLabel ?? "Organisation"} htmlFor="c-inst">
                      <input id="c-inst" name="organisation" type="text" className="input" />
                    </Field>
                    <Field label="Designation" htmlFor="c-role">
                      <input id="c-role" name="role" type="text" className="input" />
                    </Field>
                  </>
                )}

                {persona.showOptionalOrg && (
                  <Field label="Organisation" optional htmlFor="c-org">
                    <input id="c-org" name="organisation" type="text" className="input" />
                  </Field>
                )}

                <Field label="Topic" htmlFor="c-topic">
                  <div className="relative">
                    <select id="c-topic" name="topic" required className="input appearance-none pr-10">
                      {persona.topics.map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--body)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute top-[17px] right-4"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </Field>

                <Field label="Phone" optional htmlFor="c-phone">
                  <div className="flex gap-2">
                    <span className="flex h-12 items-center rounded-control border border-border-strong bg-card px-3.5 text-sm font-semibold text-body">+91</span>
                    <input id="c-phone" name="phone" type="tel" className="input" />
                  </div>
                </Field>
              </div>

              <Field
                label="Message"
                htmlFor="c-msg"
                trailing={<span className="text-meta text-muted-foreground">Up to 1,000 characters</span>}
              >
                <textarea
                  id="c-msg"
                  name="message"
                  rows={5}
                  required
                  placeholder={persona.messageHint}
                  className="input"
                />
              </Field>

              {state && "error" in state && <p className="text-sm text-error">{state.error}</p>}

              <div className="flex flex-wrap items-center justify-between gap-5 pt-2">
                <span className="max-w-[360px] text-meta leading-[1.55] text-muted-foreground">
                  We use your details only to reply.
                </span>
                <button type="submit" className="btn btn-navy btn-lg" disabled={isPending}>
                  {isPending ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          ) : (
            <div className="anim-rise flex flex-col gap-4.5 py-6" role="status">
              <span className="flex size-14 items-center justify-center rounded-full border-[1.5px] border-success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </span>
              <h2 className="m-0 text-[28px] font-bold tracking-[-0.02em]">Message sent</h2>
              <p className="m-0 max-w-[520px] text-ui leading-[1.65] text-muted-foreground">
                Thanks for writing. A real person will reply soon.
              </p>
            </div>
          )}
        </div>

        <aside className="min-w-0 flex-[4_1_300px]">{aside}</aside>
      </div>
    </>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  trailing,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <label htmlFor={htmlFor} className="text-sm font-bold">
          {label} {optional && <span className="font-medium text-muted-foreground">(optional)</span>}
        </label>
        {trailing}
      </div>
      {children}
    </div>
  );
}
