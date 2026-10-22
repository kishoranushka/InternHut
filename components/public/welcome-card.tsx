"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const PERKS = [
  "Real production-level project to learn how the corporate world works",
  "Direct mentorship from founders and top executives",
  "Verified credentials from the company you interned in",
];

/** Opens over the homepage on arrival. Closes on the cross, Escape or a click outside. */
export function WelcomeCard() {
  const [isOpen, setIsOpen] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const perksId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/55 p-4 backdrop-blur-[4px]"
      onClick={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="anim-rise relative max-h-[calc(100dvh-32px)] w-full max-w-[480px] overflow-y-auto rounded-card border border-border bg-card p-[clamp(24px,4vw,36px)] shadow-float focus:outline-none"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setIsOpen(false)}
          className="absolute top-3.5 right-3.5 grid size-9 place-items-center rounded-full bg-tint-50 text-navy transition-colors hover:bg-tint-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="flex items-center gap-2.5 text-lg font-extrabold tracking-[-0.02em] text-navy">
          <span className="block size-6 flex-none rounded-md bg-accent" />
          Graditute
        </div>

        <span className="eyebrow mt-6 flex items-center gap-2.5">
          <span className="block size-2 flex-none bg-accent" />
          Welcome
        </span>
        <h2 id={titleId} className="mt-3 mb-2.5 text-[clamp(26px,4vw,32px)] leading-[1.12] font-bold tracking-[-0.02em]">
          Your internship starts here
        </h2>
        <p className="m-0 mb-5.5 text-base leading-[1.6] text-body">
          Graditute connects college students with real company projects, direct mentor
          feedback and a certificate anyone can verify.
        </p>

        <section aria-labelledby={perksId} className="rounded-card border border-tint-100 bg-tint-50 px-4.5 pt-4.5 pb-1.5">
          <p id={perksId} className="m-0 mb-3 text-xs font-bold tracking-[0.08em] text-accent uppercase">
            Get perks
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 text-sm font-semibold leading-[1.45] text-navy">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {perk}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 grid gap-2.5">
          <Link href={ROUTES.applyNow} className="btn btn-primary btn-lg w-full">
            Apply for internship
          </Link>
          <Link href={ROUTES.register} className="btn btn-outline btn-lg w-full">
            Get started
          </Link>
        </div>

        <p className="mt-4.5 mb-0 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link href={ROUTES.login} className="font-bold text-accent underline underline-offset-[3px]">
            Login or register
          </Link>
        </p>
      </div>
    </div>
  );
}
