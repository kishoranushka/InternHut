"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { STUDIO_BRIEFS, CRITERIA_SCALE } from "./studio-briefs";

export function ProjectStudioSection() {
  const [selected, setSelected] = useState(0);
  const brief = STUDIO_BRIEFS[selected];

  return (
    <section className="border-t border-border bg-muted px-section-x py-section-y">
      <div className="mx-auto flex max-w-content flex-wrap items-start gap-x-studio gap-y-12">
        <div className="flex min-w-0 flex-[4_1_320px] flex-col gap-6">
          <span className="eyebrow">Project Studio</span>
          <h2 className="m-0 text-h2-sm font-bold">Briefs written like real work.</h2>
          <p className="m-0 text-body-lg leading-[1.65] text-muted-foreground">
            Every internship is built around one project brief from the partner
            company — structured by us so you get clear context, defined
            deliverables, the skills you will practise and exactly how the work
            is evaluated.
          </p>

          <div
            role="tablist"
            aria-label="Sample briefs"
            className="mt-2 flex flex-col border-b border-border"
          >
            {STUDIO_BRIEFS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                className="vtab"
                aria-selected={index === selected}
                onClick={() => setSelected(index)}
              >
                <span className="text-caption font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {item.field}
                </span>
                <span className="text-[17px] font-bold tracking-[-0.01em]">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          <Link href={ROUTES.studio} className="arrow-link text-ui">
            Open Project Studio <i>&rarr;</i>
          </Link>
        </div>

        <article
          role="tabpanel"
          className="flex min-w-0 flex-[8_1_520px] flex-col overflow-hidden rounded-card border border-border bg-card shadow-panel"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-panel-x py-[18px]">
            <span className="inline-flex h-[26px] items-center gap-2 rounded bg-warning-tint px-2.5 text-caption font-bold tracking-[0.04em] text-warning">
              ILLUSTRATIVE BRIEF
            </span>
            <span className="text-meta font-semibold text-muted-foreground">
              Set by [Partner company] · {brief.field} · {brief.duration}
            </span>
          </div>

          <div className="flex flex-col gap-8 px-panel-x py-panel-y">
            <div className="flex flex-col gap-3.5">
              <h3 className="m-0 text-brief font-bold">{brief.title}</h3>
              <p className="m-0 max-w-[640px] text-base leading-[1.65] text-body">
                {brief.context}
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-8">
              <div className="flex flex-col">
                <span className="eyebrow-muted border-b border-navy pb-3">
                  Deliverables
                </span>
                {brief.deliverables.map((deliverable, index) => (
                  <div
                    key={deliverable}
                    className="flex gap-3.5 border-b border-border py-3 text-ui leading-[1.45]"
                  >
                    <span className="w-5 flex-none pt-px text-meta font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{deliverable}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-3.5">
                  <span className="eyebrow-muted border-b border-navy pb-3">
                    Skills developed
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {brief.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex h-[30px] items-center rounded border border-border px-2.5 text-meta font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="eyebrow-muted border-b border-navy pb-3">
                    Evaluation criteria
                  </span>
                  {brief.criteria.map(([name, weight]) => (
                    <div key={name} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-sm font-semibold">
                        <span>{name}</span>
                        <span className="tnum text-muted-foreground">{weight}%</span>
                      </div>
                      <div className="h-1 bg-border">
                        <div
                          className="h-1 bg-navy"
                          style={{ width: `${(weight / CRITERIA_SCALE) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
