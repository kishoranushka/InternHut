/**
 * Illustrative Project Studio briefs shown on the homepage. These are
 * deliberately sample content — the badge on the panel says so — and are not
 * tied to a specific partner company.
 */
export type StudioBrief = {
  field: string;
  level: string;
  duration: string;
  title: string;
  context: string;
  deliverables: string[];
  skills: string[];
  criteria: [string, number][];
};

export const STUDIO_BRIEFS: StudioBrief[] = [
  {
    field: "Frontend development",
    level: "Beginner",
    duration: "8 weeks",
    title: "Campus Events Dashboard",
    context:
      "A student council needs one place to publish events, track registrations and post updates. Build the web dashboard its organisers will use every week.",
    deliverables: [
      "Wireframes for four core screens",
      "A reusable component library",
      "A working dashboard connected to a mock API",
      "A short handover note for the next developer",
    ],
    skills: [
      "React",
      "Component design",
      "State management",
      "Accessibility",
      "REST integration",
    ],
    criteria: [
      ["Functionality", 30],
      ["Code quality", 25],
      ["UX & accessibility", 25],
      ["Documentation", 20],
    ],
  },
  {
    field: "Data analytics",
    level: "Beginner",
    duration: "10 weeks",
    title: "Library Footfall Analysis",
    context:
      "A college library wants to plan staffing around real usage. Analyse a year of anonymised entry logs and recommend opening hours with evidence.",
    deliverables: [
      "A cleaned dataset with a data dictionary",
      "SQL queries answering six operational questions",
      "A four-view dashboard",
      "A two-page recommendation memo",
    ],
    skills: [
      "SQL",
      "Python · pandas",
      "Data cleaning",
      "Visualisation",
      "Written communication",
    ],
    criteria: [
      ["Analytical accuracy", 35],
      ["Insight quality", 25],
      ["Visual clarity", 20],
      ["Communication", 20],
    ],
  },
  {
    field: "UI/UX design",
    level: "Beginner",
    duration: "6 weeks",
    title: "Hostel Maintenance Requests",
    context:
      "Students report hostel maintenance issues by phone and on paper. Design a mobile flow to raise, track and close requests — and test it with real users.",
    deliverables: [
      "A research summary from five user interviews",
      "User flow and wireframes",
      "A high-fidelity clickable prototype",
      "A usability test report",
    ],
    skills: [
      "User research",
      "Information architecture",
      "Prototyping",
      "Usability testing",
    ],
    criteria: [
      ["Research rigour", 25],
      ["Problem framing", 25],
      ["Design quality", 30],
      ["Test insights", 20],
    ],
  },
];

/** Bar widths are relative to the heaviest criterion weight in the mockup (35%). */
export const CRITERIA_SCALE = 35;
