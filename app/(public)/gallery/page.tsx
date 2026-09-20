import {
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/badge";
import { FadeInUp, Stagger, StaggerItem } from "@/components/public/motion";

const TASKS = [
  { label: "Market research brief", status: "Approved" },
  { label: "Dashboard wireframes", status: "In review" },
  { label: "Final project report", status: "Submitted" },
];

const SLOTS = ["10:00 AM", "11:30 AM", "2:00 PM"];

const COURSES = ["BBA", "B.Com", "BCA", "BSc", "MBA"];

const GLANCE = [
  { label: "Internship domains", value: "12+" },
  { label: "Students certified", value: "1,200+" },
];

const MOMENTS = [
  {
    icon: FileCheck2,
    title: "Your task board",
    body: (
      <div className="space-y-2.5">
        {TASKS.map((task) => (
          <div
            key={task.label}
            className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-2.5"
          >
            <span className="text-sm font-medium text-foreground">{task.label}</span>
            <span
              className={
                task.status === "Approved"
                  ? "inline-flex items-center rounded-full bg-[var(--badge-tint)] px-2.5 py-0.5 text-xs font-medium text-accent-secondary"
                  : "inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              }
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: MessageSquare,
    title: "Mentor feedback",
    body: (
      <div className="space-y-3">
        <div className="rounded-lg bg-muted/60 px-4 py-3">
          <p className="text-xs font-semibold text-foreground">Mentor</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            &ldquo;Clean structure — ready to move to the next task.&rdquo;
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: BadgeCheck,
    title: "Verified certificate",
    body: (
      <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
        <div>
          <p className="text-sm font-semibold text-foreground">Genuine certificate</p>
          <p className="font-mono text-xs text-muted-foreground">CERT-7K9M2-QX4RT</p>
        </div>
      </div>
    ),
  },
  {
    icon: CalendarCheck,
    title: "Book a mentor call",
    body: (
      <div className="space-y-2">
        {SLOTS.map((slot, i) => (
          <div
            key={slot}
            className={
              i === 0
                ? "flex items-center justify-between rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white"
                : "flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground"
            }
          >
            {slot}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: GraduationCap,
    title: "Open to every course",
    body: (
      <div className="flex flex-wrap gap-2">
        {COURSES.map((course) => (
          <span
            key={course}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--badge-tint)] px-3.5 py-1.5 text-xs font-medium text-accent-secondary"
          >
            <GraduationCap className="h-3 w-3" />
            {course}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Program at a glance",
    body: (
      <div className="space-y-2.5">
        {GLANCE.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-2.5"
          >
            <span className="text-sm font-medium text-foreground">{stat.label}</span>
            <span className="font-display text-base font-bold text-accent">{stat.value}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: FileCheck2,
    title: "Letter of recommendation",
    body: (
      <div className="rounded-lg border border-border px-4 py-3">
        <p className="text-sm font-semibold text-foreground">LOR issued</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Signed on successful completion — ready to attach to applications.
        </p>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Alumni community",
    body: (
      <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
          RK
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-xs font-bold text-white">
          AV
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--badge-tint)] text-xs font-bold text-accent-secondary">
          +1.2k
        </span>
      </div>
    ),
  },
];

export default function GalleryPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px] bg-[radial-gradient(circle_at_top,rgba(0,107,255,0.12),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[10%] bottom-0 -z-10 h-56 w-56 rounded-full bg-[var(--blob-magenta)]/10 blur-[90px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[10%] bottom-0 -z-10 h-56 w-56 rounded-full bg-[var(--blob-cyan)]/15 blur-[90px]"
        />
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <SectionLabel className="mx-auto">Gallery</SectionLabel>
          <h1 className="mt-6 text-heading-sm font-bold leading-[1.1] text-foreground sm:text-heading">
            A look inside the program
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Mentor reviews, project boards, and the certificates it all leads to.
          </p>
        </FadeInUp>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MOMENTS.map((moment) => (
            <StaggerItem key={moment.title}>
              <div className="h-full overflow-hidden rounded-2xl border border-border bg-card shadow-product transition-shadow duration-300 hover:shadow-accent-lg">
                <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-4">
                  <moment.icon className="h-4 w-4 text-accent" />
                  <p className="text-xs font-semibold text-foreground">{moment.title}</p>
                </div>
                <div className="p-5">{moment.body}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </main>
  );
}
