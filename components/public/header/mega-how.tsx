import Link from "next/link";
import { cn } from "@/lib/cn";
import { HOW_IT_WORKS_STEPS } from "./nav-data";
import { MegaPanel } from "./mega-panel";

export function MegaHow() {
  const lastIndex = HOW_IT_WORKS_STEPS.length - 1;

  return (
    <MegaPanel className="grid-cols-4 gap-0">
      {HOW_IT_WORKS_STEPS.map((step, index) => (
        <Link
          key={step.number}
          href={step.href}
          className={cn(
            "mega-link m-0 gap-3 rounded-none pt-5 pr-8 pb-2 pl-6 mt-px border-t border-border-strong",
            index === 0 && "mt-0 border-t-2 border-navy pl-0",
            index === lastIndex && "pr-0",
          )}
        >
          <span className="text-meta font-bold text-accent">{step.number}</span>
          <span className="text-lg font-bold tracking-[-0.01em]">{step.title}</span>
          <span className="text-sm leading-[1.55] text-muted-foreground">
            {step.blurb}
          </span>
        </Link>
      ))}
    </MegaPanel>
  );
}
